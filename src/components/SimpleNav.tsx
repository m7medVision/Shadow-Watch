import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import ImportData from './DataManagement/ImportData';
import ExportData from './DataManagement/ExportData';
import { cn } from '@/lib/utils';

interface SimpleNavProps {
  showDataControls?: boolean;
  title?: string;
}

const SimpleNav = ({ showDataControls = false, title = "Shadow Watch" }: SimpleNavProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between gap-2">
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
              <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                  <ImportData />
                </div>
                <div className="hidden sm:block">
                  <ExportData />
                </div>
                <div className="sm:hidden">
                  <Button variant="outline" size="icon" className="rounded-full p-2" asChild>
                    <Link to="/" title="Import/Export">
                      <Shield size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            
            <Button variant="outline" asChild size="sm" className={cn(
              "rounded-full transition-all hover:bg-primary hover:text-primary-foreground",
              "font-medium"
            )}>
              <Link to="/" className="flex items-center gap-1.5">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Map</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNav;