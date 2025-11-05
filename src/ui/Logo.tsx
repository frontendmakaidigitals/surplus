import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number; // optional prop for width/height
}

const Logo: React.FC<LogoProps> = ({ size = 100 }) => {
  return (
    <Image
      src="/Logo.png"
      alt="logo"
      width={size}
      height={size}
      priority
    />
  );
};

export default Logo;
