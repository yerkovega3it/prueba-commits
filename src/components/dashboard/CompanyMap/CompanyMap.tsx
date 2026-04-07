const companyMaps = import.meta.glob("/src/assets/maps/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface CompanyMapProps {
  companyName: string;
  className?: string;
}

export default function CompanyMap({ companyName, className = "" }: CompanyMapProps) {
  const normalizedCompanyName = companyName.toLowerCase().replace(/\s+/g, "-");
  const mapSrc = companyMaps[`/src/assets/maps/${normalizedCompanyName}.svg`];

  if (mapSrc) {
    return (
      <img
        src={mapSrc}
        alt={`Mapa ${companyName}`}
        className={`w-full object-contain rounded-3xl ${className}`}
      />
    );
  }

  return <div className={`w-full rounded-3xl ${className}`} />;
}
