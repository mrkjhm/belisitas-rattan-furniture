import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CategoryHighlights } from "@/components/sections/CategoryHighlights";
import { CallToAction } from "@/components/sections/CallToAction";

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryHighlights />
      <CallToAction />
    </>
  );
};

export default Index;
