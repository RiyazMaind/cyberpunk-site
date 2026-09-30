import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="content" className="flex-1">
        <Hero />
      </main>
      <SiteFooter />
    </>
  );
}
