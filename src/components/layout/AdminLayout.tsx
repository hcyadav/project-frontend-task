import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/10">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
