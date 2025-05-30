import Link from 'next/link';

interface QuickActionButtonProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export function QuickActionButton({
  title,
  description,
  href,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600'
}: QuickActionButtonProps) {
  return (
    <Link href={href} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow group">
      <div className="flex flex-col items-center text-center">
        <div className={`${iconBgColor} p-3 rounded-full mb-2 group-hover:scale-110 transition-transform`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </Link>
  );
} 