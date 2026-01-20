import Navbar from "@/components/Navbar";
import SpecialOffers from "@/components/SpecialOffers";
import HotAndFresh from "@/components/HotAndFresh";
import Footer from "@/components/Footer";

const SpecialOffersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Special Offers Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                Special Offers
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Limited time deals you won't want to miss! Save big on your favorite dishes today.
              </p>
            </div>
            <SpecialOffers />
          </section>

          {/* Hot & Fresh Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
                Hot & Fresh
              </h2>
              <p className="text-xl text-gray-600 max-w-xl mx-auto">
                Ready to serve! These items are being prepared fresh right now.
              </p>
            </div>
            <HotAndFresh />
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialOffersPage;
