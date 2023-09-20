import { MainNav } from "@/components/nav/main-nav";
import { ModeToggle } from "@/components/nav/mode-toggle";
import { MobileNav } from "./mobile-nav";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <nav className="flex items-center">
            <a href="https://github.com/sevenreup/toolbox-web" target="_blank">
              <Button size="icon" variant="ghost">
                <Github />
              </Button>
            </a>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
