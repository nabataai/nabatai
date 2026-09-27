'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn, formatFileSize } from '@/lib/utils';

interface FileUploadProps {
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
    (acceptedFiles: File[], rejectedFiles: any[]) => {
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

  const handleRemove = () => {
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
            'upload-area',
            isDragActive && 'upload-area-active',
            displayError && 'border-red-500'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-nabat-neutral-400 mb-3"
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
            <p className="text-nabat-neutral-700 font-medium mb-1">
              {isDragActive ? 'Drop file here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-nabat-neutral-500">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-nabat-primary-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-nabat-neutral-900 truncate">
                {currentFile.name}
              </p>
              <p className="text-xs text-nabat-neutral-600">
                {formatFileSize(currentFile.size)}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
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

// Button component import - needed for Remove button
const Button: React.FC<any> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
