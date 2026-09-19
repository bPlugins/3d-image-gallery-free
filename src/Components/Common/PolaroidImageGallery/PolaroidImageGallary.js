import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { Modal } from "../Modal";
import Watermark from "../Watermark";

const PolaroidImageGallary = ({ attributes, activeAlbum = "*" }) => {
  const { 
    imagesData, 
    styleSl, 
    watermark = {},
    disableRightClick = false,
    enableLightbox = true,
    showLightboxCounter = true,
    showLightboxFullscreen = true,
    showLightboxDownload = true,
    showLightboxShare = true,
    enableLoadMore = false,
    imagesPerLoad = 10,
    loadMoreBtnText = "Load More",
    loadMoreBtnColors,
    loadMoreBtnTypo,
  } = attributes;
  const rawImages = imagesData?.images || [];
  const images =
    activeAlbum && activeAlbum !== "*"
      ? rawImages.filter(
          (img) => Array.isArray(img?.albs) && img.albs.includes(activeAlbum)
        )
      : rawImages;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(enableLoadMore ? imagesPerLoad : rawImages.length);

  useEffect(() => {
    if (enableLoadMore) {
      setVisibleCount(imagesPerLoad);
    }
  }, [enableLoadMore, imagesPerLoad, activeAlbum]);

  const displayedImages = enableLoadMore ? images.slice(0, visibleCount) : images;

  const openModal = (index) => {
    const item = displayedImages[index];
    if (item?.link) {
      window.location.href = item.link;
      return;
    }
    if (!enableLightbox) return;
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // A tilt between -5 and 5 degrees, fixed per frame. Drawing it randomly at
  // render time meant every re-render reshuffled every angle on the wall.
  const getRotation = (index) => (((index * 7) % 11) - 5);

  return (
    <div className={`bigbImageGallery ${styleSl}`}>
      <div 
        className="my-8 polaroid-gallery"
        onContextMenu={(e) => disableRightClick && e.preventDefault()}
      >
        <div className="gap-8 justify-center polaroid-wrapper">
          {displayedImages?.map((image, index) => {
            const rotation = getRotation(index);
            return (
              <div
                key={image?.id}
                className="w-72 polaroid-container bg-white border-8 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
                onClick={() => openModal(index)}
                role="button"
                tabIndex={0}
                aria-label={image?.title || __("Open image", "image-gallery")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(index);
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg) scale(1.05)";
                  e.currentTarget.style.zIndex = "10";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                  e.currentTarget.style.zIndex = "0";
                }}>
                <div className="polaroid-image overflow-hidden" style={{ position: "relative" }}>
                  <img
                    src={image?.url}
                    alt={image?.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {watermark && <Watermark watermark={watermark} location="gallery" />}
                </div>
                <div className="p-4 text-content bg-white">
                  <h3 className="title font-medium text-gray-900">
                    {image?.title}
                  </h3>
                  {image?.description && (
                    <p className="description text-sm text-gray-600 mt-1">
                      {image.description}
                    </p>
                  )}
                  {imagesData?.showDate && (
                    <p className="date text-xs text-gray-400 mt-2 font-mono">
                      {image.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {enableLoadMore && visibleCount < images.length && (
          <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
            <button 
              className="bPlButton"
              style={{ 
                padding: "10px 24px", 
                cursor: "pointer", 
                background: loadMoreBtnColors?.bgType === "gradient" ? loadMoreBtnColors?.gradient : (loadMoreBtnColors?.bg || "#146ef5"), 
                color: loadMoreBtnColors?.color || "#fff", 
                border: "none", 
                borderRadius: `${loadMoreBtnTypo?.borderRadius !== undefined ? loadMoreBtnTypo.borderRadius : 4}px`,
                fontSize: `${loadMoreBtnTypo?.fontSize !== undefined ? loadMoreBtnTypo.fontSize : 16}px`
              }}
              onClick={() => setVisibleCount((prev) => prev + imagesPerLoad)}
            >
              {loadMoreBtnText}
            </button>
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentImage={images[currentImageIndex]}
          currentIndex={currentImageIndex}
          totalImages={images.length}
          showCounter={showLightboxCounter}
          showFullscreen={showLightboxFullscreen}
          showDownload={showLightboxDownload}
          showShare={showLightboxShare}
          images={images}
          onNext={goToNext}
          onPrev={goToPrevious}
          watermark={watermark}
        />
      </div>
    </div>
  );
};

export default PolaroidImageGallary;
