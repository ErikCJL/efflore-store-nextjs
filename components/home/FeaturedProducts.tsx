import { fetchFeaturedProducts } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();

  if (products.length === 0) return <></>;
  return (
    <section className="pt-24">
      <SectionTitle text="Destaques" />
      <ProductsGrid products={products} />
    </section>
  );
}
export default FeaturedProducts;
