import Carousel from "@/components/Carousel/Carousel";
import FrockSection from "@/components/FrockSection/FrockSection.";
import HomeMarquee from "@/components/HomeMarquee/HomeMarquee";
import HomeSubmenu from "@/components/HomeSubmenu/HomeSubmenu";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Carousel />
      <HomeSubmenu />
      <HomeMarquee />
      <FrockSection
        title="Featured Products"
        description="Discover our handpicked collection of customizable products. Each item is carefully crafted to bring your creative ideas to life."
      />
      <FrockSection
        title="New Arrivals"
        description="Explore the latest additions to our collection, featuring unique designs and high-quality craftsmanship."
      />
      <p>
        Nuri&apos;s Creations is a small business that specializes in creating
        unique and personalized gifts for all occasions.
      </p>
    </div>
  );
}
