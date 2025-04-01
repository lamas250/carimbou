// "use client";

// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     content:
//       "O Carimbou transformou completamente nosso programa de fidelidade. Nossos clientes adoram a facilidade de uso e nós economizamos tempo e dinheiro com a gestão digital.",
//     author: "Ana Silva",
//     role: "Proprietária, Café Aroma",
//     rating: 5,
//   },
//   {
//     id: 2,
//     content:
//       "Desde que implementamos o Carimbou, vimos um aumento de 30% na taxa de retorno dos clientes. A plataforma é intuitiva e o suporte ao cliente é excepcional.",
//     author: "Carlos Mendes",
//     role: "Gerente, Restaurante Sabor & Arte",
//     rating: 5,
//   },
//   {
//     id: 3,
//     content: "O cliente disse: &quot;A experiência foi incrível!&quot;",
//     author: "Mariana Costa",
//     role: "Proprietária, Boutique Elegance",
//     rating: 4,
//   },
// ];

// export function Testimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const ref = useRef(null);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
//   };

//   return (
//     <section id="depoimentos" className="bg-gray-50 py-16 md:py-24">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="mx-auto max-w-3xl text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
//             O que nossos clientes dizem
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Descubra como o Carimbou está ajudando empresas a transformar seus programas de
//             fidelidade
//           </p>
//         </div>

//         <div className="relative mx-auto mt-16 max-w-4xl">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.5 }}
//               className="rounded-xl bg-white p-8 shadow-lg md:p-10"
//             >
//               <div className="mb-4 flex">
//                 {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
//                   <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <blockquote className="mb-6 text-xl font-medium text-gray-900 md:text-2xl">
//                 "{testimonials[currentIndex].content}"
//               </blockquote>
//               <div className="flex items-center">
//                 <div className="h-12 w-12 rounded-full bg-red-100"></div>
//                 <div className="ml-4">
//                   <p className="font-medium text-gray-900">{testimonials[currentIndex].author}</p>
//                   <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <div className="mt-8 flex justify-center space-x-4">
//             <button
//               onClick={handlePrev}
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100"
//               aria-label="Depoimento anterior"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <button
//               onClick={handleNext}
//               className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100"
//               aria-label="Próximo depoimento"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
