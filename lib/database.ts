import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { ApplicationData, SubmittedApplication, ApplicationStatus } from '@/types/application';
import { generateApplicationNumber } from './utils';

// Collection references
const APPLICATIONS_COLLECTION = 'applications';
const AUDIT_LOGS_COLLECTION = 'auditLogs';
const EMAIL_QUEUE_COLLECTION = 'emailQueue';

/**
 * Submit a new job application
 * @param applicationData - The complete application data
 * @returns The submitted application with ID and application number
 */
export async function submitApplication(
  applicationData: ApplicationData
): Promise<{ id: string; applicationNumber: string }> {
  try {
    const applicationNumber = generateApplicationNumber();
    
    const submittedApplication = {
      applicationNumber,
      position: 'Director of Business Development',
      status: 'new' as ApplicationStatus,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      data: applicationData,
      recruiterNotes: '',
      tags: [],
    };

    // Add to Firestore
    const docRef = await addDoc(
      collection(db, APPLICATIONS_COLLECTION),
      submittedApplication
    );

    // Queue confirmation email
    await queueConfirmationEmail(
      applicationData.personalInformation.email || '',
      applicationData.personalInformation.firstName || '',
      applicationNumber
    );

    // Log the submission
    await logAuditEvent('application_submitted', {
      applicationId: docRef.id,
      applicationNumber,
      email: applicationData.personalInformation.email,
    });

    return {
      id: docRef.id,
      applicationNumber,
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Failed to submit application. Please try again.');
  }
}

/**
 * Upload a file to Firebase Storage
 * @param file - The file to upload
 * @param applicationId - The application ID
 * @param fileType - The type of file (cv, cover-letter, portfolio, identity)
 * @returns The download URL
 */
export async function uploadApplicationFile(
  file: File,
  applicationId: string,
  fileType: 'cv' | 'cover-letter' | 'portfolio' | 'identity'
): Promise<string> {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storagePath = `applications/${applicationId}/${fileType}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    // Upload file
    await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Store metadata in Firestore
    await addDoc(collection(db, APPLICATIONS_COLLECTION, applicationId, 'documents'), {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadedAt: serverTimestamp(),
      storageRef: storagePath,
      downloadURL,
      documentType: fileType,
    });

    // Log file upload for sensitive documents
    if (fileType === 'identity') {
      await logAuditEvent('identity_document_uploaded', {
        applicationId,
        fileName: file.name,
        fileSize: file.size,
      });
    }

    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file. Please try again.');
  }
}

/**
 * Get all applications (admin only)
 * @returns Array of applications
 */
export async function getApplications(): Promise<SubmittedApplication[]> {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      orderBy('submittedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const applications: SubmittedApplication[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      } as SubmittedApplication);
    });

    return applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications.');
  }
}

/**
 * Get a single application by ID
 * @param id - The application ID
 * @returns The application or null
 */
export async function getApplicationById(
  id: string
): Promise<SubmittedApplication | null> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as SubmittedApplication;
    }

    return null;
  } catch (error) {
    console.error('Error fetching application:', error);
    throw new Error('Failed to fetch application.');
  }
}

/**
 * Update application status and notes (admin only)
 * @param id - The application ID
 * @param updates - The updates to apply
 */
export async function updateApplication(
  id: string,
  updates: {
    status?: ApplicationStatus;
    recruiterNotes?: string;
    tags?: string[];
  }
): Promise<void> {
  try {
    const docRef = doc(db, APPLICATIONS_COLLECTION, id);

    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    // Log status changes
    if (updates.status) {
      await logAuditEvent('application_status_changed', {
        applicationId: id,
        newStatus: updates.status,
      });
    }
  } catch (error) {
    console.error('Error updating application:', error);
    throw new Error('Failed to update application.');
  }
}

/**
 * Search applications by query
 * @param searchQuery - The search query
 * @returns Filtered applications
 */
export async function searchApplications(
  searchQuery: string
): Promise<SubmittedApplication[]> {
  // Note: For production, implement full-text search using
  // Algolia, Elasticsearch, or Firebase Extensions
  try {
    const applications = await getApplications();
    
    const lowerQuery = searchQuery.toLowerCase();
    
    return applications.filter((app) => {
      const searchFields = [
        app.applicationNumber,
        app.data.personalInformation.firstName,
        app.data.personalInformation.lastName,
        app.data.personalInformation.email,
        app.data.professionalInformation?.currentCompany,
        app.data.professionalInformation?.currentJobTitle,
      ].map(field => (field || '').toLowerCase());

      return searchFields.some(field => field.includes(lowerQuery));
    });
  } catch (error) {
    console.error('Error searching applications:', error);
    throw new Error('Failed to search applications.');
  }
}

/**
 * Log an audit event
 * @param eventType - The type of event
 * @param data - Additional event data
 */
async function logAuditEvent(
  eventType: string,
  data: Record<string, any>
): Promise<void> {
  try {
    await addDoc(collection(db, AUDIT_LOGS_COLLECTION), {
      eventType,
      data,
      timestamp: serverTimestamp(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      ip: 'client', // In production, get from server-side
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
    // Don't throw - logging failures shouldn't break the app
  }
}

/**
 * Queue a confirmation email
 * @param to - Recipient email
 * @param firstName - Recipient first name
 * @param applicationNumber - Application reference number
 */
async function queueConfirmationEmail(
  to: string,
  firstName: string,
  applicationNumber: string
): Promise<void> {
  try {
    await addDoc(collection(db, EMAIL_QUEUE_COLLECTION), {
      to,
      template: 'application_confirmation',
      data: {
        firstName,
        applicationNumber,
        position: 'Director of Business Development',
        company: 'Nabat AI',
        applicationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/apply/success`,
      },
      createdAt: serverTimestamp(),
      status: 'pending',
    });
  } catch (error) {
    console.error('Error queuing confirmation email:', error);
    // Don't throw - email failures shouldn't break application submission
  }
}

/**
 * Get applications by status
 * @param status - The application status
 * @returns Filtered applications
 */
export async function getApplicationsByStatus(
  status: ApplicationStatus
): Promise<SubmittedApplication[]> {
  try {
    const q = query(
      collection(db, APPLICATIONS_COLLECTION),
      where('status', '==', status),
      orderBy('submittedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const applications: SubmittedApplication[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      } as SubmittedApplication);
    });

    return applications;
  } catch (error) {
    console.error('Error fetching applications by status:', error);
    throw new Error('Failed to fetch applications.');
  }
}
