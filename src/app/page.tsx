"use client";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
import Record, { RecordType } from "./components/Table";
import Popup from "@/app/components/Popup";
import { useState, useEffect } from "react";
import { UseRequest } from "@/app/config/useAxiosClient";
import { usePlayerStore } from "./config/useCommonZustandState";
import { Session } from "./hooks/useGame";

export default function Page() {
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

  console.log("Fetched sessions:", { sessions });

  const handlePlayersSubmit = async (playerOne: string, playerTwo: string) => {
    try {
      const payload = {
        playerOne,
        playerTwo,
      };
      const response = await UseRequest<Session>("post", `/post`, payload);
      setPlayers(playerOne, playerTwo);
      setIsPopupOpen(false);

      console.log("✅ Players chosen:", playerOne, playerTwo);

      router.push(`/pages/${response._id}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6">
        <Record record={sessions} />
        <div className="border-none w-full items-center justify-center flex text-3xl">
          <Button
            value={"Start New Game"}
            className="animate-bounce bg-indigo-600 text-[2rem] w-auto px-6 py-3 rounded-2xl hover:bg-indigo-800 shadow-xl/50"
            onClick={() => setIsPopupOpen(true)}
          />
        </div>

        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
            Power by Next.js + Tailwind + TypeScript + custom hook + Espress.js
            + Node.js ❤️
          </div>
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmitPlayers={handlePlayersSubmit}
        />
      </div>
    </main>
  );
}
