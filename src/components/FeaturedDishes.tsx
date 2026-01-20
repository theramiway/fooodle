import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { getPopularItems } from "@/data/menuData";

const FeaturedDishes = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const popularDishes = getPopularItems().slice(0, 4);

  const handleAddToCart = (item: typeof popularDishes[0]) => {
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
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular <span className="text-primary">Dishes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most loved dishes, prepared fresh daily with authentic recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {dish.badge && (
                  <Badge
                    variant={dish.badgeVariant}
                    className="absolute top-4 right-4 shadow-md"
                  >
                    {dish.badge}
                  </Badge>
                )}
                <div className="absolute top-4 left-4 w-6 h-6 rounded-sm border-2 flex items-center justify-center bg-white shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">
                    ₹{dish.price}
                  </span>
                  <Button 
                    onClick={() => handleAddToCart(dish)}
                    className="bg-primary hover:bg-primary/90 rounded-full"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
