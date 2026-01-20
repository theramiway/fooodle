import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  itemCount?: number;
}

const CategoryCard = ({ name, image, slug, itemCount }: CategoryCardProps) => {
  return (
    <Link
      to={`/menu?category=${slug}`}
      className="group flex flex-col items-center gap-3 p-2 transition-all duration-300"
    >
      {/* Circular Image Container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-card">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Category Name */}
      <div className="text-center">
        <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        {itemCount !== undefined && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {itemCount} items
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
