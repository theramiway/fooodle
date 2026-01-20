import CategoryCard from "./CategoryCard";

// Import category images
import categoryBreakfast from "@/assets/category-breakfast.jpg";
import categoryDosa from "@/assets/category-dosa.jpg";
import categoryMeals from "@/assets/category-meals.jpg";
import categorySnacks from "@/assets/category-snacks.jpg";
import categoryBeverages from "@/assets/category-beverages.jpg";
import categoryDesserts from "@/assets/category-desserts.jpg";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
}

export const categoryList: Category[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    slug: "breakfast",
    image: categoryBreakfast,
    itemCount: 8,
  },
  {
    id: "dosa",
    name: "Dosa Types",
    slug: "dosa",
    image: categoryDosa,
    itemCount: 12,
  },
  {
    id: "meals",
    name: "Meals",
    slug: "meals",
    image: categoryMeals,
    itemCount: 5,
  },
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks",
    image: categorySnacks,
    itemCount: 10,
  },
  {
    id: "beverages",
    name: "Beverages",
    slug: "beverages",
    image: categoryBeverages,
    itemCount: 7,
  },
  {
    id: "desserts",
    name: "Desserts",
    slug: "desserts",
    image: categoryDesserts,
    itemCount: 4,
  },
];

interface CategoryListProps {
  showTitle?: boolean;
  className?: string;
}

const CategoryList = ({ showTitle = true, className = "" }: CategoryListProps) => {
  return (
    <section className={`py-12 md:py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
              What's on your mind?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore our delicious South Indian categories
            </p>
          </div>
        )}

        {/* Horizontal scrollable on mobile, grid on larger screens */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:overflow-visible md:grid md:grid-cols-7 gap-4 md:gap-6 lg:gap-8 scrollbar-hide justify-center">
          {categoryList.map((category, index) => (
            <div
              key={category.id}
              className="flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CategoryCard
                name={category.name}
                image={category.image}
                slug={category.slug}
                itemCount={category.itemCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
