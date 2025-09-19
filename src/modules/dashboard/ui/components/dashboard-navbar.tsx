"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { DashboardCommand } from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Fragment>
      <DashboardCommand open={commandOpen} onOpenChange={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 bg-background border-b">
        <Button
          variant="outline"
          className="size-9"
          onClick={toggleSidebar}
          size="sm"
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          className="size-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </Fragment>
  );
};

export default DashboardNavbar;
