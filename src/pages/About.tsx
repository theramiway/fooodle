import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Clock, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-4xl">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-foreground">About Fooodle</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bringing delicious food quickly to you
            </p>
          </div>

          {/* Story Card - Styled like Checkout container */}
          <div className="
            bg-primary 
            text-primary-foreground 
            rounded-2xl 
            shadow-2xl 
            p-8 
            mb-8
          ">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="opacity-90 mb-4 leading-relaxed">
              Fooodle was born from a simple idea: everyone deserves access to delicious, 
              high-quality food services right to their footstep. We started in a small kitchen 
              with a passion for creating memorable meals.
            </p>
            <p className="opacity-90 leading-relaxed">
              Today, we aim to serve thousands of happy customers daily, maintaining the same 
              commitment to quality and taste that we started with.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-card text-card-foreground rounded-2xl p-6 text-center shadow-lg border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Made with Love</h3>
              <p className="text-muted-foreground text-sm">
                Every dish is prepared with care and attention to detail
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card text-card-foreground rounded-2xl p-6 text-center shadow-lg border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Service</h3>
              <p className="text-muted-foreground text-sm">
                Hot, fresh food that you can order and pick up in minutes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card text-card-foreground rounded-2xl p-6 text-center shadow-lg border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-muted-foreground text-sm">
                Only the finest ingredients make it to your plate
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;