// "use client";

export const PriceUpdater = ({ price }) => {
  return (
    <span
      id="buyRate"
      className="font-semibold text-lg bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
    >
      {price + 2}
    </span>
  );
};
