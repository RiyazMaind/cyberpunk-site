import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="content" className="flex-1">
        <div className="min-h-[50vh]" />
      </main>
      <SiteFooter />
    </>
  );
}
