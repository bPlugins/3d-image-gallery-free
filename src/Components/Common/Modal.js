import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const Modal = ({ isOpen, onClose, currentImage, onPrev, onNext }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed modal-container inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative max-w-5xl w-full max-h-screen overflow-hidden p-4 flex flex-col modal">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
          <X size={24} />
        </button>

        <div className="flex items-center justify-between w-full h-full">
          <button
            onClick={onPrev}
            className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
            <ChevronLeft size={32} />
          </button>

          <div className="overflow-hidden flex-1 mx-4 h-full flex items-center justify-center">
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="max-h-[80vh] object-contain transition-transform duration-300"
            />
          </div>

          <button
            onClick={onNext}
            className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="text-white text-center text-content pt-4">
          <h3 className="text-xl font-medium text-white title truncate">
            {currentImage?.title}
          </h3>
          {currentImage?.description && (
            <p className="text-gray-300 mt-1 text-sm description">
              {currentImage?.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
