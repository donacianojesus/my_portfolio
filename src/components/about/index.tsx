import { MotionValue, useAnimationControls, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "../Magnetic";
import { useLenis } from "@studio-freight/react-lenis";

type AboutSectionProps = {
  isAboutInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.2,
      type: "tween",
      useNativeDriver: true
    },
  }),
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      type: "tween",
      useNativeDriver: true
    },
  },
};

const About: React.FC<AboutSectionProps> = ({
  isAboutInView,
  isMobile,
  backgroundGradient,
}) => {
  const aboutControls = useAnimationControls();

  const [hasAnimated, setHasAnimated] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    if (isAboutInView && !hasAnimated) {
      aboutControls.start("visible");
      setHasAnimated(true);
    } else if (!isAboutInView && hasAnimated) {
      aboutControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isAboutInView, aboutControls, hasAnimated, setHasAnimated]);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-screen min-h-screen overflow-hidden flex justify-center items-center relative z-10"
    >
      <motion.div
        initial={initialState}
        animate={aboutControls}
        className="max-w-[1000px] px-4 py-8"
      >
        <motion.h1
          variants={fadeInUpVariants}
          custom={0}
          className={`khula-semibold text-light ${isMobile ? "text-4xl" : "text-6xl"}`}
        >
          I am a fourth-year, first-generation Computer Science student at The University of Scranton with a passion for software engineering and technology. 
          I create user-centered, high-quality solutions by combining classroom knowledge with practical experience and strive to turn innovative ideas into impactful software.
        </motion.h1>
        <motion.h1
          variants={fadeInUpVariants}
          custom={0}
          className={`khula-semibold ${isMobile ? "text-4xl" : "text-6xl"}`}
        >
        </motion.h1>

        <motion.div
          variants={fadeInUpVariants}
          custom={1}
          className={`mt-[10vh] ${isMobile && "mt-8"}`}
        >
          <p className="text-gray-1 poppins-light-italic ml-2 mb-1 select-none">
            This is me.
          </p>
          <motion.hr
            variants={lineVariants}
            className="bg-gray-1 origin-left w-full"
          ></motion.hr>
        </motion.div>
        <div
          className={`flex justify-between flex-row mt-16 ${
            isMobile && "mt-8 flex-col"
          }`}
        >
          <div className="flex flex-col w-1/2">
            <motion.h2
              variants={fadeInUpVariants}
              custom={2}
              className="khula-light text-5xl text-nowrap text-light"
            >
              Hi, I'm Jesus.
            </motion.h2>
            {!isMobile && (
              <div className="flex flex-col gap-4 mt-24">
                <Magnetic>
                  <motion.button
                    variants={fadeInUpVariants}
                    custom={3}
                    onClick={() => lenis?.scrollTo("#contact")}
                    className="flex bg-dark rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max poppins-regular select-none"
                  >
                    <ArrowUpRight />
                    Get in Touch
                  </motion.button>
                </Magnetic>
                <Magnetic>
                  <motion.button
                    variants={fadeInUpVariants}
                    custom={4}
                    onClick={() => window.open('/resume/Jesus_Donaciano_Resume.pdf', '_blank')}
                    className="flex bg-transparent border-2 border-light rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max poppins-regular select-none hover:bg-light hover:text-dark transition-colors duration-300"
                  >
                    <ArrowUpRight />
                    View Resume
                  </motion.button>
                </Magnetic>
              </div>
            )}
          </div>
          <div
            className={`flex flex-col gap-y-4 w-1/2 khula-light text-2xl text-light ${
              isMobile && "mt-8 text-lg w-full mb-16"
            }`}
          >
            <motion.p variants={fadeInUpVariants} custom={4}>
              My passion for technology began at a very young age when my parents bought me my first laptop. 
              I loved exploring it. I began by creating simple Blender renders, experimenting with video editing software, and dabbling in small coding projects. 
              Combined with a childhood love for Legos and building things, I realized I wanted to merge my creativity with computers. This early curiosity ultimately led me to pursue a career in software engineering, where I continue to build and create through code.
            </motion.p>
            <motion.p variants={fadeInUpVariants} custom={5}>
              Beyond programming, I have a deep passion for music. I love discovering new artists and playing guitar, piano, and a bit of drums. 
              I’m a big fan of The Beatles and love exploring different genres. 
              I also enjoy coffee (especially iced coffee) and in my free time, I like to unwind with PC games such as VALORANT, Overwatch, and Fortnite.
            </motion.p>
          </div>
          {isMobile && (
            <div className="flex flex-col gap-4 mt-8">
              <motion.button
                variants={fadeInUpVariants}
                custom={3}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView()
                }
                className="flex bg-dark rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max h-fit poppins-regular select-none"
              >
                <ArrowUpRight />
                Get in Touch
              </motion.button>
              <motion.button
                variants={fadeInUpVariants}
                custom={4}
                onClick={() => window.open('/resume/Jesus_Donaciano_Resume.pdf', '_blank')}
                className="flex bg-transparent border-2 border-light rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max h-fit poppins-regular select-none hover:bg-light hover:text-dark transition-colors duration-300"
              >
                <ArrowUpRight />
                View Resume
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
