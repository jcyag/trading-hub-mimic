
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeftRight, 
  BarChart, 
  Compass, 
  Home, 
  Menu, 
  Wallet, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        {!collapsed && (
          <h1 className="text-lg font-bold text-primary">CryptoTrade</h1>
        )}
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

      <nav className="p-2">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          to="/" 
          collapsed={collapsed} 
          active 
        />
        <SidebarItem 
          icon={<BarChart size={20} />} 
          label="Markets" 
          to="/markets" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<ArrowLeftRight size={20} />} 
          label="Trade" 
          to="/trade" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<Wallet size={20} />} 
          label="Portfolio" 
          to="/portfolio" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<Compass size={20} />} 
          label="Explore" 
          to="/explore" 
          collapsed={collapsed} 
        />
      </nav>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed: boolean;
  active?: boolean;
}

function SidebarItem({ icon, label, to, collapsed, active }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors",
        active 
          ? "bg-accent text-accent-foreground" 
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
