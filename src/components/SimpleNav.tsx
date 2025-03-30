import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import ImportData from './DataManagement/ImportData';
import ExportData from './DataManagement/ExportData';

interface SimpleNavProps {
  showDataControls?: boolean;
  title?: string;
}

const SimpleNav = ({ showDataControls = false, title = "Shadow Watch" }: SimpleNavProps) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 shadow-sm border-b border-border/40 px-4">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-full">
            <Shield size={20} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {showDataControls && (
            <>
              <ImportData />
              <ExportData />
            </>
          )}
          
          <Button variant="ghost" asChild className="rounded-full">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              <span>Back to Map</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNav;