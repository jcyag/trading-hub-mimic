
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  sidebarWidth: number;
}

export function Header({ sidebarWidth }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header 
      className="fixed top-0 right-0 h-16 border-b border-border flex items-center justify-between z-30 px-4 bg-background"
      style={{ width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <div className="flex items-center w-full max-w-md relative gap-4">
        <h1 className="text-lg font-bold text-primary whitespace-nowrap">CryptoTrade</h1>
        <div className="relative flex-1">
          <Search 
            size={18} 
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
              searchFocused ? "text-primary" : "text-muted-foreground"
            )} 
          />
          <Input
            className="pl-10 bg-muted w-full"
            placeholder="Search markets..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-primary text-sm">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
