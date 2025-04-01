
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
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
        <h2 className="text-lg font-semibold text-left">Your Portfolio</h2>
        <button className="text-primary text-sm font-medium hover:underline">View all assets</button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-muted-foreground text-sm text-left">Total Balance</p>
            <h3 className="text-2xl font-bold text-left">${totalBalance.toLocaleString(undefined, {
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
            <p className="text-sm text-muted-foreground mb-2 text-left">Balance History</p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceHistory} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                    domain={['dataMin - 500', 'dataMax + 500']}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Balance']}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: '0.375rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#6366F1" 
                    strokeWidth={2}
                    dot={{ 
                      fill: '#6366F1', 
                      stroke: 'var(--card)', 
                      strokeWidth: 2,
                      r: 4
                    }}
                    activeDot={{ 
                      fill: '#6366F1',
                      stroke: 'var(--card)',
                      strokeWidth: 2,
                      r: 6
                    }}
                    fill="url(#colorBalance)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-3 text-left">Asset Allocation</p>
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
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend moved below the chart */}
          <div className="flex flex-wrap justify-start gap-4 mt-2">
            {portfolioData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-sm mr-1"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-foreground">{entry.name} - {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
