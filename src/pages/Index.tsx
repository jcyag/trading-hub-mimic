
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { TradingForm } from "@/components/dashboard/TradingForm";
import { Portfolio } from "@/components/dashboard/Portfolio";

const Index = () => {
  const [sidebarWidth, setSidebarWidth] = useState(224); // 56px collapsed, 224px expanded
  
  const handleResize = () => {
    const sidebar = document.querySelector('[data-sidebar]') as HTMLElement;
    if (sidebar) {
      setSidebarWidth(sidebar.offsetWidth);
    }
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // MutationObserver to detect sidebar width changes
    const sidebar = document.querySelector('[data-sidebar]') as HTMLElement;
    if (sidebar) {
      const observer = new MutationObserver(handleResize);
      observer.observe(sidebar, { attributes: true });
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <Header sidebarWidth={sidebarWidth} />
      
      <div 
        className="pt-24 pb-10 px-6"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div>
            <TradingForm />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketOverview />
          <Portfolio />
        </div>
      </div>
    </div>
  );
};

export default Index;
