import logoSrc from "@/assets/logo.avif";

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = "", height = 56 }: LogoProps) {
  const width = Math.round(height * (910 / 233));
  return (
    <img
      src={logoSrc}
      alt="Reda Alalach"
      width={width}
      height={height}
      className={`${className} logo-theme`}
      style={{
        height,
        width,
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}
