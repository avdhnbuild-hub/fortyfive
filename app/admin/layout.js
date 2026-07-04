import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin: fortyfive',
  description: 'Local-only fortyfive CMS admin.',
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
