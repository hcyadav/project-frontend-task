import { Menu, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';

export default function Header() {
  const { userInfo } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
      <div className="flex h-16 items-center px-4 md:px-6">
        
        {/* Mobile Hamburger Drawer Menu */}
        <div className="md:hidden mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent hover:text-accent-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle side menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col w-[280px]">
              <Sidebar isMobile />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/20 hover:bg-muted/40 transition-colors">
            <UserCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium pr-1">
              Hi, {userInfo?.name || 'User'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
