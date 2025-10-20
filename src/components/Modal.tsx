// components/Modal.tsx
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  shortCode: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ shortCode, onClose }) => {
  // Close modal when user presses Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const copyToClipboard = async () => {
    if (!shortCode) return;

    const fullUrl = `http://localhost:8000/${shortCode}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Url Copied Successfully");
    } catch (err) {
      console.error("Fialed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl p-6 w-80 sm:w-96 text-center shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          🎉 Shortened URL Generated!
        </h2>

        <div className="bg-gray-100 text-sm p-2 rounded-md mb-4 break-all">
          {`http://localhost:8000/${shortCode}`}
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 px-4 rounded-md w-full"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default Modal;
