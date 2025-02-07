const PlayerCard: React.FC = () => {
  return (
    <div className="h-80 flex justify-between items-center border border-violet-500 rounded">
      <div> LOGO</div>
      <div>
        <button className="p-4 border border-violet-800">login</button>
        <button className="p-4 border border-violet-800">register</button>
      </div>
    </div>
  );
};

export default PlayerCard;
