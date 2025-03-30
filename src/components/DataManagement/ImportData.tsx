import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { importCrimesData } from "@/data";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ImportData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    await handleFileImport(file);
  };

  const handleFileImport = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      setImportStatus({
        status: 'error',
        message: 'Please select a JSON file'
      });
      return;
    }

    setImportStatus({ status: 'loading', message: 'Importing data...' });
    
    try {
      const result = await importCrimesData(file);
      
      if (result.success) {
        setImportStatus({
          status: 'success',
          message: result.message
        });
        
        // Reload after 2 seconds to reflect the changes
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setImportStatus({
          status: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to import data'
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileImport(files[0]);
    }
  };

  const resetImport = () => {
    setImportStatus({ status: 'idle', message: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetImport();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200">
          <Upload size={18} />
          <span>Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Crime Data</DialogTitle>
          <DialogDescription>
            Upload a JSON file to import crime data into the system.
          </DialogDescription>
        </DialogHeader>

        {importStatus.status === 'idle' && (
          <div
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg 
              ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-center mb-2">
              Drag and drop your JSON file here, or click to browse
            </p>
            <input 
              type="file" 
              accept=".json" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button variant="secondary" size="sm" className="mt-2" onClick={() => document.getElementById('file-upload')?.click()}>
                Select File
              </Button>
            </label>
          </div>
        )}

        {importStatus.status === 'loading' && (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Processing your data...</p>
          </div>
        )}

        {importStatus.status === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{importStatus.message}</AlertDescription>
          </Alert>
        )}

        {importStatus.status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{importStatus.message}</AlertDescription>
          </Alert>
        )}

        <DialogFooter className="justify-between sm:justify-between">
          {(importStatus.status === 'success' || importStatus.status === 'error') && (
            <Button type="button" variant="outline" onClick={resetImport}>
              Try Again
            </Button>
          )}
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportData;