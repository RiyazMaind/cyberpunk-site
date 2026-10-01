import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { Hero } from "@/components/sections/hero";
import { StatusPanel } from "@/components/sections/status-panel";
import { Features } from "@/components/sections/features";
import { Terminal } from "@/components/sections/terminal";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="content" className="flex-1">
        <Hero />
        <StatusPanel />
        <Features />
        <Terminal />
      </main>
      <SiteFooter />
    </>
  );
}
