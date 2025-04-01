
import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TimeFrame = "1H" | "24H" | "1W" | "1M" | "1Y";

export function PriceChart() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("24H");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    
    setTimeout(() => {
      setData(generateChartData(selectedTimeFrame));
      setIsLoading(false);
    }, 500);
  }, [selectedTimeFrame]);

  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;
  const firstPrice = data.length > 0 ? data[0].price : 0;
  const priceChange = currentPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Bitcoin
            <span className="text-sm font-normal text-muted-foreground">BTC/USD</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold">${currentPrice.toLocaleString(undefined, { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</p>
            <div 
              className={cn(
                "flex items-center text-sm font-medium",
                isPositive ? "text-success" : "text-danger"
              )}
            >
              {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span>{Math.abs(priceChangePercent).toFixed(2)}%</span>
            </div>
          </div>
        </div>
        
        <Tabs value={selectedTimeFrame} onValueChange={(v) => setSelectedTimeFrame(v as TimeFrame)}>
          <TabsList className="bg-accent">
            <TabsTrigger value="1H">1H</TabsTrigger>
            <TabsTrigger value="24H">24H</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[300px] w-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-full h-40 bg-accent rounded-md"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(84, 112, 198)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="rgb(84, 112, 198)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                minTickGap={20}
              />
              <YAxis 
                domain={['dataMin - 100', 'dataMax + 100']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#5470c6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#5470c6", stroke: "#fff", strokeWidth: 2 }}
                fill="url(#colorPrice)"
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="pricechart-tooltip">
        <div className="text-muted-foreground">{label}</div>
        <div className="font-semibold">
          ${payload[0].value?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    );
  }

  return null;
};

function generateChartData(timeframe: TimeFrame) {
  const now = new Date();
  const data = [];
  const pointCount = 48;
  let timeInterval: number;
  let formatString: string;
  let baseValue = 42000 + Math.random() * 5000;
  let volatility: number;

  switch(timeframe) {
    case "1H":
      timeInterval = 60 * 1000; // 1 minute
      formatString = "HH:mm";
      volatility = 10;
      break;
    case "24H":
      timeInterval = 30 * 60 * 1000; // 30 minutes
      formatString = "HH:mm";
      volatility = 50;
      break;
    case "1W":
      timeInterval = 4 * 60 * 60 * 1000; // 4 hours
      formatString = "MMM d";
      volatility = 200;
      break;
    case "1M":
      timeInterval = 24 * 60 * 60 * 1000; // 1 day
      formatString = "MMM d";
      volatility = 500;
      break;
    case "1Y":
      timeInterval = 7 * 24 * 60 * 60 * 1000; // 1 week
      formatString = "MMM yyyy";
      volatility = 2000;
      break;
    default:
      timeInterval = 30 * 60 * 1000;
      formatString = "HH:mm";
      volatility = 50;
  }

  for (let i = 0; i < pointCount; i++) {
    const time = new Date(now.getTime() - (pointCount - i) * timeInterval);
    
    // Add some randomness to price
    baseValue = baseValue + (Math.random() - 0.5) * volatility;
    
    data.push({
      time: formatDate(time, formatString),
      price: parseFloat(baseValue.toFixed(2)),
    });
  }

  return data;
}

function formatDate(date: Date, format: string): string {
  // Simple formatter - in a real app you'd use date-fns or similar
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  
  if (format === "HH:mm") {
    return `${hours}:${minutes}`;
  } else if (format === "MMM d") {
    return `${month} ${day}`;
  } else if (format === "MMM yyyy") {
    return `${month} ${year}`;
  }
  
  return date.toLocaleDateString();
}
