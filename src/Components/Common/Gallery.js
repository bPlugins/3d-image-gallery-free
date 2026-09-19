import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { __, sprintf } from "@wordpress/i18n";
import Watermark from "./Watermark";

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
  altText = "",
  eager = false,
  watermark = null,
  location = "gallery",
}) => (
  <div
    className="galleryImages"
    ref={container}
    style={{ position: "relative" }}>
    {images?.length > 0 &&
      images.map((image, i) => (
        <img
          key={i}
          className={imgIndex === i ? "imageVisible" : ""}
          src={image}
          alt={images.length > 1 ? `${altText} ${i + 1}`.trim() : altText}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
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
    {watermark && <Watermark watermark={watermark} location={location} />}
  </div>
);

const GalleryLoader = () => (
  <span className="galleryLoader visible">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="bar"></span>
    ))}
  </span>
);

const GalleryHeader = ({
  title,

  subtitle,
  onClick,
  counter,
  onFullscreen,
  isFullscreen,
  onDownload,
  onShare,
}) => (
  <header className="galleryHeader">
    <div className="galleryHeadings">
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </div>
    {counter && (
      <span
        className="galleryLightboxCounter"
        style={{
          margin: "0 12px 0 auto",
          fontSize: "13px",
          fontWeight: "600",
          padding: "4px 12px",
          borderRadius: "9999px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "#ffffff",
          letterSpacing: "0.5px",
          backdropFilter: "blur(4px)",
          alignSelf: "center",
          flexShrink: 0,
        }}>
        {counter}
      </span>
    )}
    <div
      className="galleryHeaderActions"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        marginLeft: counter ? "0" : "auto",
        flexShrink: 0,
        position: "relative",
        zIndex: 5,
      }}>
      {onShare && (
        <button
          className="btnShare"
          onClick={onShare}
          aria-label={__("Share image link", "image-gallery")}
          style={{
            width: "24px",
            height: "24px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
            alignSelf: "center",
            flexShrink: 0,
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      )}
      {onDownload && (
        <button
          className="btnDownload"
          onClick={onDownload}
          aria-label={__("Download image", "image-gallery")}
          style={{
            width: "24px",
            height: "24px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
            alignSelf: "center",
            flexShrink: 0,
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
        </button>
      )}
      {onFullscreen && (
        <button
          className="btnFullscreen"
          onClick={onFullscreen}
          aria-label={
            isFullscreen
              ? __("Exit full screen", "image-gallery")
              : __("Full screen", "image-gallery")
          }
          style={{
            width: "24px",
            height: "24px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
            alignSelf: "center",
            flexShrink: 0,
          }}>
          {isFullscreen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          )}
        </button>
      )}
      {onClick && (
        <button
          className="btnClose"
          onClick={onClick}
          aria-label={__("Close", "image-gallery")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      )}
    </div>
  </header>
);

const Gallery = ({
  gallery = [],
  slideSpeed,
  columns,
  isPopup = true,
  editActiveIndex = null,
  setEditActiveIndex = null,
  activeAlbum = "*",
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
}) => {
  const galleryGridRef = useRef(null);
  const prevRectsRef = useRef(new Map());
  const isFirstRenderRef = useRef(true);

  const visibleItems = useMemo(() => {
    return gallery
      .map((item, originalIndex) => ({ ...item, originalIndex }))
      .filter((item) => {
        if (!activeAlbum || activeAlbum === "*") return true;
        return Array.isArray(item?.albs) && item.albs.includes(activeAlbum);
      });
  }, [gallery, activeAlbum]);

  const [visibleCount, setVisibleCount] = useState(
    enableLoadMore ? imagesPerLoad : gallery.length,
  );

  useEffect(() => {
    if (enableLoadMore) {
      setVisibleCount(imagesPerLoad);
    }
  }, [enableLoadMore, imagesPerLoad, activeAlbum]); // Reset on album change too

  const displayedItems = enableLoadMore
    ? visibleItems.slice(0, visibleCount)
    : visibleItems;

  useLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const container = galleryGridRef.current;
    if (!container) return;

    const prevRects = prevRectsRef.current;
    const containerRect = container.getBoundingClientRect();
    const itemEls = container.querySelectorAll(".galleryItem[data-item-key]");

    if (prevRects && prevRects.size > 0) {
      itemEls.forEach((el, visualIndex) => {
        const key = el.dataset.itemKey;
        const prevData = prevRects.get(key);
        const newRect = el.getBoundingClientRect();

        if (prevData) {
          const dx = prevData.left - (newRect.left - containerRect.left);
          const dy = prevData.top - (newRect.top - containerRect.top);

          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            el.style.transition = "none";
            el.getBoundingClientRect();
            el.style.transition = "transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)";
            el.style.transform = "";
          }
        } else {
          const delay = visualIndex * 30;
          el.style.opacity = "0";
          el.style.transform = "scale(0.85)";
          el.style.transition = "none";
          el.getBoundingClientRect();
          el.style.transition = `transform 0.4s cubic-bezier(0.2, 0, 0.2, 1) ${delay}ms, opacity 0.4s ease ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
        }
      });
    }

    const nextRects = new Map();
    itemEls.forEach((el) => {
      const key = el.dataset.itemKey;
      nextRects.set(key, {
        left: el.getBoundingClientRect().left - containerRect.left,
        top: el.getBoundingClientRect().top - containerRect.top,
      });
    });
    prevRectsRef.current = nextRects;
  }, [activeAlbum, displayedItems]);
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

  const galleryImgIndexes = useRef([]);
  const galleryImgContainerRefs = useRef([]);
  const galleryItemRefs = useRef([]);
  const galleryImgLoadCountRefs = useRef([]);

  // Grow the per-item ref arrays to match `gallery` (items can be appended
  // -- e.g. bulk-adding from the Media Library -- after these refs were
  // first created). Existing entries are left untouched so mounted items
  // keep their refs; only missing slots are appended.
  while (galleryImgIndexes.current.length < gallery.length) {
    galleryImgIndexes.current.push(0);
  }
  while (galleryImgContainerRefs.current.length < gallery.length) {
    galleryImgContainerRefs.current.push(React.createRef());
  }
  while (galleryItemRefs.current.length < gallery.length) {
    galleryItemRefs.current.push(React.createRef());
  }
  while (galleryImgLoadCountRefs.current.length < gallery.length) {
    galleryImgLoadCountRefs.current.push({ current: 0 });
  }

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
                i === galleryImgIndexes.current[index],
              );
            });
          }
        },
        slideSpeed * 1000 + index * 200,
      );
    });

    return () => intervals.forEach(clearInterval);
  }, [gallery, slideSpeed]);

  const { start: startPopupInterval } = useInterval(
    () => {
      setPopupImgIndex((currentIndex) =>
        currentIndex >= activeItemImgLength.current - 1 ? 0 : currentIndex + 1,
      );
    },
    slideSpeed * 1000,
    0,
  );

  const selectImgIndex = useCallback(
    (popupInterval, newIndex, reset = false) => {
      reset && popupInterval();
      const total = activeItemImgLength.current;
      if (total <= 0) return;
      const wrappedIndex = ((newIndex % total) + total) % total;
      setPopupImgIndex(wrappedIndex);
    },
    [],
  );

  const navigateItem = useCallback(
    (direction) => {
      if (!displayedItems.length) return;
      const currentIdx = displayedItems.findIndex(
        (item) => item.originalIndex === activeIndex,
      );
      if (currentIdx === -1) return;
      const nextIdx =
        (currentIdx + direction + displayedItems.length) %
        displayedItems.length;
      const nextOriginalIndex = displayedItems[nextIdx].originalIndex;
      setActiveIndex(nextOriginalIndex);
      setPopupImgIndex(0);
      popupImgLoadCount.current = 0;
    },
    [displayedItems, activeIndex],
  );

  const lastTriggerRef = useRef(null);

  const onClickGalleryItem = useCallback(
    (index) => {
      const item = gallery[index];
      if (item?.link) {
        window.location.href = item.link;
        return;
      }
      if (!enableLightbox && isPopup) {
        // In editor (when isPopup is false but it acts as editor), or if lightbox disabled, we still might want to set active index for editing
        if (setEditActiveIndex) setEditActiveIndex(index);
        return;
      }

      lastTriggerRef.current = galleryItemRefs.current[index]?.current || null;
      setActiveIndex(index);
      setEditActiveIndex && setEditActiveIndex(index);
      isPopup && popupGallery.current?.classList.add("active");
    },
    [gallery, enableLightbox, isPopup, setEditActiveIndex],
  );

  useEffect(() => {
    if (isPopup && activeIndex !== null && popupGallery.current) {
      requestAnimationFrame(() => {
        popupGallery.current?.classList.add("active");
      });
    }
  }, [isPopup, activeIndex]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      popupGallery.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  const [toastMessage, setToastMessage] = useState(null);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const onTouchStart = useCallback((e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;

      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < 0) {
          if (activeItemImgLength.current > 1) {
            selectImgIndex(startPopupInterval, popupImgIndex + 1, true);
          } else {
            navigateItem(1);
          }
        } else {
          if (activeItemImgLength.current > 1) {
            selectImgIndex(startPopupInterval, popupImgIndex - 1, true);
          } else {
            navigateItem(-1);
          }
        }
      }
    },
    [popupImgIndex, navigateItem, selectImgIndex, startPopupInterval],
  );

  const handleDownload = useCallback((url, title) => {
    if (!url) return;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = blobUrl;
        const ext = url.split(".").pop().split(/[#?]/)[0] || "jpg";
        a.download = `${
          title ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase() : "image"
        }.${ext}`;
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
  }, []);

  const handleShare = useCallback((url, title) => {
    if (!url) return;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      navigator
        .share({
          title: title || document.title,
          url,
        })
        .catch(() => {
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
  }, []);

  const onClickClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsFullscreen(false);
    setTimeout(() => {
      setActiveIndex(null);
    }, 750);
    popupGallery.current?.classList.remove("active");
    popupImgLoadCount.current = 0;
    lastTriggerRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isPopup || activeIndex === null) return;

    popupGallery.current?.querySelector(".btnClose")?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClickClose();
      } else if (e.key === "ArrowLeft") {
        if (activeItemImgLength.current > 1) {
          selectImgIndex(startPopupInterval, popupImgIndex - 1, true);
        } else if (displayedItems.length > 1) {
          navigateItem(-1);
        }
      } else if (e.key === "ArrowRight") {
        if (activeItemImgLength.current > 1) {
          selectImgIndex(startPopupInterval, popupImgIndex + 1, true);
        } else if (displayedItems.length > 1) {
          navigateItem(1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isPopup,
    activeIndex,
    popupImgIndex,
    onClickClose,
    selectImgIndex,
    startPopupInterval,
    displayedItems.length,
    navigateItem,
  ]);

  return (
    <>
      <div
        ref={galleryGridRef}
        className={`galleryItems columns-${
          columns?.desktop || 3
        } columns-tablet-${columns?.tablet || 2} columns-mobile-${
          columns?.mobile || 1
        }`}
        onContextMenu={(e) => disableRightClick && e.preventDefault()}>
        {displayedItems.map((item) => {
          const originalIndex = item.originalIndex;
          return (
            <div
              key={originalIndex}
              data-item-key={`item-${originalIndex}`}
              className={`galleryItem ${
                editActiveIndex !== null && originalIndex === editActiveIndex
                  ? "bPlNowEditing"
                  : ""
              }`}
              id={`galleryItem-${originalIndex}`}
              onClick={() => onClickGalleryItem(originalIndex)}
              ref={galleryItemRefs.current[originalIndex]}
              role={isPopup ? "button" : undefined}
              tabIndex={isPopup ? 0 : undefined}
              aria-label={
                isPopup
                  ? item?.title || __("Open image", "image-gallery")
                  : undefined
              }
              onKeyDown={
                isPopup
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClickGalleryItem(originalIndex);
                      }
                    }
                  : undefined
              }>
              <GalleryImages
                images={item?.images || []}
                wrapper={galleryItemRefs.current[originalIndex]}
                container={galleryImgContainerRefs.current[originalIndex]}
                loadCount={galleryImgLoadCountRefs.current[originalIndex]}
                altText={item?.title || __("Gallery image", "image-gallery")}
                watermark={watermark}
                location="gallery"
              />
              <GalleryLoader />
              <GalleryHeader
                title={item?.title || ""}
                subtitle={item?.subtitle || ""}
              />
            </div>
          );
        })}
      </div>
      {enableLoadMore && visibleCount < visibleItems.length && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}>
          <button
            className="bPlButton"
            style={{
              padding: "10px 24px",
              cursor: "pointer",
              background:
                loadMoreBtnColors?.bgType === "gradient"
                  ? loadMoreBtnColors?.gradient
                  : loadMoreBtnColors?.bg || "#146ef5",
              color: loadMoreBtnColors?.color || "#fff",
              border: "none",
              borderRadius: `${
                loadMoreBtnTypo?.borderRadius !== undefined
                  ? loadMoreBtnTypo.borderRadius
                  : 4
              }px`,
              fontSize: `${
                loadMoreBtnTypo?.fontSize !== undefined
                  ? loadMoreBtnTypo.fontSize
                  : 16
              }px`,
            }}
            onClick={() => setVisibleCount((prev) => prev + imagesPerLoad)}>
            {loadMoreBtnText}
          </button>
        </div>
      )}
      {isPopup && enableLightbox && popupItem && (
        <div
          className="popupGallery"
          ref={popupGallery}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={popupItem?.title || __("Image viewer", "image-gallery")}>
          <div className="popupContent">
            <div
              className={`galleryItem ${
                editActiveIndex !== null && activeIndex === editActiveIndex
                  ? "nowEditing"
                  : ""
              }`}
              id={`galleryItem-${activeIndex}`}
              ref={popupGalleryItem}>
              <GalleryImages
                images={popupItem?.images || []}
                imgIndex={popupImgIndex}
                wrapper={popupGalleryItem}
                container={popupImgContainer}
                loadCount={popupImgLoadCount}
                altText={
                  popupItem?.title || __("Gallery image", "image-gallery")
                }
                eager
                watermark={watermark}
                location="popup"
              />
              <GalleryLoader />
              {(() => {
                const currentDisplayIndex = displayedItems.findIndex(
                  (item) => item.originalIndex === activeIndex,
                );
                const isMultiImg = (popupItem?.images?.length || 0) > 1;
                const activeImgObj =
                  popupItem?.images?.[popupImgIndex] || popupItem?.images?.[0];
                const activeImgUrl =
                  typeof activeImgObj === "string"
                    ? activeImgObj
                    : activeImgObj?.url;
                const counterText = showLightboxCounter
                  ? isMultiImg
                    ? `${popupImgIndex + 1} / ${popupItem.images.length}`
                    : displayedItems.length > 0 && currentDisplayIndex !== -1
                    ? `${currentDisplayIndex + 1} / ${displayedItems.length}`
                    : null
                  : null;

                return (
                  <>
                    <GalleryHeader
                      title={popupItem?.title || ""}
                      subtitle={popupItem?.subtitle || ""}
                      onClick={onClickClose}
                      counter={counterText}
                      onFullscreen={
                        showLightboxFullscreen ? toggleFullscreen : null
                      }
                      isFullscreen={isFullscreen}
                      onDownload={
                        showLightboxDownload && activeImgUrl
                          ? () => handleDownload(activeImgUrl, popupItem?.title)
                          : null
                      }
                      onShare={
                        showLightboxShare && activeImgUrl
                          ? () => handleShare(activeImgUrl, popupItem?.title)
                          : null
                      }
                    />
                    {isMultiImg ? (
                      <footer className="galleryFooter">
                        <nav className="controls">
                          <button
                            className="control controlArrow"
                            aria-label={__("Previous image", "image-gallery")}
                            onClick={() =>
                              selectImgIndex(
                                startPopupInterval,
                                popupImgIndex - 1,
                                true,
                              )
                            }>
                            &#8592;
                          </button>
                          {popupItem.images.map((_, i) => (
                            <button
                              key={i}
                              className={`control controlDot ${
                                i === popupImgIndex ? "controlDotActive" : ""
                              }`}
                              aria-label={sprintf(
                                /* translators: %d: image number */
                                __("Go to image %d", "image-gallery"),
                                i + 1,
                              )}
                              aria-current={
                                i === popupImgIndex ? "true" : undefined
                              }
                              onClick={() =>
                                selectImgIndex(startPopupInterval, i)
                              }></button>
                          ))}
                          <button
                            className="control controlArrow"
                            aria-label={__("Next image", "image-gallery")}
                            onClick={() =>
                              selectImgIndex(
                                startPopupInterval,
                                popupImgIndex + 1,
                                true,
                              )
                            }>
                            &#8594;
                          </button>
                        </nav>
                      </footer>
                    ) : displayedItems.length > 1 ? (
                      <footer className="galleryFooter">
                        <nav className="controls">
                          <button
                            className="control controlArrow"
                            aria-label={__(
                              "Previous gallery item",
                              "image-gallery",
                            )}
                            onClick={() => navigateItem(-1)}>
                            &#8592;
                          </button>
                          {displayedItems.map((item, i) => (
                            <button
                              key={i}
                              className={`control controlDot ${
                                i === currentDisplayIndex
                                  ? "controlDotActive"
                                  : ""
                              }`}
                              aria-label={sprintf(
                                /* translators: %d: item number */
                                __("Go to item %d", "image-gallery"),
                                i + 1,
                              )}
                              aria-current={
                                i === currentDisplayIndex ? "true" : undefined
                              }
                              onClick={() => {
                                const target = displayedItems[i];
                                if (target) {
                                  setActiveIndex(target.originalIndex);
                                  setPopupImgIndex(0);
                                  popupImgLoadCount.current = 0;
                                }
                              }}></button>
                          ))}
                          <button
                            className="control controlArrow"
                            aria-label={__(
                              "Next gallery item",
                              "image-gallery",
                            )}
                            onClick={() => navigateItem(1)}>
                            &#8594;
                          </button>
                        </nav>
                      </footer>
                    ) : null}
                  </>
                );
              })()}
            </div>
          </div>
          {toastMessage && (
            <div
              className="lightboxToast"
              style={{
                position: "absolute",
                bottom: "32px",
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
              }}>
              {toastMessage}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Gallery;
