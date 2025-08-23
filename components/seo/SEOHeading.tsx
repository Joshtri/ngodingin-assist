import { ReactNode } from "react";

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SEOHeading({
  level,
  children,
  className = "",
  id,
}: SEOHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const defaultClasses = {
    1: "text-4xl md:text-5xl font-bold tracking-tight",
    2: "text-3xl md:text-4xl font-semibold",
    3: "text-2xl md:text-3xl font-semibold",
    4: "text-xl md:text-2xl font-medium",
    5: "text-lg md:text-xl font-medium",
    6: "text-base md:text-lg font-medium",
  };

  const combinedClassName = `${defaultClasses[level]} ${className}`.trim();

  return (
    <Tag className={combinedClassName} id={id}>
      {children}
    </Tag>
  );
}

// Helper untuk breadcrumb SEO
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function SEOBreadcrumb({ items, className = "" }: SEOBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-gray-600">
                {item.name}
              </span>
            ) : (
              <a
                className="text-blue-600 hover:text-blue-800 transition-colors"
                href={item.url}
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
