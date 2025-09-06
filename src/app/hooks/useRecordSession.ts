import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RecordType } from "../components/Table";
import { Session, usePlayerStore } from "../config/useCommonZustandState";
import { UseRequest } from "../config/useAxiosClient";

export const useRecordSession = (sessionId?: string) => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sessions, setSessions] = useState<RecordType[]>([]);
  const { setPlayers } = usePlayerStore();

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await UseRequest<RecordType[]>("get", `/`);
        setSessions(response);
      } catch (error) {
        console.error("Error fetching sessions:", { error });
      }
    }
    fetchSessions();
  }, []);

  // 🟢 Create new game session
  const handlePlayersSubmit = async (playerOne: string, playerTwo: string) => {
    try {
      const payload = {
        playerOne,
        playerTwo,
      };
      const response = await UseRequest<Session>("post", `/post`, payload);
      setPlayers(playerOne, playerTwo);
      setIsPopupOpen(false);

      router.push(`/pages/${response._id}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return {
    isPopupOpen,
    setIsPopupOpen,
    sessions,
    handlePlayersSubmit,
  };
};
