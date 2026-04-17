import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ isMobile, onNavigate }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const activePath = location.pathname;

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate();
  };

  const navItemClass = (pathPrefix: string) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
      activePath.startsWith(pathPrefix)
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground'
    );

  return (
    <div className={cn("hidden md:flex flex-col h-full bg-card border-r", isMobile ? "!flex border-none w-full" : "w-64")}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          <span>Admin Panel</span>
        </h2>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <div className="mb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-primary">
              Management
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm gap-1 ml-2">
              <Link
                to="/employee"
                onClick={onNavigate}
                className={navItemClass('/employee')}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Employee</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t bg-muted/20">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
