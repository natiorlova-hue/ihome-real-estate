// components/ui/Logo.tsx
interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10 w-auto" }: LogoProps) {
  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-terracotta-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">iH</span>
        </div>
        <span className="text-xl font-serif font-bold text-gray-900">
          iHome
        </span>
      </div>
    </div>
  );
}
