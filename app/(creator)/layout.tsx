import MainLayout from '@/components/layouts/MainLayout';

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="p-1">
        <h1 className="text-2xl font-bold mb-6">Creator Portal</h1>
        {children}
      </div>
    </MainLayout>
  );
}