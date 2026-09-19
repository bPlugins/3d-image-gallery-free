import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Download, Share2 } from "lucide-react";
import { __ } from "@wordpress/i18n";
import Watermark from "./Watermark";

export const Modal = ({
  isOpen,
  onClose,
  currentImage,
  currentIndex = 0,
  totalImages = 0,
  showCounter = true,
  showFullscreen = true,
  showDownload = true,
  showShare = true,
  onPrev,
  onNext,
  watermark = null,
}) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  };

  const handleDownload = (url, title) => {
    if (!url) return;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = blobUrl;
        const ext = url.split(".").pop().split(/[#?]/)[0] || "jpg";
        a.download = `${title ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase() : "image"}.${ext}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      })
      .catch(() => {
        const a = document.createElement("a");
        a.href = url;
        a.download = title || "image";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  };

  const handleShare = (url, title) => {
    if (!url) return;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      navigator.share({
        title: title || document.title,
        url,
      }).catch(() => {
        setToastMessage(__("Link copied to clipboard!", "image-gallery"));
        setTimeout(() => setToastMessage(null), 2500);
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
      });
      return;
    }

    setToastMessage(__("Link copied to clipboard!", "image-gallery"));
    setTimeout(() => setToastMessage(null), 2500);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      });
    } else {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Move focus into the dialog on open, and back to whatever opened it once
  // it closes -- without this a keyboard user's focus is silently dropped
  // onto the page body in both directions.
  useEffect(() => {
    if (isOpen) {
      lastTriggerRef.current = document.activeElement;
      closeBtnRef.current?.focus();
    } else {
      lastTriggerRef.current?.focus?.();
    }
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed modal-container inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={currentImage?.title || __("Image viewer", "image-gallery")}
    >
      <div
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative max-w-5xl w-full max-h-screen overflow-hidden p-4 flex flex-col modal">
        {showCounter && totalImages > 0 && (
          <div
            className="polaroid-modal-counter"
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 20,
              padding: "4px 12px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: "600",
              borderRadius: "9999px",
              letterSpacing: "0.5px",
              backdropFilter: "blur(4px)",
            }}
          >
            {currentIndex + 1} / {totalImages}
          </div>
        )}
        <div
          className="absolute top-4 right-4 z-10 flex items-center"
          style={{ display: "flex", alignItems: "center", gap: "8px", top: "1rem", right: "1rem", zIndex: 20 }}
        >
          {showShare && (
            <button
              onClick={() => handleShare(typeof currentImage === "string" ? currentImage : currentImage?.url, currentImage?.title)}
              aria-label={__("Share image link", "image-gallery")}
              className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
              <Share2 size={24} />
            </button>
          )}
          {showDownload && (
            <button
              onClick={() => handleDownload(typeof currentImage === "string" ? currentImage : currentImage?.url, currentImage?.title)}
              aria-label={__("Download image", "image-gallery")}
              className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
              <Download size={24} />
            </button>
          )}
          {showFullscreen && (
            <button
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen
                  ? __("Exit full screen", "image-gallery")
                  : __("Full screen", "image-gallery")
              }
              className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
              {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
          )}
          <button
            ref={closeBtnRef}
            onClick={handleClose}
            aria-label={__("Close", "image-gallery")}
            className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
            <X size={24} />
          </button>
        </div>
        {toastMessage && (
          <div
            className="modalToast"
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              zIndex: 50,
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              pointerEvents: "none",
            }}
          >
            {toastMessage}
          </div>
        )}

        <div className="flex items-center justify-between w-full h-full">
          <button
            onClick={onPrev}
            aria-label={__("Previous image", "image-gallery")}
            className="p-2 bg-black bg-opacity-50 icon-white rounded-full hover:bg-opacity-75 transition-all duration-200">
            <ChevronLeft size={32} />
          </button>

          <div className="overflow-hidden flex-1 mx-4 h-full flex items-center justify-center" style={{ position: "relative" }}>
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              decoding="async"
              className="max-h-[80vh] object-contain transition-transform duration-300"
            />
            {watermark && <Watermark watermark={watermark} location="popup" />}
          </div>

          <button
            onClick={onNext}
            aria-label={__("Next image", "image-gallery")}
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
