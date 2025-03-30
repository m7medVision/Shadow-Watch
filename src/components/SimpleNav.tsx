import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import ImportData from './DataManagement/ImportData';
import ExportData from './DataManagement/ExportData';
import { cn } from '@/lib/utils';

interface NavBarProps {
  showDataControls?: boolean;
  title?: string;
}

const NavBar = ({ showDataControls = false, title = "Shadow Watch" }: NavBarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-2 transition-colors hover:opacity-80">
            <div className="flex items-center justify-center size-9 rounded-lg bg-primary shadow-sm">
              <Shield size={18} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          </Link>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {showDataControls && (
              <div className="flex items-center gap-2 pr-2 mr-2 border-r border-border/60">
                <ImportData />
                <ExportData />
              </div>
            )}
            
            <Button variant="outline" asChild size="sm" className={cn(
              "rounded-full transition-all hover:bg-primary hover:text-primary-foreground",
              "font-medium"
            )}>
              <Link to="/" className="flex items-center gap-1.5">
                <ArrowLeft size={16} />
                <span>Back to Map</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;