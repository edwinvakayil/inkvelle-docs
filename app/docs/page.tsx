import { Metadata } from "next";
import DocsContent from "../../components/DocsContent";

export const metadata: Metadata = {
  title: "API Reference & Motion Guide",
  description: 
    "Explore the Inkvelle API. Detailed prop reference for typography variations, custom CSS motion configurations, and interactive animation guides.",
  alternates: {
    canonical: "https://inkvelle.edwinvakayil.info/docs",
  },
  authors: [{ name: "Edwin Vakayil", url: "https://www.edwinvakayil.info/" }],
  openGraph: {
    title: "Inkvelle Documentation",
    description: "Full prop reference and custom motion config playground for Inkvelle.",
    url: "https://inkvelle.edwinvakayil.info/docs",
  }
};

export default function Page() {
  return <DocsContent />;
}
