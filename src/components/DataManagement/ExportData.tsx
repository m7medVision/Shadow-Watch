import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { exportCrimesData } from "@/data";
import { Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ExportData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleExport = async () => {
    setExportStatus({ status: 'loading', message: 'Exporting data...' });
    
    try {
      const result = exportCrimesData();
      
      if (result.success) {
        setExportStatus({
          status: 'success',
          message: 'Data exported successfully'
        });
      } else {
        setExportStatus({
          status: 'error',
          message: result.error || 'Failed to export data'
        });
      }
    } catch (error) {
      setExportStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to export data'
      });
    }
  };

  const resetExport = () => {
    setExportStatus({ status: 'idle', message: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetExport();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200">
          <Download size={18} />
          <span>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Crime Data</DialogTitle>
          <DialogDescription>
            Download all crime data as a JSON file.
          </DialogDescription>
        </DialogHeader>

        {exportStatus.status === 'idle' && (
          <div className="flex flex-col items-center justify-center p-6">
            <Download className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-center mb-4">
              This will export all crime data as a JSON file. You can use this file to back up your data or transfer it to another system.
            </p>
            <Button onClick={handleExport} className="mt-2">
              Download JSON File
            </Button>
          </div>
        )}

        {exportStatus.status === 'loading' && (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Processing your data...</p>
          </div>
        )}

        {exportStatus.status === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{exportStatus.message}</AlertDescription>
          </Alert>
        )}

        {exportStatus.status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{exportStatus.message}</AlertDescription>
          </Alert>
        )}

        <DialogFooter className="justify-between sm:justify-between">
          {(exportStatus.status === 'success' || exportStatus.status === 'error') && (
            <Button type="button" variant="outline" onClick={resetExport}>
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

export default ExportData;