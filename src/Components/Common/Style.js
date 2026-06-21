import {
  getBackgroundCSS,
  getShadowCSS,
  getTypoCSS,
  getBoxCSS,
  getColorsCSS,
} from "../../../../bpl-tools/utils/getCSS.js";

import {
  mobileBreakpoint,
  tabBreakpoint,
} from "../../../../bpl-tools/utils/data";

const Style = ({ attributes, clientId }) => {
  const {
    gallery = [],
    itemHeight,
    columnGap,
    rowGap,
    background,
    shadow: galleryShadow,
    hoverShadow: galleryHoverShadow,
    titleTypo,
    subtitleTypo,
    styles,
    imagesData,
    styleSl,
  } = attributes || {};

  const {
    title,
    description,
    container,
    columns,
    gap,
    overlayColor,
    shadow,
    hoverShadow,
    image,
    modal,
    date,
    card,
    slider,
    button,
  } = styles || {};

  const { title: modalTitle, description: modalDescription } = modal || {};
  const { images } = imagesData || {};
  const {
    shadow: cardShadow,
    borderRadius,
    alignItems,
    height,
    width,
    gap: cardGap,
  } = card || {};

  const { dropShadow } = styles?.images || {};

  // Style Default
  const gallerySl = `#bigbImageGallery-${clientId} .bigbImageGallery`;
  const mainSl = `#bigbImageGallery-${clientId}`;

  // Style One
  const masonryWrapperBlockSl = `${mainSl} .bigbImageGallery.${styleSl}`;
  const masonryMainBlockSl = `${masonryWrapperBlockSl} .masonry-gallery`;
  const containerGridSl = `${masonryMainBlockSl} .grid`;
  const imageContainerSl = `${containerGridSl} .image-container`;
  const containerTitleSl = `${imageContainerSl} .title`;
  const containerDescriptionSl = `${imageContainerSl} .description`;
  const styleOneModalContainerSl = `${masonryMainBlockSl} .modal-container`;
  const styleOneModalSl = `${styleOneModalContainerSl} .modal`;
  const styleOneModalTextContent = `${styleOneModalSl} .text-content`;
  const styleOneModalTitleSl = `${styleOneModalTextContent} .title`;
  const styleOneModalDescriptionSl = `${styleOneModalTextContent} .description`;

  // Style Two
  const polaroidWrapperBlockSl = `${mainSl} .bigbImageGallery.${styleSl}`;
  const polaroidMainBlockSl = `${polaroidWrapperBlockSl} .polaroid-gallery`;
  const polaroidWrapperSl = `${polaroidMainBlockSl} .polaroid-wrapper`;
  const polaroidContainerSl = `${polaroidWrapperSl} .polaroid-container`;
  const polaroidImageSl = `${polaroidContainerSl} .polaroid-image`;
  const polaroidTextContent = `${polaroidContainerSl} .text-content`;
  const polaroidTitleSl = `${polaroidTextContent} .title`;
  const polaroidDescriptionSl = `${polaroidTextContent} .description`;
  const polaroidDateSl = `${polaroidTextContent} .date`;
  const styleTwoModalContainerSl = `${polaroidMainBlockSl} .modal-container`;
  const styleTwoModalSl = `${styleTwoModalContainerSl} .modal`;
  const styleTwoModalTextContent = `${styleTwoModalSl} .text-content`;
  const styleTwoModalTitleSl = `${styleTwoModalTextContent} .title`;
  const styleTwoModalDescriptionSl = `${styleTwoModalTextContent} .description`;

  // Style Three
  const dynamicWrappderBlockSl = `${mainSl} .bigbImageGallery.${styleSl}`;
  const dynamicMotionContainerSl = `${dynamicWrappderBlockSl} .gallery-container`;
  const dynamicMotionContentSl = `${dynamicMotionContainerSl} .gallery-content`;
  const dynamicMotionGridSl = `${dynamicMotionContentSl} .gallery-grid`;
  const dynamicMotionItemSl = `${dynamicMotionGridSl} .gallery-item`;
  const dynamicMotionItemContentSl = `${dynamicMotionItemSl} .gallery-item-content`;
  const dynamicMotionOverlaySl = `${dynamicMotionItemContentSl} .gallery-overlay`;
  const dynamicMotionTitleSl = `${dynamicMotionOverlaySl} .gallery-title`;
  const dynamicMotionDescriptionSl = `${dynamicMotionOverlaySl} .gallery-description`;

  const styleThreeModalContainerSl = `${dynamicMotionContainerSl} .modal-container`;
  const styleThreeModalSl = `${styleThreeModalContainerSl} .modal`;
  const styleThreeModalTextContent = `${styleThreeModalSl} .text-content`;
  const styleThreeModalTitleSl = `${styleThreeModalTextContent} .title`;
  const styleThreeModalDescriptionSl = `${styleThreeModalTextContent} .description`;

  // Style Four
  const threeDParallaxWrappderBlockSl = `${mainSl} .bigbImageGallery.${styleSl}`;
  const mainContainerSl = `${threeDParallaxWrappderBlockSl} .tdpig__wrapper`;
  const threeDParallaxBlockSl = `${mainSl} .tdpig__cards`;
  const threeDParallaxCard = `${threeDParallaxBlockSl} .tdpig__card`;
  const threeDParallaxCardText = `${threeDParallaxCard} .tdpig__card__text`;
  const threeDParallaxCardTitle = `${threeDParallaxCardText} .tdpig__card__title`;

  // Style Five
  const threeDSliderWrappderBlockSl = `${mainSl} .bigbImageGallery.${styleSl}`;
  // const threeDSliderMainSl = `${threeDSliderWrappderBlockSl} .wp-block-tdsig-threed-slider-image-gallery`;
  const threeDSliderContainer = `${threeDSliderWrappderBlockSl} .tdsig-container`;
  const threeDSlider = `${threeDSliderContainer} .tdsig-slider`;
  const threeDCard = `${threeDSlider} .tdsig-card`;
  const threeDCardTextSl = `${threeDCard} .text-content h1`;
  const threeDCardTextAlignSl = `${threeDCard} .text-content`;

  // Style Six
  const hexagonMainWrapper = `${mainSl} .bigbImageGallery.${styleSl}`;
  const haxagonContainerSl = `${hexagonMainWrapper} .hex-container`;
  const hexagonMainSl = `${haxagonContainerSl} .hex-main`;
  // const hexagonLinkSl = `${hexagonMainSl} .hex-link`;
  // const hexagonImageSl = `${hexagonLinkSl} .hex-image`;

  // Style Seven
  const carouselMainWrapper = `${mainSl} .bigbImageGallery.${styleSl}`;
  const imgCarouselContainerSl = `${carouselMainWrapper} .image-carousel-container`;
  const imgCarouselSl = `${imgCarouselContainerSl} .image-carousel`;
  const swiperWrapperSl = `${imgCarouselSl} .swiper-wrapper`;
  const swiperSlideSl = `${swiperWrapperSl} .swiper-slide`;
  const swiperButtonSl = `${imgCarouselSl} .swiper-button`;
  const swiperButtonPrevSl = `${swiperButtonSl}.custom-prev`;
  const swiperButtonNextSl = `${swiperButtonSl}.custom-next`;

  const threeDParallaxShadowValue =
    cardShadow?.map((s) => getShadowCSS(s, "box")).join(", ") || "none";

  const toCssColor = (color) => {
    if (!color) return "rgba(0, 0, 0, 0.55)";

    if (typeof color === "string") return color;

    if (typeof color === "object") {
      const r = Number.isFinite(color.r) ? color.r : 0;
      const g = Number.isFinite(color.g) ? color.g : 0;
      const b = Number.isFinite(color.b) ? color.b : 0;
      const a = Number.isFinite(color.a) ? color.a : 1;

      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return "rgba(0, 0, 0, 0.55)";
  };

  const imageStyles = images
    ?.map((styles) => {
      const { width, height, left, right, top, background, id } = styles;

      return `

        ${threeDParallaxCard}.tdpig__card-${id} .tdpig__card__img{
		  ${width ? `width: ${width};` : ""}
		  ${height ? `height: ${height};` : ""}
		  ${left ? `left: ${left};` : ""}
		  ${right ? `right: ${right};` : ""}
		  ${top ? `top: ${top};` : ""}
		}

		${threeDParallaxCard}.tdpig__card-${id} .tdpig__card__bg {
		  ${
        background
          ? `background: url(${background}) center / cover no-repeat;`
          : ""
      }
	  	}


        `;
    })
    .join("\n");

  const shadowValue =
    shadow?.map((s) => getShadowCSS(s, "box")).join(", ") || "none";

  const hoverShadowValue =
    hoverShadow?.map((s) => getShadowCSS(s, "box")).join(", ") || "none";

  const imgDropShadow = dropShadow
    ?.map(
      (sh) => `drop-shadow(${sh.hOffset} ${sh.vOffset} ${sh.blur} ${sh.color})`
    )
    .join(" ");

  return (
    <>
      {/* Typography & Layout Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          
            ${getTypoCSS("", titleTypo)?.googleFontLink || ""}
            ${getTypoCSS("", subtitleTypo)?.googleFontLink || ""}
          
			${getTypoCSS("", title?.typography)?.googleFontLink}
			${getTypoCSS("", description?.typography)?.googleFontLink}

     
      ${getTypoCSS("", date?.typography)?.googleFontLink}
      ${getTypoCSS("", modalTitle?.typography)?.googleFontLink}
      ${getTypoCSS("", modalDescription?.typography)?.googleFontLink}


      ${getTypoCSS("", title?.typography)?.googleFontLink}

   
      ${getTypoCSS("", title?.typography)?.googleFontLink}
       


   
      ${getTypoCSS(`${gallerySl} .galleryHeader h3`, titleTypo)?.styles || ""}
      ${
        getTypoCSS(`${gallerySl} .galleryHeader h5`, subtitleTypo)?.styles || ""
      }

  
			${getTypoCSS(containerTitleSl, title?.typography)?.styles}
			${getTypoCSS(containerDescriptionSl, description?.typography)?.styles}
			${getTypoCSS(styleOneModalTitleSl, title?.typography)?.styles}
			${getTypoCSS(styleOneModalDescriptionSl, description?.typography)?.styles}

  
      ${getTypoCSS(polaroidTitleSl, title?.typography)?.styles}
      ${getTypoCSS(polaroidDescriptionSl, description?.typography)?.styles}
      ${getTypoCSS(polaroidDateSl, date?.typography)?.styles}
      ${getTypoCSS(styleTwoModalTitleSl, modalTitle?.typography)?.styles}
      ${
        getTypoCSS(styleTwoModalDescriptionSl, modalDescription?.typography)
          ?.styles
      }

      ${getTypoCSS(dynamicMotionTitleSl, title?.typography)?.styles}
      ${getTypoCSS(dynamicMotionDescriptionSl, description?.typography)?.styles}
      ${getTypoCSS(styleThreeModalTitleSl, modalTitle?.typography)?.styles}
      ${
        getTypoCSS(styleThreeModalDescriptionSl, modalDescription?.typography)
          ?.styles
      }

       ${getTypoCSS(threeDParallaxCardTitle, title?.typography)?.styles}


      ${getTypoCSS(threeDCardTextSl, title?.typography)?.styles}


            ${gallerySl} .galleryItems {
              grid-gap: ${rowGap} ${columnGap};
            }

            ${gallerySl} .galleryItem {
              height: ${itemHeight};
              ${getBackgroundCSS(background)}
              box-shadow: ${getShadowCSS(galleryShadow)};
            }

            ${gallerySl} .galleryItem:hover,
            ${gallerySl} .galleryItem.nowEditing {
              box-shadow: ${getShadowCSS(galleryHoverShadow)};
            }


       
    ${containerGridSl}{
		  grid-template-columns: repeat(${columns?.desktop}, minmax(0, 1fr));
		  grid-auto-flow: dense;
		  gap: ${gap?.desktop};
		}

		${imageContainerSl} .bg-gradient-to-t{
		  background-image: linear-gradient(
			to top,
			${overlayColor?.desktop}, transparent
		  );				
		}

		${imageContainerSl}{
		  box-shadow: ${shadowValue};
		  border-radius: ${getBoxCSS(image?.borderRadius?.desktop)};
		}

		${imageContainerSl}:hover{
		  box-shadow: ${hoverShadowValue};
		}

		${styleOneModalTitleSl}{
		  color: ${title?.color};
		  margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${styleOneModalDescriptionSl}{
		  color: ${description?.color};
		  margin: ${getBoxCSS(description?.margin?.desktop)}; 
		}
		
		${containerTitleSl}{
		  color: ${title?.color};
		  margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${containerDescriptionSl}{
		  color: ${description?.color};
		  margin: ${getBoxCSS(description?.margin?.desktop)};   
		}

		${masonryMainBlockSl}{
		   ${getBackgroundCSS(container?.bg?.desktop)}
       		border-radius: ${container?.borderRadius?.top} ${
            container?.borderRadius?.right
          } ${container?.borderRadius?.bottom} ${container?.borderRadius?.left};
       		padding: ${getBoxCSS(container?.padding?.desktop)};
       		margin: ${getBoxCSS(container?.margin?.desktop)};
		}

		${tabBreakpoint}{
			${containerTitleSl}{
		  	  margin: ${getBoxCSS(title?.margin?.tablet)};
			}

			${containerDescriptionSl}{
		  	  margin: ${getBoxCSS(description?.margin?.tablet)};   
			}

			${masonryMainBlockSl}{
				${getBackgroundCSS(container?.bg?.tablet)}
				padding: ${getBoxCSS(container?.padding?.tablet)};
				margin: ${getBoxCSS(container?.margin?.tablet)};
			}

			${containerGridSl}{
		  		grid-template-columns: repeat(${columns?.tablet}, minmax(0, 1fr));
				gap: ${gap?.tablet};
			}

      ${imageContainerSl} .bg-gradient-to-t{
		    background-image: linear-gradient(
			  to top, ${overlayColor?.tablet}, transparent);		
		  }

      ${imageContainerSl}{
        border-radius: ${getBoxCSS(image?.borderRadius?.tablet)};	
      }

      ${styleOneModalDescriptionSl}{
		    margin: ${getBoxCSS(description?.margin?.tablet)}; 
		  }

      ${styleOneModalTitleSl}{
		    margin: ${getBoxCSS(title?.margin?.tablet)};
		  }
		}

		${mobileBreakpoint}{
		  	${containerTitleSl}{
		  	  margin: ${getBoxCSS(title?.margin?.mobile)};
			}

			${containerDescriptionSl}{
		  	  margin: ${getBoxCSS(description?.margin?.mobile)};   
			}

			${masonryMainBlockSl}{
				${getBackgroundCSS(container?.bg?.mobile)}
				padding: ${getBoxCSS(container?.padding?.mobile)};
				margin: ${getBoxCSS(container?.margin?.mobile)};
			}

			${containerGridSl}{
		  		grid-template-columns: repeat(${columns?.mobile}, minmax(0, 1fr));
				gap: ${gap?.mobile};
			}

      ${imageContainerSl} .bg-gradient-to-t{
		  background-image: linear-gradient(
			to top,
			${overlayColor?.mobile}, transparent
		  );		
		  }

      ${imageContainerSl}{
        border-radius: ${getBoxCSS(image?.borderRadius?.mobile)};	
      }

      ${styleOneModalDescriptionSl}{
		    margin: ${getBoxCSS(description?.margin?.mobile)}; 
		  }

      ${styleOneModalTitleSl}{
		    margin: ${getBoxCSS(title?.margin?.mobile)};
		  }
		}

		${polaroidContainerSl}{
		  box-shadow: ${shadowValue};
		  width: ${width?.desktop};
		  overflow: visible;
		}

		${polaroidImageSl}{
		  height: ${height?.desktop};
		}

		${polaroidContainerSl}:hover{
		  box-shadow: ${hoverShadowValue}
		}
			
		${polaroidWrapperSl} {
		  grid-template-columns: repeat(${columns?.desktop}, minmax(0, 300px));
		  gap: ${cardGap?.desktop};
		}

		${styleTwoModalTitleSl}{
			color: ${modalTitle?.color};
			margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${styleTwoModalDescriptionSl}{
			color: ${modalDescription?.color};
			margin: ${getBoxCSS(description?.margin?.desktop)};
		}

		${polaroidTitleSl}{
			color: ${title?.color};
			margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${polaroidDescriptionSl}{
			color: ${description?.color};
			margin: ${getBoxCSS(description?.margin?.desktop)};
		}

		${polaroidDateSl}{
			color: ${date?.color};
			margin: ${getBoxCSS(date?.margin?.desktop)};
		}

		${polaroidMainBlockSl}{
			${getBackgroundCSS(container?.bg?.desktop)}
				border-radius: ${container?.borderRadius?.top} ${
          container?.borderRadius?.right
        } ${container?.borderRadius?.bottom} ${container?.borderRadius?.left};
			padding: ${getBoxCSS(container?.padding?.desktop)};
			margin: ${getBoxCSS(container?.margin?.desktop)};
		}


		${tabBreakpoint}{
			${polaroidTitleSl}{
			margin: ${getBoxCSS(title?.margin?.tablet)};
			}

			${polaroidDescriptionSl}{
			margin: ${getBoxCSS(description?.margin?.tablet)};
			}

			${polaroidMainBlockSl}{
				${getBackgroundCSS(container?.bg?.tablet)}
				padding: ${getBoxCSS(container?.padding?.tablet)};
				margin: ${getBoxCSS(container?.margin?.tablet)};
			}

			${polaroidWrapperSl} {
			  grid-template-columns: repeat(${columns?.tablet}, minmax(0, 300px));
			  gap: ${cardGap?.tablet};
			}

			${polaroidContainerSl}{
				width: ${width?.tablet};
				overflow: visible;
			}

			${polaroidImageSl}{
				height: ${height?.tablet};
			}
		}

		${mobileBreakpoint}{
			${polaroidTitleSl}{
			  margin: ${getBoxCSS(title?.margin?.mobile)};
			}

			${polaroidDescriptionSl}{
			  margin: ${getBoxCSS(description?.margin?.mobile)};
			}

			${polaroidDateSl}{
			  margin: ${getBoxCSS(date?.margin?.mobile)};
			}

			${polaroidMainBlockSl}{
				${getBackgroundCSS(container?.bg?.mobile)}
				padding: ${getBoxCSS(container?.padding?.mobile)};
				margin: ${getBoxCSS(container?.margin?.mobile)};
			}

			${polaroidWrapperSl} {
			  grid-template-columns: repeat(${columns?.mobile}, minmax(0, 300px));
			  gap: ${cardGap?.mobile};
			}

			${polaroidContainerSl}{
			  width: ${width?.mobile};
			  overflow: visible;
			}

			${polaroidImageSl}{
				height: ${height?.mobile};
			}
		}




    ${dynamicMotionOverlaySl}{
		  background: linear-gradient(
		    to top,
		    ${image?.overlayColor?.desktop},
		    ${image?.overlayColor?.desktop},
		    transparent
		  );
		}

		${dynamicMotionItemSl} {
		  box-shadow: ${shadowValue};
		  border-radius: ${getBoxCSS(image?.borderRadius?.desktop)};
		}
		
			
		${dynamicMotionGridSl} {
		  grid-template-columns: repeat(${columns?.desktop}, 1fr);
		}

		${styleThreeModalTitleSl}{
		  color: ${modalTitle?.color};
		  margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${styleThreeModalDescriptionSl}{
		  color: ${modalDescription?.color};
		  margin: ${getBoxCSS(description?.margin?.desktop)};
		}

		${dynamicMotionTitleSl}{
		  color: ${title?.color};
		  margin: ${getBoxCSS(title?.margin?.desktop)};
		}

		${dynamicMotionDescriptionSl}{
		  color: ${description?.color};
		  margin: ${getBoxCSS(description?.margin?.desktop)};
		}
		

		${dynamicMotionContainerSl}{
		  ${getBackgroundCSS(container?.bg?.desktop)}
		  border-radius: ${container?.borderRadius?.top} ${
        container?.borderRadius?.right
      } ${container?.borderRadius?.bottom} ${container?.borderRadius?.left};
		  padding: ${getBoxCSS(container?.padding?.desktop)};
		  margin: ${getBoxCSS(container?.margin?.desktop)};
		  min-height: ${getBoxCSS(container?.height?.desktop)};
		}


		${tabBreakpoint}{
		${styleThreeModalTitleSl}{
		  margin: ${getBoxCSS(title?.margin?.tablet)};
		}

		  ${dynamicMotionTitleSl}{
			margin: ${getBoxCSS(title?.margin?.tablet)};
		  }

		  ${dynamicMotionDescriptionSl}{
			margin: ${getBoxCSS(description?.margin?.tablet)};
		  }

		  ${dynamicMotionContainerSl}{
			${getBackgroundCSS(container?.bg?.tablet)}
			padding: ${getBoxCSS(container?.padding?.tablet)};
			margin: ${getBoxCSS(container?.margin?.tablet)};
			min-height: ${getBoxCSS(container?.height?.desktop)};
		  }

		  ${dynamicMotionGridSl} {
			grid-template-columns: repeat(${columns?.tablet}, 1fr);
		  }

		  ${dynamicMotionItemSl} {
		  	border-radius: ${getBoxCSS(image?.borderRadius?.tablet)};
		  }

		  ${styleThreeModalDescriptionSl}{
		  	margin: ${getBoxCSS(description?.margin?.tablet)};
		  }
		}

		${mobileBreakpoint}{
		  ${styleThreeModalTitleSl}{
			margin: ${getBoxCSS(title?.margin?.tablet)};
		  }

		  ${dynamicMotionTitleSl}{
			margin: ${getBoxCSS(title?.margin?.mobile)};
		  }

		  ${dynamicMotionDescriptionSl}{
			margin: ${getBoxCSS(description?.margin?.mobile)};
		  }

		  ${dynamicMotionContainerSl}{
			${getBackgroundCSS(container?.bg?.mobile)}
			padding: ${getBoxCSS(container?.padding?.mobile)};
			margin: ${getBoxCSS(container?.margin?.mobile)};
			min-height: ${getBoxCSS(container?.height?.desktop)};
		  }

		  ${dynamicMotionGridSl} {
			grid-template-columns: repeat(${columns?.mobile}, 1fr);
		  }

		  ${dynamicMotionItemSl} {
		  	border-radius: ${getBoxCSS(image?.borderRadius?.mobile)};
		  }

		  ${styleThreeModalDescriptionSl}{
		  	margin: ${getBoxCSS(description?.margin?.mobile)};
		  }
		}

      ${imageStyles}

		${mainContainerSl} {
		  ${getBackgroundCSS(container?.bg?.desktop)}
		  border-radius: ${getBoxCSS(container?.borderRadius?.desktop)};
		  padding: ${getBoxCSS(container?.padding?.desktop)};
		  margin: ${getBoxCSS(container?.margin?.desktop)};
		  max-width: ${getBoxCSS(container?.width?.desktop)};
		  min-height: ${getBoxCSS(container?.height?.desktop)};
		  justify-content: ${alignItems};
		}

		${threeDParallaxBlockSl}{
		  gap: ${cardGap?.desktop};
		  justify-items: ${alignItems};
		  grid-template-columns: repeat(${columns?.desktop}, minmax(200px, 1fr));  
		  width: ${getBoxCSS(width?.desktop)};  
		}


		${threeDParallaxCardText} {
    		background: linear-gradient(to bottom,rgba(0, 0, 0, 0) 0%, ${
          toCssColor(title?.overlayColor?.desktop) || "rgba(0,0,0,0.55)"
        } 100%);
  		}
		
		
		${threeDParallaxCardTitle} {
		  color: ${title?.color || "inherit"};
		  margin: ${getBoxCSS(title?.margin?.desktop)};
		  padding: ${getBoxCSS(title?.padding?.desktop)};
		}

		${threeDParallaxCard} {
		  box-shadow: ${threeDParallaxShadowValue};
		  border-radius: ${getBoxCSS(borderRadius?.desktop)};
		  width: 100%;
		  height: ${getBoxCSS(height?.desktop)};
	  	}


		${tabBreakpoint}{	
		  ${threeDParallaxBlockSl}{
			gap: ${cardGap?.tablet};
			grid-template-columns: repeat(${columns?.tablet}, minmax(200px, 1fr)); 
			width: ${getBoxCSS(width?.desktop)};
		  }

		  ${threeDParallaxCard} {
		  	box-shadow: ${threeDParallaxShadowValue};
			
			height: ${getBoxCSS(height?.tablet)};
			width: 100%;
			border-radius: ${getBoxCSS(borderRadius?.tablet)};
		  }

		  ${threeDParallaxCardTitle} {
			margin: ${getBoxCSS(title?.margin?.tablet)};
			padding: ${getBoxCSS(title?.padding?.tablet)};
		  }

		  ${threeDParallaxCardText} {
			background: linear-gradient(to bottom,rgba(0, 0, 0, 0) 0%, ${
        toCssColor(title?.overlayColor?.tablet) || "rgba(0, 0, 0, 0.55)"
      } 100%);
		  }

		  ${mainContainerSl} {
			border-radius: ${getBoxCSS(container?.borderRadius?.tablet)};
			padding: ${getBoxCSS(container?.padding?.tablet)};
			margin: ${getBoxCSS(container?.margin?.tablet)};
			max-width: ${getBoxCSS(container?.width?.tablet)};
			min-height: ${getBoxCSS(container?.height?.tablet)};
			${getBackgroundCSS(container?.bg?.tablet)}
			justify-content: ${alignItems};
		  }
		}


		${mobileBreakpoint}{
			${threeDParallaxBlockSl}{
			  width: ${getBoxCSS(width?.desktop)};
			  gap: ${cardGap?.mobile};
			  grid-template-columns: repeat(${columns?.mobile}, minmax(200px, 1fr));
			}

			${threeDParallaxCard} {
			  box-shadow: ${threeDParallaxShadowValue};
			  width: 100%;
			  height: ${getBoxCSS(height?.mobile)};
			  border-radius: ${getBoxCSS(borderRadius?.mobile)};
			}

			${threeDParallaxCardTitle} {
			  margin: ${getBoxCSS(title?.margin?.mobile)};
			  padding: ${getBoxCSS(title?.padding?.mobile)};
			}

		  	${threeDParallaxCardText} {
			  background: linear-gradient(to bottom,rgba(0, 0, 0, 0) 0%, ${
          toCssColor(title?.overlayColor?.mobile) || "rgba(0, 0, 0, 0.55)"
        } 100%);
			}	
		
			${mainContainerSl} {
			  border-radius: ${getBoxCSS(container?.borderRadius?.mobile)};
			  padding: ${getBoxCSS(container?.padding?.mobile)};
			  margin: ${getBoxCSS(container?.margin?.mobile)};
			  min-height: ${getBoxCSS(container?.height?.mobile)};
			  max-width: ${getBoxCSS(container?.width?.mobile)};
			  ${getBackgroundCSS(container?.bg?.mobile)}
			  justify-content: ${alignItems};
			}
		}

 
        ${threeDCardTextSl}{
          color: ${title?.color};
        }

        ${threeDCardTextAlignSl}{
         top: ${title?.verticalAlign?.desktop}%;
         left: ${title?.horizontalAlign?.desktop}%;
        }

        ${threeDCard}{
          border-radius: ${getBoxCSS(image?.borderRadius)};
          width: ${image?.width?.desktop};
          min-height: ${image?.height?.desktop};
          left: ${image?.horizontalAlign?.desktop};
          background-color: ${image?.overlayColor?.desktop};
        }

        ${threeDSlider}{
          top: ${image?.verticalAlign?.desktop};
          min-height: ${slider?.height?.desktop};
        }

        ${threeDSliderContainer}{
          ${getBackgroundCSS(container?.bg?.desktop)}
				  border-radius: ${container?.borderRadius?.top} ${
            container?.borderRadius?.right
          } ${container?.borderRadius?.bottom} ${container?.borderRadius?.left};
			    min-height: ${container?.height?.desktop};
			    margin: ${getBoxCSS(container?.margin?.desktop)};
        }

        ${tabBreakpoint}{
          ${threeDSliderContainer}{
            ${getBackgroundCSS(container?.bg?.tablet)}
            min-height: ${container?.height?.tablet};
            margin: ${getBoxCSS(container?.margin?.tablet)};
          }

          ${threeDSlider}{
            top: ${image?.verticalAlign?.tablet};
            min-height: ${slider?.height?.tablet};
          }

          ${threeDCard}{
            width: ${image?.width?.tablet};
            min-height: ${image?.height?.tablet};
            left: ${image?.horizontalAlign?.tablet};
            background-color: ${image?.overlayColor?.tablet};
          }

          ${threeDCardTextAlignSl}{
            top: ${title?.verticalAlign?.tablet}%;
            left: ${title?.horizontalAlign?.tablet}%;
          }

        }

        ${mobileBreakpoint}{
          ${threeDSliderContainer}{
            ${getBackgroundCSS(container?.bg?.mobile)}
            min-height: ${container?.height?.mobile};
            margin: ${getBoxCSS(container?.margin?.mobile)};
          }

          ${threeDSlider}{
            top: ${image?.verticalAlign?.mobile};
            min-height: ${slider?.height?.mobile};
          }

          ${threeDCard}{
            width: ${image?.width?.mobile};
            min-height: ${image?.height?.mobile};
            left: ${image?.horizontalAlign?.mobile};
            background-color: ${image?.overlayColor?.mobile};
          }

          ${threeDCardTextAlignSl}{
            top: ${title?.verticalAlign?.mobile}%;
            left: ${title?.horizontalAlign?.mobile}%;
          }
        }




            ${haxagonContainerSl} {
          border-radius: ${getBoxCSS(container?.borderRadius?.desktop)};
          padding: ${getBoxCSS(container?.padding?.desktop)};
          margin: ${getBoxCSS(container?.margin?.desktop)};
          ${getBackgroundCSS(container?.bg?.desktop)}
        }
        
        ${hexagonMainSl}{
          filter: ${imgDropShadow};
          font: clamp(0.5rem, 2vw, ${styles?.images?.size?.desktop}) sans-serif;
          grid-gap: calc(0.5 * ${
            styles?.images?.gap?.desktop
          } * 1.7320508076) ${styles?.images?.gap?.desktop};
        }


        ${tabBreakpoint}{
          ${hexagonMainSl}{
          font: clamp(0.5rem, 2vw, ${styles?.images?.size?.tablet}) sans-serif;
          grid-gap: calc(0.5 * ${styles?.images?.gap?.tablet} * 1.7320508076) ${
            styles?.images?.gap?.tablet
          };
        }

        ${haxagonContainerSl} {
          border-radius: ${getBoxCSS(container?.borderRadius?.tablet)};
          padding: ${getBoxCSS(container?.padding?.tablet)};
          margin: ${getBoxCSS(container?.margin?.tablet)};
          ${getBackgroundCSS(container?.bg?.tablet)}
        }
        }

        ${mobileBreakpoint}{
          ${hexagonMainSl}{
          font: clamp(0.5rem, 2vw, ${styles?.images?.size?.mobile}) sans-serif;
          grid-gap: calc(0.5 * ${styles?.images?.gap?.mobile} * 1.7320508076) ${
            styles?.images?.gap?.mobile
          };
          }

          ${haxagonContainerSl} {
          border-radius: ${getBoxCSS(container?.borderRadius?.mobile)};
          padding: ${getBoxCSS(container?.padding?.mobile)};
          margin: ${getBoxCSS(container?.margin?.mobile)};
          ${getBackgroundCSS(container?.bg?.mobile)}
        }
        }


        ${swiperSlideSl} img{
		  border-radius: ${getBoxCSS(image?.borderRadius?.desktop)};
		}
		
		${swiperButtonPrevSl}, ${swiperButtonNextSl}{
		 ${getColorsCSS(button?.btnColor?.normal)};
		  border-radius: ${getBoxCSS(button?.borderRadius?.desktop)};
		  width: ${button?.size?.desktop?.width};
		  height: ${button?.size?.desktop?.height};
		}

		${swiperButtonNextSl}{
		  right: ${button?.horizontalPosition?.desktop};
		  top: ${button?.verticalPosition?.desktop};
		}

		${swiperButtonPrevSl}{
		  left: ${button?.horizontalPosition?.desktop};
		  top: ${button?.verticalPosition?.desktop};
		}

		${swiperButtonPrevSl} svg, ${swiperButtonNextSl} svg {
			fill: ${button?.btnColor?.normal?.color};
			width: ${button?.iconSize?.desktop};
			height: ${button?.iconSize?.desktop};
		}

		${swiperButtonPrevSl}:hover, ${swiperButtonNextSl}:hover{
		  ${getColorsCSS(button?.btnColor?.hover)};
		  
		}

		${swiperButtonPrevSl}:hover svg, ${swiperButtonNextSl}:hover svg {
		  fill: ${button?.btnColor?.hover?.color};
		}

		${imgCarouselContainerSl}{
		  height: ${container?.height?.desktop};
		}

		${tabBreakpoint}{
			${swiperSlideSl} img{
		  		border-radius: ${getBoxCSS(image?.borderRadius?.tablet)};
			}

			${swiperButtonPrevSl}, ${swiperButtonNextSl}{
				border-radius: ${getBoxCSS(button?.borderRadius?.tablet)};
				width: ${button?.size?.tablet?.width};
				height: ${button?.size?.tablet?.height};
			}

			${swiperButtonPrevSl} svg, ${swiperButtonNextSl} svg {
				width: ${button?.iconSize?.tablet};
				height: ${button?.iconSize?.tablet};
			}

			${imgCarouselContainerSl}{
		  		height: ${container?.height?.tablet};
			}

			${swiperButtonNextSl}{
				right: ${button?.horizontalPosition?.tablet};
				top: ${button?.verticalPosition?.tablet};
			}

			${swiperButtonPrevSl}{
				left: ${button?.horizontalPosition?.tablet};
				top: ${button?.verticalPosition?.tablet};
			}
		}


		${mobileBreakpoint}{
			${swiperSlideSl} img{
		  		border-radius: ${getBoxCSS(image?.borderRadius?.mobile)};
			}

			${swiperButtonPrevSl}, ${swiperButtonNextSl}{
				border-radius: ${getBoxCSS(button?.borderRadius?.mobile)};
				width: ${button?.size?.mobile?.width};
				height: ${button?.size?.mobile?.height};
			}

			${swiperButtonPrevSl} svg, ${swiperButtonNextSl} svg {
				width: ${button?.iconSize?.mobile};
				height: ${button?.iconSize?.mobile};
			}

			${imgCarouselContainerSl}{
		  		height: ${container?.height?.mobile};
			}

			${swiperButtonNextSl}{
				right: ${button?.horizontalPosition?.mobile};
				top: ${button?.verticalPosition?.mobile};
			}

			${swiperButtonPrevSl}{
				left: ${button?.horizontalPosition?.mobile};
				top: ${button?.verticalPosition?.mobile};
			}
			
		}
          
			
          `.replace(/\s+/g, " "),
        }}
      />

      {/* Per-Item Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: gallery
            ?.map((item, index) => {
              const { colors = {}, btnColors = {} } = item;

              const itemHeaderSl = `${gallerySl} #galleryItem-${index} .galleryHeader`;
              const itemFooterSl = `${gallerySl} #galleryItem-${index} .galleryFooter`;

              const headerBG =
                colors.bgType === "gradient"
                  ? colors.gradient || "transparent"
                  : colors.bg || "transparent";

              const textColor = colors.color || "#000";

              const btnColor = btnColors.color || "#fff";
              const btnBG =
                btnColors.bgType === "gradient"
                  ? btnColors.gradient || "transparent"
                  : btnColors.bg || "transparent";

              return `
                ${itemHeaderSl}::before,
                ${itemFooterSl}::before {
                  background: ${headerBG};
                }

                ${itemHeaderSl} h3,
                ${itemHeaderSl} h5 {
                  color: ${textColor};
                }

                ${itemHeaderSl} .btnClose {
                  color: ${btnColor};
                  background: ${btnBG};
                }

                ${itemFooterSl} nav.controls .control,
                ${itemFooterSl} nav.controls .controlDot {
                  background: ${btnBG};
                }

                ${itemFooterSl} nav.controls .controlDot::after {
                  background: ${btnColor};
                }

                ${itemFooterSl} nav.controls .controlArrow {
                  color: ${btnColor};
                }



              `.replace(/\s+/g, " ");
            })
            .join(" "),
        }}
      />
    </>
  );
};

export default Style;
