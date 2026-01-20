import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryList from "@/components/CategoryList";
import FeaturedDishes from "@/components/FeaturedDishes";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoryList />
      <FeaturedDishes />
      <Footer />
    </div>
  );
};

export default Index;
