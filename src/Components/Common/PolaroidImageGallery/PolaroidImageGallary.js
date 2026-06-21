import { useState } from "react";
import { Modal } from "../Modal";

const PolaroidImageGallary = ({ attributes }) => {
  const { imagesData, styleSl } = attributes;
  const { images } = imagesData || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
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

  // Generate a random rotation between -5 and 5 degrees
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  return (
    <div className={`bigbImageGallery ${styleSl}`}>
      <div className="my-8 polaroid-gallery">
        <div className="gap-8 justify-center polaroid-wrapper">
          {images?.map((image, index) => {
            const rotation = getRandomRotation();
            return (
              <div
                key={image?.id}
                className="w-72 polaroid-container bg-white border-8 border-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
                onClick={() => openModal(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg) scale(1.05)";
                  e.currentTarget.style.zIndex = "10";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rotation}deg)`;
                  e.currentTarget.style.zIndex = "0";
                }}>
                <div className="polaroid-image overflow-hidden">
                  <img
                    src={image?.url}
                    alt={image?.title}
                    className="w-full h-full object-cover"
                  />
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
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentImage={images[currentImageIndex]}
          images={images}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      </div>
    </div>
  );
};

export default PolaroidImageGallary;
