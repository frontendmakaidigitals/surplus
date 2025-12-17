'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start loading on route change
    setIsLoading(true);

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }

    // Wait for window load event
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    window.addEventListener('load', handleLoad);

    // Fallback: hide loader after max 2 seconds
    const maxTimer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(maxTimer);
    };
  }, [pathname, searchParams]); // Trigger on route OR query param change

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}