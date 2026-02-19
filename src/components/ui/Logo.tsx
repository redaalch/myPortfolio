import logoSrc from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 40 }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Reda Alalach"
      width={Math.round(height * (910 / 233))}
      height={height}
      className={`${className} logo-theme`}
      style={{
        height,
        width: "auto",
        objectFit: "contain",
      }}
    />
  );
}
