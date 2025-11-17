import Image from "next/image";
import { cn } from "@/lib/utils"; // if you're using shadcn or your own cn util

interface LogoProps {
  size?: number; // optional prop for width/height
  className?: string; // new prop for custom styling
}

const Logo: React.FC<LogoProps> = ({ size = 100, className }) => {
  return (
    <Image
      src="/Logo.png"
      alt="logo"
      width={size}
      height={size}
      priority
      className={cn("object-contain", className)}
    />
  );
};

export default Logo;
