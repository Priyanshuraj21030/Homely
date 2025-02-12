// Simulated API that returns random values
export const fetchRandomValues = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate random values that are intentionally not linked
  // to demonstrate the API values are independent
  return {
    quantity: Math.floor(Math.random() * 10) + 1,
    price: Math.floor(Math.random() * 1000) + 1,
    total: Math.floor(Math.random() * 1000) + 1, // Intentionally not Q*P to show independence
    profit: (Math.floor(Math.random() * 2000) + 1).toString() // High random profit percentage
  };
};