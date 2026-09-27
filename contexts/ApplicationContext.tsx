'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ApplicationData } from '@/types/application';

interface ApplicationContextType {
  applicationData: ApplicationData;
  updateApplicationData: (step: keyof ApplicationData, data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  saveToLocalStorage: () => void;
  clearLocalStorage: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

const STORAGE_KEY = 'nabat-application-draft';
const TOTAL_STEPS = 8;

const initialApplicationData: ApplicationData = {
  personalInformation: {},
  professionalInformation: {},
  executiveExperience: {
    hasLeadershipExperience: false,
    leadershipPositions: [],
  },
  gccUaeExperience: {
    hasUAEExperience: false,
    uaeExperienceRecords: [],
    hasVisitedUAE: false,
    hasGCCExperience: false,
  },
  workAuthorization: {
    hasUAEVisa: false,
    hasValidPassport: true,
    authorizedToWork: '',
    willingToRelocate: '',
  },
  documents: {},
  motivation: {},
  referencesAndSubmission: {
    references: [],
    accuracyConfirmed: false,
    consentGiven: false,
    understood: false,
  },
  currentStep: 1,
};

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialApplicationData);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setApplicationData(parsed);
        setCurrentStep(parsed.currentStep || 1);
      } catch (error) {
        console.error('Failed to parse saved application data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  const saveToLocalStorage = useCallback(() => {
    const dataToSave = {
      ...applicationData,
      currentStep,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [applicationData, currentStep]);

  // Auto-save on data change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [applicationData, currentStep, saveToLocalStorage]);

  const updateApplicationData = useCallback((step: keyof ApplicationData, data: any) => {
    setApplicationData((prev) => {
      // Handle currentStep separately since it's not an object
      if (step === 'currentStep' || step === 'lastSaved') {
        return {
          ...prev,
          [step]: data,
        };
      }
      
      // For all other steps, merge with existing data
      return {
        ...prev,
        [step]: {
          ...(prev[step] as object),
          ...data,
        },
      };
    });
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: ApplicationContextType = {
    applicationData,
    updateApplicationData,
    currentStep,
    setCurrentStep,
    totalSteps: TOTAL_STEPS,
    saveToLocalStorage,
    clearLocalStorage,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within ApplicationProvider');
  }
  return context;
};
