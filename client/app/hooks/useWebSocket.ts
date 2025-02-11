import { useEffect, useState } from "react";

interface PlayerUpdate {
  type: "balance_update";
  id: string;
  balance: number;
}

const useWebSocket = (playerId: string | null): number | null => {
  console.log("🔥 :: playerId WS ::", playerId);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!playerId) return;

    const socket = new WebSocket("ws://localhost:3003");

    socket.onopen = () => {
      console.log("WebSocket Connected");
      socket.send(JSON.stringify({ type: "register_player", id: playerId }));
    };

    socket.onmessage = (event: MessageEvent) => {
      const data: PlayerUpdate = JSON.parse(event.data);
      if (data.type === "balance_update" && data.id === playerId) {
        setBalance(data.balance);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    // Cleanup the WebSocket connection when the component unmounts or playerId changes
    return () => {
      socket.close();
    };
  }, [playerId]);

  return balance;
};

export default useWebSocket;
