// Made partially with clade code
import "./carousel.scss"
import {useState, useEffect, useRef} from "react";
import { Maximize2, X} from "lucide-react";
import { createPortal } from "react-dom";

type ImageCarouselProps = {
    images: { src: string, alt: string, caption?: string }[],
    noRecursion?: boolean,
    initialIndex?: number,
};

// A singleton DOM node that lives directly on <body>, outside all Radix portals.
// Radix's Dialog applies CSS transforms during animation which create a stacking
// context — trapping any children even if they have z-index: 99999.
// By mounting onto a node we append ourselves (after all Radix nodes), we escape
// that stacking context entirely.
function getFullscreenRoot(): HTMLElement {
    let el = document.getElementById("carousel-fullscreen-root");
    if (!el) {
        el = document.createElement("div");
        el.id = "carousel-fullscreen-root";
        document.body.appendChild(el);
    }
    return el;
}

//Revamped from https://www.w3schools.com/howto/howto_js_slideshow.asp
function ImageCarousel({images, noRecursion, initialIndex}: ImageCarouselProps) {
    const [slideIndex, setSlideIndex] = useState(initialIndex ?? 0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const fullscreenRoot = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Lazily grab/create the portal root the first time we might need it.
        fullscreenRoot.current = getFullscreenRoot();
    }, []);

    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isFullScreen]);

    // Next/previous controls
    function plusSlides(n: number, e?: React.MouseEvent) {
        if (e) e.stopPropagation();
        let newIndex = slideIndex + n;
        if (newIndex >= images.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setSlideIndex(newIndex);
    }

    // Thumbnail image controls
    function currentSlide(n: number, e?: React.MouseEvent) {
        if (e) e.stopPropagation();
        setSlideIndex(n);
    }

    const toggleFullScreen = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsFullScreen(prev => !prev);
    };

    const portalRoot = fullscreenRoot.current ?? (typeof document !== "undefined" ? getFullscreenRoot() : null);

    return (
        <>
            <div className="slideshow-container w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`mySlides fade ${index === slideIndex ? "block" : "hidden"}`}
                        style={{display: index === slideIndex ? "block" : "none"}}
                    >
                        <div className="numbertext">
                            {index + 1} / {images.length}
                        </div>
                        <div className="image-wrapper" onClick={(e) => e.stopPropagation()}>
                            <img src={image.src} alt={image.alt} className={"object-cover my-0 mx-auto"}/>
                            {!noRecursion && (
                                <div className="overlay" onClick={toggleFullScreen}>
                                    <Maximize2 className="expand-icon" size={32} />
                                </div>
                            )}
                        </div>
                        <div className="text">{image.caption || ""}</div>
                    </div>
                ))}
                {images.length > 1 && (
                    <>
                        <a className="prev" onClick={(e) => plusSlides(-1, e)}>
                            &#10094;
                        </a>
                        <a className="next" onClick={(e) => plusSlides(1, e)}>
                            &#10095;
                        </a>
                    </>
                )}
            </div>
            <div
                className={`dots-container ${noRecursion ? "fullscreen-dots" : ""}`}
                style={{textAlign: "center"}}
                onClick={(e) => e.stopPropagation()}
            >
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === slideIndex ? "active" : ""}`}
                        onClick={(e) => currentSlide(index, e)}
                    ></span>
                ))}
            </div>

            {isFullScreen && !noRecursion && portalRoot && createPortal(
                <div className="fullscreen-overlay" onClick={toggleFullScreen}>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-fullscreen"
                            onClick={toggleFullScreen}
                            aria-label="Close fullscreen"
                        >
                            <X size={32} />
                        </button>
                        <ImageCarousel
                            images={images}
                            noRecursion={true}
                            initialIndex={slideIndex}
                        />
                    </div>
                </div>,
                portalRoot
            )}
        </>
    );
}

export default ImageCarousel;