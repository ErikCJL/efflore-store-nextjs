"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start invisible and a bit lower
        animate={{ opacity: 1, y: 0 }} // End in normal position with full opacity
        transition={{ duration: 1, delay: 0.5 }} // 1-second delay, 1-second duration
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start small and invisible
        animate={{ opacity: 1, scale: 1 }} // Scale up to normal size with full opacity
        transition={{ duration: 1, delay: 1.0 }} // 1.5-second delay, 1-second duration
      >
        <HeroCarousel />
      </motion.div>
    </section>
  );
}

export default Hero;
