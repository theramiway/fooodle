import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTax, getTotal, getTotalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-foreground">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any delicious items yet. Explore our menu!
              </p>
              <Link to="/menu">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse Menu
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground mt-1">{getTotalItems()} items in your cart</p>
            </div>
            <Button variant="outline" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-card rounded-2xl p-4 shadow-md flex gap-4 animate-fade-in hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-primary font-medium uppercase tracking-wide">{item.category}</span>
                      <h3 className="text-lg font-bold text-card-foreground">{item.name}</h3>
                      <p className="text-accent font-bold text-lg">₹{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-foreground w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-background"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-xl font-bold text-card-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>₹{getTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-primary font-medium">FREE</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-xl font-bold text-card-foreground">
                      <span>Total</span>
                      <span className="text-accent">₹{getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg font-semibold">
                   Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/menu" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
