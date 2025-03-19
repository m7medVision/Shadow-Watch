import './App.css'
import Dashboard from "@/pages/Dashboard";
import ReportCrime from '@/pages/ReportCrime';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'report'>('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mx-auto p-4 pt-6">
        {currentPage === 'dashboard' ? <Dashboard /> : <ReportCrime />}
      </div>
    </div>
  );
}

export default App
