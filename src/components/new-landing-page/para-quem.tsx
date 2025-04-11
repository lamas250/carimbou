import React from "react";
import {
  Coffee,
  Scissors,
  Shirt,
  Paintbrush,
  Pizza,
  IceCream,
  ScissorsIcon,
  ChefHat,
  Dog,
  IceCreamBowl,
} from "lucide-react";

const BusinessTypes = () => {
  return (
    <section className="py-16 mx-auto max-w-7xl w-full flex flex-col items-center px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Para quem é o Carimbou?</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            O Carimbou é ideal para pequenos e médios negócios que desejam fidelizar seus clientes e
            aumentar o retorno deles ao estabelecimento.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <Coffee size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Cafés e Lanchonetes</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <Scissors size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Barbearias</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <Shirt size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Lojas de Roupa</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <ScissorsIcon size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Salões de Beleza</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <ChefHat size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Restaurantes</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <IceCream size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Sorveteria</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <Dog size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Pet Shop</h3>
          </div>

          <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:bg-gray-100 transition-colors border-1 border-primary">
            <IceCreamBowl size={40} className="text-primary mb-3" />
            <h3 className="font-medium">Açaiterias</h3>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            E <span className="font-bold">muitos outros tipos de negócios</span> locais que precisam
            de um programa de fidelidade eficiente!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessTypes;
