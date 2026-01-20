import { Link } from "react-router-dom";
import { Coffee, Utensils, Flame, IceCream, Cookie, Soup } from "lucide-react";

const categories = [
  {
    icon: Flame,
    name: "Hot & Fresh",
    description: "Straight from the kitchen",
    color: "bg-accent/10 text-accent",
    link: "/menu",
  },
  {
    icon: Utensils,
    name: "Dosa Varieties",
    description: "Crispy & delicious",
    color: "bg-primary/10 text-primary",
    link: "/menu",
  },
  {
    icon: Coffee,
    name: "Beverages",
    description: "Filter coffee & more",
    color: "bg-secondary/10 text-secondary",
    link: "/menu",
  },
  {
    icon: Soup,
    name: "Meals",
    description: "Complete thalis",
    color: "bg-primary/10 text-primary",
    link: "/menu",
  },
  {
    icon: IceCream,
    name: "Desserts",
    description: "Sweet endings",
    color: "bg-accent/10 text-accent",
    link: "/menu",
  },
  {
    icon: Cookie,
    name: "Snacks",
    description: "Tasty bites",
    color: "bg-secondary/10 text-secondary",
    link: "/menu",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Explore by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground">Find your favorite South Indian dishes</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group bg-card rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
