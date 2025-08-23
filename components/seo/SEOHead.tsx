import { Metadata } from "next";
import { ReactNode } from "react";
import StructuredData from "./StructuredData";
import { constructMetadata, generateStructuredData } from "@/lib/seo";

type SEOHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  structuredData?: {
    type: "WebSite" | "Organization" | "Service";
    data?: any;
  }[];
  children?: ReactNode;
};

export function generateSEOMetadata({
  title,
  description,
  image,
  noIndex = false,
}: Omit<SEOHeadProps, "structuredData" | "children">): Metadata {
  return constructMetadata({
    title,
    description,
    image,
    noIndex,
  });
}

export default function SEOHead({
  structuredData = [],
  children,
}: Pick<SEOHeadProps, "structuredData" | "children">) {
  return (
    <>
      {structuredData.map((schema, index) => (
        <StructuredData
          key={index}
          id={`structured-data-${schema.type.toLowerCase()}-${index}`}
          data={generateStructuredData(schema.type, schema.data)}
        />
      ))}
      {children}
    </>
  );
}