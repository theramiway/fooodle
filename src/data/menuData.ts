import masalaDosa from "@/assets/masala-dosa.jpg";
import idliVada from "@/assets/idli-vada.jpg";
import mangaloreBuns from "@/assets/mangalore-buns.jpg";
import filterCoffee from "@/assets/filter-coffee.jpg";
import miniMeals from "@/assets/mini-meals.jpg";
import uttapam from "@/assets/uttapam.jpg";
import ravaDosa from "@/assets/rava-dosa.jpg";
import pongal from "@/assets/pongal.jpg";
import meduVada from "@/assets/medu-vada.jpg";
import kesariBath from "@/assets/kesari-bath.jpg";
import buttermilk from "@/assets/buttermilk.jpg";
import chai from "@/assets/masala-chai.jpg";
import minimeal from "@/assets/mini-meal.jpg";
import samosa from "@/assets/samosa.jpg";
import kesari from "@/assets/kesari_bhat.jpg";
import setd from "@/assets/set-dosa.jpg";
import masalad from "@/assets/masalad.jpg";
import chapathi from "@/assets/chapati-meal.jpg";
import plaind from "@/assets/plain-dosa.jpg";
import manglore from "@/assets/manglore-buns.jpg";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive";
  isVeg: boolean;
  isPopular?: boolean;
}

export const categories = [
  { id: "all", name: "All Items", icon: "🍽️" },
  { id: "breakfast", name: "Breakfast", icon: "🌅" },
  { id: "dosa", name: "Dosa Varieties", icon: "🥞" },
  { id: "meals", name: "Meals", icon: "🍛" },
  { id: "snacks", name: "Snacks", icon: "🍿" },
  { id: "beverages", name: "Beverages", icon: "☕" },
  { id: "desserts", name: "Desserts", icon: "🍮" },
];

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: 1,
    name: "Idli Vada Combo",
    description: "Soft steamed idlis with crispy medu vada, served with sambar & chutneys",
    price: 45,
    image: idliVada,
    category: "breakfast",
    badge: "Best Seller",
    badgeVariant: "default",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 2,
    name: "Ven Pongal",
    description: "Creamy rice-lentil dish with ghee, cashews, pepper & curry leaves",
    price: 55,
    image: pongal,
    category: "breakfast",
    isVeg: true,
  },
  {
    id: 3,
    name: "Mangalore Buns",
    description: "Sweet fluffy fried bread made with ripe bananas, served with chutney",
    price: 50,
    image: manglore,
    category: "breakfast",
    badge: "Popular",
    badgeVariant: "secondary",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 4,
    name: "Medu Vada",
    description: "Crispy golden lentil fritters with sambar & coconut chutney",
    price: 35,
    image: meduVada,
    category: "breakfast",
    isVeg: true,
  },

  // Dosa Varieties
  {
    id: 5,
    name: "Masala Dosa",
    description: "Crispy fermented crepe with spiced potato filling & accompaniments",
    price: 60,
    image: masalad,
    category: "dosa",
    badge: "Chef's Special",
    badgeVariant: "default",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 6,
    name: "Rava Dosa",
    description: "Crispy semolina crepe with onions, green chilies & curry leaves",
    price: 55,
    image: ravaDosa,
    category: "dosa",
    isVeg: true,
  },
  {
    id: 7,
    name: "Onion Uttapam",
    description: "Thick savory pancake topped with onions, tomatoes & green chilies",
    price: 50,
    image: uttapam,
    category: "dosa",
    badge: "Hot Deal",
    badgeVariant: "destructive",
    isVeg: true,
  },
  {
    id: 8,
    name: "Plain Dosa",
    description: "Classic thin crispy fermented crepe with sambar & chutney",
    price: 40,
    image: plaind,
    category: "dosa",
    isVeg: true,
  },
  {
    id: 9,
    name: "Set Dosa",
    description: "Soft spongy dosas served in a set of 3 with special chutney",
    price: 45,
    image: setd,
    category: "dosa",
    isVeg: true,
  },

  // Meals
  {
    id: 10,
    name: "Mini Meals",
    description: "Rice, sambar, rasam, 2 vegetables, papad, pickle & payasam",
    price: 120,
    image: minimeal,
    category: "meals",
    badge: "Value Deal",
    badgeVariant: "secondary",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 11,
    name: "Full Meals",
    description: "Complete thali with rice, 3 vegetables, rasam, curd & dessert",
    price: 160,
    image: miniMeals,
    category: "meals",
    isVeg: true,
  },
  {
    id: 12,
    name: "Chapati Meals",
    description: "4 chapatis with dal, paneer curry & salad",
    price: 100,
    image: chapathi,
    category: "meals",
    isVeg: true,
  },

  // Snacks
  {
    id: 13,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes & peas",
    price: 25,
    image: samosa,
    category: "snacks",
    isVeg: true,
  },
  {
    id: 14,
    name: "Mysore Bonda",
    description: "Deep-fried savory dumplings made with urad dal",
    price: 30,
    image: mangaloreBuns,
    category: "snacks",
    isVeg: true,
  },

  // Beverages
  {
    id: 15,
    name: "Filter Coffee",
    description: "Authentic South Indian filter coffee in traditional tumbler",
    price: 30,
    image: filterCoffee,
    category: "beverages",
    badge: "Must Try",
    badgeVariant: "default",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 16,
    name: "Masala Chai",
    description: "Hot spiced tea with ginger, cardamom & cinnamon",
    price: 25,
    image: chai,
    category: "beverages",
    isVeg: true,
  },
  {
    id: 17,
    name: "Buttermilk",
    description: "Refreshing spiced yogurt drink with curry leaves",
    price: 20,
    image: buttermilk,
    category: "beverages",
    isVeg: true,
  },

  // Desserts
  {
    id: 18,
    name: "Kesari Bath",
    description: "Sweet semolina pudding with saffron, cashews & raisins",
    price: 40,
    image: kesari,
    category: "desserts",
    badge: "Sweet Delight",
    badgeVariant: "secondary",
    isVeg: true,
    isPopular: true,
  },
  {
    id: 19,
    name: "Payasam",
    description: "Traditional South Indian rice pudding with cardamom",
    price: 35,
    image: kesariBath,
    category: "desserts",
    isVeg: true,
  },
];

export const getPopularItems = () => menuItems.filter(item => item.isPopular);
export const getItemsByCategory = (category: string) => 
  category === "all" ? menuItems : menuItems.filter(item => item.category === category);
