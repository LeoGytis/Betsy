"use client";
import NavBar from "./components/NavBar";
import PlayerCard from "./components/PlayerCard";

const HomePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-xl p-8 md:p-12 lg:p-20 lg:py-12">
      <NavBar />
      <div className="p-36 pt-8">
        <PlayerCard />
      </div>
    </div>
  );
};

export default HomePage;
