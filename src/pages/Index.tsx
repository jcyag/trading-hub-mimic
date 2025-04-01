
import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { TradingForm } from "@/components/dashboard/TradingForm";
import { Portfolio } from "@/components/dashboard/Portfolio";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header sidebarWidth={0} />
      
      <div className="pt-24 pb-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="h-full">
              <PriceChart />
            </div>
          </div>
          <div className="h-full">
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
