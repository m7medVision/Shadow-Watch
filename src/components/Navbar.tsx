import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: 'dashboard' | 'report';
  setCurrentPage: (page: 'dashboard' | 'report') => void;
}

const Navbar = ({ currentPage, setCurrentPage }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 shadow-sm border-b border-border/40 px-4 rounded-2xl">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-full">
            <Shield size={20} className="text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-xl font-bold tracking-tight">Shadow Watch</h1>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Button 
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'} 
            onClick={() => setCurrentPage('dashboard')}
            className="px-6 transition-all duration-200 hover:scale-105"
          >
            Dashboard
          </Button>
          <Button 
            variant={currentPage === 'report' ? 'default' : 'ghost'} 
            onClick={() => setCurrentPage('report')}
            className="px-6 transition-all duration-200 hover:scale-105"
          >
            Report Crime
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`container mx-auto transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMobileMenuOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 px-2 flex flex-col space-y-2 bg-background/95 backdrop-blur-sm rounded-b-lg shadow-lg">
          <Button 
            variant={currentPage === 'dashboard' ? 'default' : 'ghost'} 
            onClick={() => {
              setCurrentPage('dashboard');
              setIsMobileMenuOpen(false);
            }}
            className="w-full justify-start text-lg"
          >
            Dashboard
          </Button>
          <Button 
            variant={currentPage === 'report' ? 'default' : 'ghost'} 
            onClick={() => {
              setCurrentPage('report');
              setIsMobileMenuOpen(false);
            }}
            className="w-full justify-start text-lg"
          >
            Report Crime
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
