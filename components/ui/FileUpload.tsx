'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { cn, formatFileSize } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface FileUploadProps {
  label: string;
  accept: { [key: string]: string[] };
  maxSize: number; // in MB
  onFileSelect: (file: File | null) => void;
  currentFile?: File | null;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  maxSize,
  onFileSelect,
  currentFile,
  error,
  hint,
  required = false,
}) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setUploadError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === 'file-too-large') {
          setUploadError(`File is too large. Maximum size is ${maxSize}MB`);
        } else if (rejection.errors[0]?.code === 'file-invalid-type') {
          setUploadError('Invalid file type. Please check accepted formats.');
        } else {
          setUploadError('File upload failed. Please try again.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [maxSize, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSize * 1024 * 1024,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setUploadError(null);
  };

  const displayError = error || uploadError;

  return (
    <div className="w-full">
      <label className="input-label">
        {label}
        {required && <span className="input-required ml-1">*</span>}
      </label>

      {!currentFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'upload-area group',
            isDragActive && 'upload-area-active',
            displayError && 'border-red-400 bg-red-50/20'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-nabat-primary-50 group-hover:bg-nabat-primary-100 flex items-center justify-center text-nabat-primary-600 mb-3 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-nabat-neutral-800 font-semibold mb-1 text-sm sm:text-base">
              {isDragActive ? 'Drop file here to upload' : 'Click to browse or drag and drop'}
            </p>
            <p className="text-xs text-nabat-neutral-500">
              Maximum file size: {maxSize}MB (PDF, DOCX, DOC)
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-nabat-neutral-200 p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3.5 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-nabat-primary-50 flex items-center justify-center text-nabat-primary-600">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-nabat-neutral-900 truncate">
                {currentFile.name}
              </p>
              <p className="text-xs text-nabat-neutral-500 mt-0.5">
                {formatFileSize(currentFile.size)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-3"
          >
            Remove
          </Button>
        </div>
      )}

      {displayError && (
        <p className="input-error-message" role="alert">
          {displayError}
        </p>
      )}

      {hint && !displayError && (
        <p className="input-hint">{hint}</p>
      )}
    </div>
  );
};
