import './App.css'
import Dashboard from "@/pages/Dashboard";
import ReportCrime from '@/pages/ReportCrime';
import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'report'>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shadow Watch</h1>
            <p className="text-muted-foreground mt-1">
              Interactive crime reporting and tracking system
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={currentPage === 'dashboard' ? 'default' : 'outline'} 
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={currentPage === 'report' ? 'default' : 'outline'} 
              onClick={() => setCurrentPage('report')}
            >
              Report Crime
            </Button>
          </div>
        </header>
        
        {currentPage === 'dashboard' ? <Dashboard /> : <ReportCrime />}
      </div>
    </div>
  );
}

export default App
