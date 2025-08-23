import { ElementType, SVGProps } from "react";
import { SimpleIcon } from "simple-icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SocialKeys =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "dribbble"
  | "behance"
  | "youtube"
  | "website"
  | "portfolio";

export type TechItem =
  | { name: string; icon: SimpleIcon } // untuk simple-icons
  | { name: string; local: string } // untuk file lokal SVG
  | { name: string; initials: string }; // untuk fallback monogram

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  skills: string[];
  image?: string;
  /** tambahkan link sosial/portofolio di sini (opsional per kunci) */
  socials?: Partial<Record<SocialKeys, string>>;
};

export type ProductItem = {
  title: string;
  description: string;
  icon: ElementType;
  examples: string[];
  image?: string;
};

export type ProductSectionProps = {
  id?: string;
  title?: string;
  description?: string;
  items: ProductItem[];
  className?: string;
  variant?: "light" | "dark";
};
