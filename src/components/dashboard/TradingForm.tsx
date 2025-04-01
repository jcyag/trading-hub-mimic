
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

type OrderType = "market" | "limit";
type TradeAction = "buy" | "sell";

export function TradingForm() {
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [tradeAction, setTradeAction] = useState<TradeAction>("buy");
  const [amount, setAmount] = useState<string>("0");
  const [price, setPrice] = useState<string>("42500");
  const [percentage, setPercentage] = useState<number[]>([0]);

  const handlePercentageChange = (values: number[]) => {
    setPercentage(values);
    // Update amount based on percentage
    const maxAmount = 5; // Example max amount
    setAmount((maxAmount * values[0] / 100).toFixed(8));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    // Update percentage slider
    const maxAmount = 5; // Example max amount
    const newPercentage = Math.min(parseFloat(e.target.value) * 100 / maxAmount, 100);
    setPercentage([isNaN(newPercentage) ? 0 : newPercentage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success(`${tradeAction === 'buy' ? 'Bought' : 'Sold'} ${amount} BTC ${orderType === 'limit' ? 'at $' + price : 'at market price'}`);
    
    // Reset form
    setAmount("0");
    setPercentage([0]);
  };

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Trade</h2>
      
      <Tabs defaultValue="buy" onValueChange={(v) => setTradeAction(v as TradeAction)}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="buy" className="data-[state=active]:bg-success/10 data-[state=active]:text-success">Buy</TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-danger/10 data-[state=active]:text-danger">Sell</TabsTrigger>
        </TabsList>
      
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Order Type</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button"
                  variant="outline"
                  className={cn(
                    orderType === "market" && "border-primary bg-primary/10"
                  )}
                  onClick={() => setOrderType("market")}
                >
                  Market
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className={cn(
                    orderType === "limit" && "border-primary bg-primary/10"
                  )}
                  onClick={() => setOrderType("limit")}
                >
                  Limit
                </Button>
              </div>
            </div>
            
            {orderType === "limit" && (
              <div>
                <label htmlFor="price" className="block text-sm text-muted-foreground mb-1.5">Price</label>
                <div className="relative">
                  <Input 
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute top-0 right-0 h-full flex items-center pr-3 text-muted-foreground">
                    USD
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="amount" className="block text-sm text-muted-foreground mb-1.5">Amount</label>
              <div className="relative">
                <Input 
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="pr-16"
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-3 text-muted-foreground">
                  BTC
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
              <Slider
                value={percentage}
                onValueChange={handlePercentageChange}
                max={100}
                step={1}
                className={cn(
                  tradeAction === "buy" ? "bg-success/10" : "bg-danger/10",
                )}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((percent) => (
                <Button
                  key={percent}
                  type="button"
                  variant="outline"
                  className="text-xs h-8"
                  onClick={() => handlePercentageChange([percent])}
                >
                  {percent}%
                </Button>
              ))}
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                className={cn(
                  "w-full", 
                  tradeAction === "buy" ? "bg-success hover:bg-success/90" : "bg-danger hover:bg-danger/90"
                )}
              >
                {tradeAction === "buy" ? "Buy Bitcoin" : "Sell Bitcoin"}
              </Button>
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
