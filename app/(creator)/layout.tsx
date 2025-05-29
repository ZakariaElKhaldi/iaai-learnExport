import MainLayout from '@/components/layouts/MainLayout';

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
        {children}
    </MainLayout>
  );
}