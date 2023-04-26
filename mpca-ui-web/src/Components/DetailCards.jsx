import React from "react";
const WaterCard = ({ card }) => {
  return (
    <div className="m-2 p-4 bg-slate-800 rounded-lg text-white">
      <p>{card?.information}</p>
      <p>{card?.id}</p>
      <p
        className={`${
          card?.waterLevel < 50 ? "text-rose-600" : "text-violet-300"
        } text-[22px]`}
      >
        {card?.waterLevel}
      </p>
      <p>{card?.time}</p>
    </div>
  );
};
const TempCard = ({ card }) => {
  return (
    <div className="m-2 p-4 bg-slate-800 rounded-lg text-white">
      <p>{card?.information}</p>
      <p>{card?.id}</p>
      <p
        className={`${
          card?.temperature > 32 ? "text-rose-600" : "text-violet-300"
        } text-[22px]`}
      >
        {card?.temperature}
      </p>

      <p>{card?.time}</p>
    </div>
  );
};
const SmokeCard = ({ card }) => {
  return (
    <div className="m-2 p-4 bg-slate-800 rounded-lg text-white">
      <p>{card?.information}</p>
      <p>{card?.id}</p>
      <p
        className={`${
          card?.smokeValue > 390 ? "text-rose-600" : "text-violet-300"
        } text-[22px]`}
      >
        {card?.smokeValue}
      </p>
      <p>{card?.time}</p>
    </div>
  );
};
const DetailCards = ({ type, details }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center w-[100vw] bg-gradient-to-r from-violet-500  to-fuchsia-500 relative left-[-30px]">
      {type === "Gas Details" &&
        details.map((card, index) => <SmokeCard card={card} />)}
      {type === "Water Details" &&
        details.map((card, index) => <WaterCard card={card} />)}
      {type === "Temperature Details" &&
        details.map((card, index) => <TempCard card={card} />)}
    </div>
  );
};

export default DetailCards;
