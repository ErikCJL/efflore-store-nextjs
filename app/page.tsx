import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import LoadingContainer from "@/components/global/LoadingContainer";
import { Suspense } from "react";
import QuizComponent from "@/components/quiz/QuizComponent";
import Footer from "@/components/footer/Footer";
function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      <QuizComponent />
      <Footer />
    </>
  );
}
export default HomePage;
