const list = [
  {
    title: "800*1200 (європалета з маркуванням EUR, UIC, EPAL)",
    prices: ["180-220", "140-170", "90-120"],
  },
  {
    title: "800*1200 (звичайний без маркування)",
    prices: ["60-150", "50-120", "30-100"],
  },
  {
    title: "1000*1200",
    prices: ["60-100", "50-90", "20-60"],
  },
  {
    title: "1100*1300",
    prices: ["40-80", "40-80", "30-70"],
  },
  {
    title: "1200*1200",
    prices: ["60-100", "50-90", "20-60"],
  },
  {
    title: "1000*1000",
    prices: ["50-80", "50-80", "40-70"],
  },
  {
    title: "Мікс кількох типів",
    prices: ["50-170", "40-140", "30-110"],
  },
];

const buyoutReturnPrice = (size, state) => {
  const result = list[size].prices[state];
  return result;
};

export default buyoutReturnPrice;
