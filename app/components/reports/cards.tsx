// components/CardsSection.tsx
import { Button } from '@/registry/new-york/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';


const cards = [
  {
    imgSrc: "https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg",
    title: "Monthly Reports",
    description: "Get Hospital Monthly Reports Here",
    route: "/Reports/Monthly",
  },
  {
    imgSrc: "https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg",
    title: "Quarterly Reports",
    description: "Get Hospital Quarterly Reports Here",
    route: "/Reports/Quarterly",
  },
  {
    imgSrc: "https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg",
    title: "Annual Reports",
    description: "Get Hospital Annual Reports Here",
    route: "/Reports/Annual",
  },
];

const CardsSection: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <section className="pt-10 lg:pt-[120px] pb-10 lg:pb-20 bg-white container border border-blue-500 rounded-lg">
      <div className="flex flex-wrap -mx-4">
        {cards.map((card, index) => (
          <div key={index} className="w-full md:w-1/2 xl:w-1/3 px-4">
            <div className="bg-gray-100 overflow-hidden mb-10 border border-blue-200 rounded-lg">
              <img
                src={card.imgSrc}
                alt="image"
                className="w-full"
              />
              <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                <h3>
                  <a
                    href="#"
                    className="
                      font-semibold
                      text-dark text-xl
                      sm:text-[22px]
                      md:text-xl
                      lg:text-[22px]
                      xl:text-xl
                      2xl:text-[22px]
                      mb-4
                      block
                      hover:text-primary
                    "
                  >
                    {card.title}
                  </a>
                </h3>
                <p className="text-base text-body-color leading-relaxed mb-7">
                  {card.description}
                </p>
                <Button className="" onClick={() => handleNavigation(card.route)}>
                  Get Reports
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
