"use client";
import { useState, useCallback, useEffect } from "react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import quizData from "../../utils/quizData"; // Your quiz questions
import { fetchAllProducts } from "../../utils/actions"; // Importing fetchAllProducts

type Product = {
  id: string;
  name: string;
  note: string;
  intensity: string;
  preference: string;
  gender: string;
  style: string;
  season: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  company: string;
};

const PerfumeQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [preferenciasUsuario, setPreferenciasUsuario] = useState<string[]>([]);
  const [perfumes, setPerfumes] = useState<Product[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetchAllProducts({ search: "" });
      setPerfumes(products);
    };
    fetchProducts();
  }, []);

  // Function to find the most similar perfume based on user preferences
  const encontrarPerfumeMaisSimilar = useCallback((): Product | null => {
    let mostSimilarPerfume: Product | null = null;
    let maxSimilarities = -1;

    perfumes.forEach((perfume) => {
      let similarities = 0;

      if (preferenciasUsuario.includes(perfume.note)) similarities++;
      if (preferenciasUsuario.includes(perfume.intensity)) similarities++;
      if (preferenciasUsuario.includes(perfume.preference)) similarities++;
      if (preferenciasUsuario.includes(perfume.style)) similarities++;
      if (preferenciasUsuario.includes(perfume.season)) similarities++;
      if (preferenciasUsuario.includes(perfume.duration)) similarities++;
      if (preferenciasUsuario.includes(perfume.gender)) similarities++;

      if (similarities > maxSimilarities) {
        maxSimilarities = similarities;
        mostSimilarPerfume = perfume;
      }
    });

    return mostSimilarPerfume;
  }, [preferenciasUsuario, perfumes]);

  // When user finishes the quiz, find the most similar perfume and redirect
  useEffect(() => {
    setPreferenciasUsuario(answers);

    if (answers.length === quizData.length) {
      const perfume = encontrarPerfumeMaisSimilar();

      // Ensure the perfume is not null before redirecting
      if (perfume && perfume.id) {
        redirect(`/products/${perfume.id}`);
      } else {
        console.log("No matching perfume found.");
      }
    }
  }, [answers, encontrarPerfumeMaisSimilar]);

  // Handle user response
  const handleResposta = (resposta: string) => {
    setAnswers((prev) => [...prev, resposta]);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-12 p-4">
      <div className="text-center">
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl mb-12">
          Ainda na dúvida? Faça nosso Questionário!
        </h1>
      </div>
      <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
        <CardContent className="p-8 h-fit rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-purple-900 mb-6  text-center">
            {quizData[currentQuestion]?.pergunta}
          </h2>
          <div className="flex flex-col items-center gap-4">
            {quizData[currentQuestion]?.opcoes.map((opcao, idx) => (
              <Button
                key={idx}
                onClick={() => handleResposta(opcao)}
                className=" w-96"
              >
                {opcao}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerfumeQuiz;
