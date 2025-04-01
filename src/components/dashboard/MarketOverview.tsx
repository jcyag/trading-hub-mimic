
import { 
  ArrowDown, 
  ArrowUp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketOverview() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Market Overview</h2>
        <button className="text-muted-foreground hover:text-primary text-sm flex items-center transition-colors">
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="flex flex-col space-y-3">
        {topCryptos.map((crypto) => (
          <CryptoBar key={crypto.symbol} {...crypto} />
        ))}
      </div>
    </div>
  );
}

interface CryptoCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  iconUrl: string;
}

function CryptoBar({ name, symbol, price, change, iconUrl }: CryptoCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-accent rounded-lg p-3 border border-border hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-card flex items-center justify-center rounded-full">
            <img src={iconUrl} alt={name} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{symbol}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <p className="font-semibold">${price.toLocaleString()}</p>
          <div 
            className={cn(
              "flex items-center text-sm font-medium",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const topCryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 43567.89,
    change: 2.34,
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2345.67,
    change: -1.45,
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024"
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 320.45,
    change: 3.12,
    iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024"
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 1.23,
    change: -0.56,
    iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=024"
  }
];
