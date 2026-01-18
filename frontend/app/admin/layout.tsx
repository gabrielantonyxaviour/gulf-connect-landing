import { AuthProvider } from '@/lib/auth/auth-context';
import { AdminLayoutClient } from './components/admin-layout-client';

export const metadata = {
  title: 'Admin - Rax Tech',
  description: 'Rax Tech Admin Panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AuthProvider>
  );
}
