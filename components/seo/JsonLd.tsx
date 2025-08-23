import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      id="json-ld"
      type="application/ld+json"
    />
  );
}
