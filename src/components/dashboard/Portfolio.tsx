
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const portfolioData = [
  { name: "Bitcoin", value: 60, color: "#F7931A" },
  { name: "Ethereum", value: 25, color: "#627EEA" },
  { name: "Cardano", value: 10, color: "#3CC8C8" },
  { name: "Other", value: 5, color: "#8A92B2" },
];

const balanceHistory = [
  { month: "Aug", balance: 8500 },
  { month: "Sep", balance: 9200 },
  { month: "Oct", balance: 8800 },
  { month: "Nov", balance: 9100 },
  { month: "Dec", balance: 10300 },
];

export function Portfolio() {
  const totalBalance = 10382.73;
  const todayProfit = 284.32;
  const todayProfitPercentage = 2.82;
  
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-lg font-semibold">Your Portfolio</h2>
        <button className="text-primary text-sm font-medium hover:underline">View all assets</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-muted-foreground text-sm">Total Balance</p>
            <h3 className="text-2xl font-bold">${totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</h3>
            <div className="flex items-center mt-1 text-success text-sm">
              <ArrowUpRight size={14} />
              <span className="font-medium">${todayProfit.toLocaleString()} ({todayProfitPercentage}%) today</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-md transition-colors">
              Deposit
            </button>
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 rounded-md transition-colors">
              Withdraw
            </button>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Balance History</p>
            <div className="flex items-end h-[80px] gap-1">
              {balanceHistory.map((item, i) => {
                const heightPercentage = (item.balance / 10300) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="w-full bg-accent relative">
                      <div 
                        className={cn(
                          "absolute bottom-0 left-0 w-full bg-primary rounded-t transition-all duration-500",
                          i === balanceHistory.length - 1 ? "bg-success" : ""
                        )}
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-3">Asset Allocation</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  formatter={(value, entry, index) => (
                    <span className="text-foreground">{value} - {portfolioData[index!].value}%</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
