import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "@/pages/Dashboard";
import ReportCrime from '@/pages/ReportCrime';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ReportCrime />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
