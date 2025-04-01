
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      data-sidebar="sidebar"
      className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        <button
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
    </div>
  );
}
