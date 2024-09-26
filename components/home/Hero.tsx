import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-16">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          Mudando a maneira de comprar Perfumes
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Descubra Effloré, a marca de perfumes que une sofisticação e natureza.
          Cada fragrância é única, criada com ingredientes selecionados para
          destacar sua essência. Encante-se com aromas que refletem
          autenticidade e elegância.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Nossos Produtos</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
