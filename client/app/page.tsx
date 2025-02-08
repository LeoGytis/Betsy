"use client";
import BetsList from "./components/BetsList";
import Betting from "./components/Betting";
import NavBar from "./components/NavBar";
import Transactions from "./components/Transactions";

// const queryClient = new QueryClient();

const HomePage: React.FC = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <BalanceProvider>
    <div className="mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12">
      <NavBar />
      <div className="w-full flex gap-8 mt-6">
        <div className="w-1/2 flex flex-col gap-2">
          <Betting />
          <Transactions />
        </div>
        <BetsList />
      </div>
    </div>
    //   </BalanceProvider>
    // </QueryClientProvider>
  );
};

export default HomePage;
