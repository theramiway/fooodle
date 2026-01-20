import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/mini-meals.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious South Indian Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <span className="inline-block bg-accent/90 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Authentic South Indian Cuisine
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Taste of <br />
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              South India
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg leading-relaxed">
            Experience the authentic flavors of traditional South Indian recipes, 
            prepared with love and served quickly to you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all"
              >
                Browse Menu
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-foreground font-semibold text-lg px-8 h-14 backdrop-blur-sm"
              >
                View Offers
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-accent">50+</p>
              <p className="text-white/70 text-sm">Menu Items</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">4.9</p>
              <p className="text-white/70 text-sm">Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">30min</p>
              <p className="text-white/70 text-sm">Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
