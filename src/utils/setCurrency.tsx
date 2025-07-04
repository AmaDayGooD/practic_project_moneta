const setCurrency: (currency: string) => string = (currency) => {
  const currencies: Record<string, string> = {
    RUB: "₽",
    USD: "$",
    EUR: "€",
  };
  return currencies[currency] || "";
};

export default setCurrency;