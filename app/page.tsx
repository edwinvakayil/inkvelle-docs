import { Metadata } from "next";
import HeroPlayground from "../components/HeroPlayground";

export const metadata: Metadata = {
  title: "Inkvelle — Modern Typography Interface",
  description: 
    "Experience Inkvelle: A minimalist React typography library with 40+ animations, custom motion filters, and automatic Google Fonts injection.",
  alternates: {
    canonical: "https://inkvelle.edwinvakayil.info/",
  },
  authors: [{ name: "Edwin Vakayil", url: "https://www.edwinvakayil.info/" }],
  openGraph: {
    title: "Inkvelle — Typography for Modern Interfaces",
    description: "43+ entrance animations, Google Fonts support, and custom motionConfig for React.",
    url: "https://inkvelle.edwinvakayil.info/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Inkvelle Typography Preview" }],
  }
};

export default function Page() {
  return <HeroPlayground />;
}