import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./assets/globals.scss";
import Navbar from "./components/hero/Navbar";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import MouseGradient from "./components/MouseGradient";
import { debounce } from "lodash";
import BackgroundSVG from "./components/hero/BackgroundSVG";
import About from "./components/about";
import { useColorAnimation } from "./hooks/useColorAnimation";
import Contact from "./components/contact";
import Projects from "./components/projects";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import { ReactLenis } from "@studio-freight/react-lenis";

function App() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  const isTouchDevice = useIsTouchDevice();

  // ----- Dimension update ----- //
  const updateDimensions = useCallback(
    debounce(() => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      dimensionsRef.current = newDimensions;
      setDimensions(newDimensions);
    }, 200),
    [],
  );

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // ----- Scroll animations ----- //
  const { scrollYProgress } = useScroll();
  const backgroundGradient = useMotionValue(
    "radial-gradient(circle, #111111 0%, #000000 65%)",
  );
  const textColor = useMotionValue("#FFFFFF");
  const svgOpacity = useMotionValue(1);

  const handleScroll = useCallback(
    (latest: number) => {
      requestAnimationFrame(() => {
        // Keep everything dark - no color transitions
        const darkGradient = "radial-gradient(circle, #111111 0%, #000000 65%)";
        backgroundGradient.set(darkGradient);

        // Keep background black at all scroll positions
        document.body.style.backgroundColor = "#000000";
        document.getElementById("root")!.style.backgroundColor = "#000000";
        document.documentElement.style.backgroundColor = "#000000";

        // Keep text white
        textColor.set("#FFFFFF");
        
        // Reduce SVG opacity on scroll for visual effect
        const progress = !isMobile
          ? Math.max(0, Math.min((latest - 0.1) / 0.3, 1))
          : Math.max(0, Math.min((latest - 0.03) / 0.3, 1));
        const newOpacity = 1 - progress * 0.5; // Reduce opacity more gradually
        svgOpacity.set(newOpacity);
      });
    },
    [isMobile],
  );

  useMotionValueEvent(scrollYProgress, "change", handleScroll);

  // ----- Color Animation ----- //
  const { hue1, hue2 } = useColorAnimation();

  const landingSectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.5,
        type: "tween",
        useNativeDriver: true
      },
    },
  };

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <ReactLenis root>
      <div>
        <MouseGradient isMobile={isMobile} />
        <motion.div
          style={{ background: backgroundGradient }}
          className="w-screen overflow-hidden h-screen flex flex-col justify-center items-center "
        >
          <BackgroundSVG
            width={dimensions.width}
            height={dimensions.height}
            isMobile={isMobile}
            svgOpacity={svgOpacity}
          />
          <Navbar />
          <motion.div
            initial={initialState}
            animate="visible"
            variants={landingSectionVariants}
            className="flex justify-center items-center relative z-10 flex-col mt-8"
          >
            <motion.h1
              className="md:text-[80px] max-sm:text-[10vw] sm:text-[10vw] max-sm:max-w-sm max-sm:leading-tight text-light khula-extrabold w-[732px] text-center leading-[85px]"
              style={{
                transform: isMobile
                  ? "none"
                  : useTransform(
                      scrollYProgress,
                      [0, 0.5],
                      ["translateY(0px)", "translateY(-200px)"]
                    ),
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                textShadow: "0px 0px 6px rgba(255,255,255,0.25)",
              }}
            >
              👋Hey! I'm{" "}
              <motion.span
                style={{
                  backgroundImage: useTransform(
                    [hue1, hue2],
                    ([h1, h2]) =>
                      `linear-gradient(90deg, hsl(${h1}, 100%, 50%), hsl(${h2}, 100%, 50%))`
                  ),
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Jesus
              </motion.span>
            </motion.h1>
            <motion.p
              className="poppins-regular text-lg mt-4 max-w-[390px] text-gray-2 max-sm:text-[4vw] px-4 text-center leading-[123%]"
              style={{
                transform: isMobile
                  ? "none"
                  : useTransform(
                      scrollYProgress,
                      [0, 0.5],
                      ["translateY(0px)", "translateY(-200px)"]
                    ),
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
              }}
            >
              Computer Science student aspiring to become a professional Software Engineer.
            </motion.p>
          </motion.div>
        </motion.div>
        <div ref={aboutRef} id="about">
          <About
            isAboutInView={useInView(aboutRef, { amount: 0.3 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        <div ref={projectsRef} id="projects" className="relative">
          <Projects
            isProjectsInView={useInView(projectsRef, {
              amount: isTouchDevice ? 0.1 : 0.3,
            })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>

        <div ref={contactRef} id="contact" className="relative">
          <Contact
            isContactInView={useInView(contactRef, { amount: 0.5 })}
            isMobile={isMobile}
            backgroundGradient={backgroundGradient}
          />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
