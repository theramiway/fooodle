import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { menuItems } from "@/data/menuData";

const liveItems = [
  { ...menuItems[4], prepTime: "8 min", available: 10 }, // Masala Dosa
  { ...menuItems[0], prepTime: "5 min", available: 15 }, // Idli Vada
  { ...menuItems[3], prepTime: "10 min", available: 12 }, // Medu Vada
  { ...menuItems[6], prepTime: "12 min", available: 8 }, // Uttapam
  { ...menuItems[1], prepTime: "10 min", available: 6 }, // Pongal
];

const HotAndFresh = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleOrder = (item: typeof liveItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} is being prepared fresh for you.`,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Flame className="h-10 w-10 text-accent animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Hot & Fresh
          </h2>
          <Flame className="h-10 w-10 text-accent animate-float" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <p className="text-center text-lg mb-12 text-primary-foreground/90 max-w-xl mx-auto">
          Ready to serve! These items are being prepared fresh right now
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {liveItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-primary-foreground text-foreground rounded-2xl p-4 hover:scale-105 transition-all duration-300 animate-fade-in shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Badge variant="secondary" className="mb-2 bg-accent/20 text-accent border-0">
                <Flame className="h-3 w-3 mr-1" />
                Live
              </Badge>
              <h3 className="font-bold text-base mb-1 line-clamp-1">{item.name}</h3>
              <div className="text-sm text-muted-foreground mb-1">
                Ready: <span className="font-semibold text-primary">{item.prepTime}</span>
              </div>
              <div className="text-sm mb-3">
                <span className="text-accent font-bold">₹{item.price}</span>
                <span className="text-muted-foreground ml-2">• {item.available} left</span>
              </div>
              <Button 
                onClick={() => handleOrder(item)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm"
              >
                Order Now
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/*<div className="torn-edge" />*/}
    </section>
  );
};

export default HotAndFresh;
