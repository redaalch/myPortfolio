import logoSrc from "@/assets/logo.avif";

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 40 }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Reda Alalach"
      width={Math.round(height * 1.5)}
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
