import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, Clock } from "lucide-react";

const offers = [
  {
    icon: Percent,
    title: "20% Off First Order",
    description: "Use code FIRST20 at checkout",
    badge: "New User",
    color: "from-accent to-secondary",
  },
  {
    icon: Gift,
    title: "Combo Deals",
    description: "Save ₹50 on meal combos",
    badge: "Popular",
    color: "from-primary to-teal-light",
  },
  {
    icon: Clock,
    title: "Happy Hours",
    description: "3PM-5PM: Free filter coffee with any meal",
    badge: "Limited",
    color: "from-secondary to-accent",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Special <span className="text-accent">Offers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these amazing deals!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <Link
              key={offer.title}
              to="/menu"
              className="group relative bg-card rounded-2xl p-6 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <Badge variant="secondary" className="mb-4">
                {offer.badge}
              </Badge>
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center mb-4 shadow-lg`}>
                <offer.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                {offer.title}
              </h3>
              <p className="text-muted-foreground">
                {offer.description}
              </p>
              
              <div className="mt-4 text-primary font-medium text-sm group-hover:underline">
                Claim offer →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
