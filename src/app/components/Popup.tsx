"use client";
import PlayerForm from "@/app/components/form/PlayerForm";

interface Props {
  title?: string;
  showCloseButton?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmitPlayers: (playerOne: string, playerTwo: string) => void;
}

const Popup = ({
  title = "Create a player",
  showCloseButton = true,
  isOpen,
  onClose,
  onSubmitPlayers,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="shadow-lg max-w-sm w-full p-6 relative bg-black rounded-lg border-2 border-indigo-500 shadow-lg shadow-indigo-800/50">
        {showCloseButton && (
          <button
            className="absolute top-2 right-2 text-white hover:text-indigo-500 font-bold text-2xl animate-bounce hover:animate-none"
            onClick={onClose}
          >
            ✕
          </button>
        )}

        <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>

        <PlayerForm
          onSubmit={(playerOne, playerTwo) => {
            onSubmitPlayers(playerOne, playerTwo);
            // onClose();
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
