import React, { useState, useEffect, useRef, useCallback } from "react";

const useInterval = (callback, time, delay) => {
  const intervalRef = useRef();

  const stop = useCallback(() => clearInterval(intervalRef.current), []);

  const start = useCallback((delay) => {
    const _start = () => {
      intervalRef.current = setInterval(callback, time);
    };

    stop();

    if (+delay > 0) {
      setTimeout(_start, delay);
    } else {
      _start();
    }
  }, []);

  useEffect(() => {
    start(delay);
    return stop;
  }, []);

  return { intervalRef, start, stop };
};

const GalleryImages = ({
  images,
  imgIndex = 0,
  wrapper,
  container,
  loadCount,
}) => (
  <div className="galleryImages" ref={container}>
    {images?.length > 0 &&
      images.map((image, i) => (
        <img
          key={i}
          className={imgIndex === i ? "imageVisible" : ""}
          src={image}
          onLoad={() => {
            loadCount.current++;
            if (loadCount.current === images.length) {
              container.current?.classList.add("galleryImagesLoaded");
              wrapper.current
                ?.querySelector(".galleryLoader")
                ?.classList.remove("visible");
            }
          }}
        />
      ))}
  </div>
);

const GalleryLoader = () => (
  <span className="galleryLoader visible">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="bar"></span>
    ))}
  </span>
);

const GalleryHeader = ({ title, subtitle, onClick }) => (
  <header className="galleryHeader">
    <div className="galleryHeadings">
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </div>
    {onClick && (
      <button className="btnClose" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    )}
  </header>
);

const Gallery = ({
  gallery,
  slideSpeed,
  columns,
  isPopup = true,
  editActiveIndex = null,
  setEditActiveIndex = null,
}) => {
  const popupGallery = useRef(null);
  const popupGalleryItem = useRef(null);
  const popupImgContainer = useRef();
  const popupImgLoadCount = useRef(0);
  // const popupTargetOffset = useRef([0, 0]);
  const activeItemImgLength = useRef(0);

  const [activeIndex, setActiveIndex] = useState(null);
  const [popupImgIndex, setPopupImgIndex] = useState(0);

  const popupItem = gallery[activeIndex];
  activeItemImgLength.current = popupItem?.images?.length || 0;

  const galleryImgIndexes = useRef(gallery.map(() => 0));
  const galleryImgContainerRefs = useRef(gallery.map(() => React.createRef()));
  const galleryItemRefs = useRef(gallery.map(() => React.createRef()));
  const galleryImgLoadCountRefs = useRef(gallery.map(() => ({ current: 0 })));

 
  useEffect(() => {
    const intervals = [];

    gallery.forEach((item, index) => {
      if (!item?.images || item.images.length <= 1) return;

      intervals[index] = setInterval(
        () => {
          galleryImgIndexes.current[index]++;
          if (galleryImgIndexes.current[index] >= item.images.length) {
            galleryImgIndexes.current[index] = 0;
          }

          const container = galleryImgContainerRefs.current[index]?.current;
          if (container) {
            container.childNodes.forEach((el, i) => {
              el.classList.toggle(
                "imageVisible",
                i === galleryImgIndexes.current[index]
              );
            });
          }
        },
        slideSpeed * 1000 + index * 200
      );
    });

    return () => intervals.forEach(clearInterval);
  }, [gallery, slideSpeed]);

  const { start: startPopupInterval } = useInterval(
    () => {
      setPopupImgIndex((currentIndex) =>
        currentIndex >= activeItemImgLength.current - 1 ? 0 : currentIndex + 1
      );
    },
    slideSpeed * 1000,
    0
  );

  const selectImgIndex = useCallback(
    (popupInterval, newIndex, reset = false) => {
      reset && popupInterval();
      setPopupImgIndex(newIndex);
    },
    []
  );

  const onClickGalleryItem = useCallback((index) => {
    setActiveIndex(index);
    setEditActiveIndex && setEditActiveIndex(index);
    isPopup && popupGallery.current?.classList.add("active");
  }, []);

  const onClickClose = useCallback(() => {
    setTimeout(() => {
      setActiveIndex(null);
    }, 750);
    popupGallery.current?.classList.remove("active");
    popupImgLoadCount.current = 0;
  }, []);

  return (
    <>
      <div
        className={`galleryItems columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}
      >
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`galleryItem ${
              editActiveIndex !== null && index === editActiveIndex
                ? "bPlNowEditing"
                : ""
            }`}
            id={`galleryItem-${index}`}
            onClick={() => onClickGalleryItem(index)}
            ref={galleryItemRefs.current[index]}
          >
            <GalleryImages
              images={item?.images || []}
              wrapper={galleryItemRefs.current[index]}
              container={galleryImgContainerRefs.current[index]}
              loadCount={galleryImgLoadCountRefs.current[index]}
            />
            <GalleryLoader />
            <GalleryHeader
              title={item?.title || ""}
              subtitle={item?.subtitle || ""}
            />
          </div>
        ))}
      </div>
      {isPopup && popupItem && (
        <div className="popupGallery" ref={popupGallery}>
          <div className="popupContent">
            <div
              className={`galleryItem ${
                editActiveIndex !== null && activeIndex === editActiveIndex
                  ? "nowEditing"
                  : ""
              }`}
              id={`galleryItem-${activeIndex}`}
              ref={popupGalleryItem}
            >
              <GalleryImages
                images={popupItem?.images || []} 
                imgIndex={popupImgIndex}
                wrapper={popupGalleryItem}
                container={popupImgContainer}
                loadCount={popupImgLoadCount}
              />
              <GalleryLoader />
              <GalleryHeader
                title={popupItem?.title || ""}
                subtitle={popupItem?.subtitle || ""}
                onClick={onClickClose}
              />
              {(popupItem?.images?.length || 0) > 1 && (
                <footer className="galleryFooter">
                  <nav className="controls">
                    <button
                      className="control controlArrow"
                      onClick={() =>
                        selectImgIndex(
                          startPopupInterval,
                          popupImgIndex - 1,
                          true
                        )
                      }
                    >
                      &#8592;
                    </button>
                    {popupItem.images.map((_, i) => (
                      <button
                        key={i}
                        className={`control controlDot ${
                          i === popupImgIndex ? "controlDotActive" : ""
                        }`}
                        onClick={() => selectImgIndex(startPopupInterval, i)}
                      ></button>
                    ))}
                    <button
                      className="control controlArrow"
                      onClick={() =>
                        selectImgIndex(
                          startPopupInterval,
                          popupImgIndex + 1,
                          true
                        )
                      }
                    >
                      &#8594;
                    </button>
                  </nav>
                </footer>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
