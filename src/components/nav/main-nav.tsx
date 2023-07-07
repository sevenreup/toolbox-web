"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/data";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            "flex items-center",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
          href="/"
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          {siteConfig.name}
        </Link>
      </nav>
    </div>
  );
}
