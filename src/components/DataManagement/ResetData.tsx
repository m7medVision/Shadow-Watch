import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { clearLocalStorage } from "@/data";
import { Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ResetData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [resetStatus, setResetStatus] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleReset = async () => {
    setResetStatus({ status: 'loading', message: 'Clearing data...' });
    
    try {
      // Clear all crime data
      clearLocalStorage();
      
      setResetStatus({
        status: 'success',
        message: 'All crime data has been cleared successfully'
      });
      
      // Reload after 2 seconds to reflect the changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setResetStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to clear data'
      });
    }
  };

  const resetStatusState = () => {
    setResetStatus({ status: 'idle', message: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetStatusState();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border-red-200">
          <Trash2 size={18} />
          <span>Reset</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md z-[1100] fixed">
        <DialogHeader>
          <DialogTitle>Reset Crime Data</DialogTitle>
          <DialogDescription>
            This will delete all crime data from the system. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {resetStatus.status === 'idle' && (
          <div className="flex flex-col items-center justify-center p-6">
            <Trash2 className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-sm text-center mb-4 font-medium text-red-700">
              Warning: This will permanently delete all crime data. Are you sure you want to continue?
            </p>
            <div className="flex gap-4 w-full">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleReset} 
                variant="destructive" 
                className="flex-1"
              >
                Reset All Data
              </Button>
            </div>
          </div>
        )}

        {resetStatus.status === 'loading' && (
          <div className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Clearing all data...</p>
          </div>
        )}

        {resetStatus.status === 'success' && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{resetStatus.message}</AlertDescription>
          </Alert>
        )}

        {resetStatus.status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{resetStatus.message}</AlertDescription>
          </Alert>
        )}

        <DialogFooter className="justify-between sm:justify-between">
          {(resetStatus.status === 'success' || resetStatus.status === 'error') && (
            <Button type="button" variant="outline" onClick={resetStatusState}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetData;