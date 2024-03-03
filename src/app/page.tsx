import FooterPageRender from "@/components/FooterPageRender";
import HeroPageRender from "@/components/HeroPageRender";
import ProductsHomeRenderPage from "@/components/products/ProductsHomeRenderPage";

export default function HomePage() {
  return (
    <div>
      <HeroPageRender />
      <ProductsHomeRenderPage />
      <FooterPageRender />
    </div>
  );
}
