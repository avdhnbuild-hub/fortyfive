import AdminPreview from '@/components/admin/AdminPreview';

export default async function AdminPreviewPage({ params }) {
  const { slug } = await params;
  return <AdminPreview slug={slug} />;
}
