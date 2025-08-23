"use client";

import Script from "next/script";

type StructuredDataProps = {
  data: Record<string, any>;
  id?: string;
};

export default function StructuredData({ data, id = "structured-data" }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="afterInteractive"
    />
  );
}