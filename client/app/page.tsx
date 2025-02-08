"use client";
import BetsList from "./components/BetsList";
import Betting from "./components/Betting";
import NavBar from "./components/NavBar";

// const queryClient = new QueryClient();

const HomePage: React.FC = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <BalanceProvider>
    <div className="mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12">
      <NavBar />
      <div className="w-full flex gap-8 mt-6">
        <Betting />
        <BetsList />
      </div>
    </div>
    //   </BalanceProvider>
    // </QueryClientProvider>
  );
};

export default HomePage;
