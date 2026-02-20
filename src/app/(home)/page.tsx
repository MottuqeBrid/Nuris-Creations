import Carousel from "@/_components/Carousel/Carousel";
import HomeMarquee from "@/_components/HomeMarquee/HomeMarquee";
import HomeProducts from "@/_components/HomeProducts/HomeProducts";
import HomeSubmenu from "@/_components/HomeSubmenu/HomeSubmenu";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <Carousel />
      <HomeSubmenu />
      <HomeMarquee />
      <HomeProducts text="Best Sellers" badge="Best Seller" />
      <HomeProducts text="Featured Products" Featured={true} />
      <HomeProducts text="New Arrivals" badge="New" />
      <HomeProducts text="Limited Edition" badge="Limited" />
      <HomeProducts text="Sale Items" badge="Sale" />
    </div>
  );
}
