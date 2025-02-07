"use client";
import Betting from "./components/Betting";
import NavBar from "./components/NavBar";

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12">
      <NavBar />
      <div className="p-36 pt-8">
        <Betting />
      </div>
    </div>
  );
};

export default HomePage;
