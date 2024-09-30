import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { name, price, image, discount, company } = product;
        const discountedValue = price - (price * discount) / 100;
        const productId = product.id;

        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4 ">
                  <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      {discount}% Desconto
                    </span>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <div>
                      <h5 className="text-xl tracking-tight">
                        {company} - {name}
                      </h5>
                    </div>
                    <div className="mt-2  flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold">
                          {formatCurrency(discountedValue)}
                        </span>
                        <span className="text-sm line-through">
                          {formatCurrency(price)}
                        </span>
                      </p>
                      <div className="flex items-center">
                        <p>
                          <span className="mr-2 ml-3 rounded bg-rose-500 px-2.5 py-0.5 text-xs font-semibold">
                            5.0
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-9 right-9 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsGrid;
