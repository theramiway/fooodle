import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/data/menuData";
import { ReviewModal } from "@/components/ReviewModal"; // ✅ Import the Modal

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

const MenuCard = ({ item, index = 0 }: MenuCardProps) => {
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find(i => i.id === item.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {item.badge && (
          <Badge
            variant={item.badgeVariant || "default"}
            className="absolute top-3 right-3 shadow-lg"
          >
            {item.badge}
          </Badge>
        )}
        
        <div className="absolute top-3 left-3 w-6 h-6 rounded-sm border-2 flex items-center justify-center bg-white shadow-sm">
          <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>

        {quantityInCart > 0 && (
          <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
            {quantityInCart} in cart
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        
        {/* Actions Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-accent">
            ₹{item.price}
          </span>
          
          <div className="flex items-center gap-2">
            {/* ✅ Review Modal Button */}
            <ReviewModal foodItemName={item.name} />

            {/* Existing Add Button */}
            <Button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`rounded-full px-4 transition-all duration-300 ${
                isAdding 
                  ? 'bg-green-500 hover:bg-green-500' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;