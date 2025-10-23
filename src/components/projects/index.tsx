import React, { useEffect, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import Curve from "./Curve";
import Overlay from "./Overlay";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

type ProjectsSectionProps = {
  isProjectsInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

export type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageDetail: string;
  description: string;
  technologies: { frontend: string; backend: string };
  color: string;
  link: string;
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
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.4,
      ease: "easeIn",
      type: "tween",
      useNativeDriver: true
    },
  },
};

const Projects: React.FC<ProjectsSectionProps> = ({
  isProjectsInView,
  isMobile,
  backgroundGradient,
}) => {
  const itemsRef = useRef<HTMLDivElement>(null);

  const isTouchDevice = useIsTouchDevice();

  const projectsControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);

  const projects: Project[] = [
    {
      number: "01",
      title: "Syllabus to Calendar",
      category: "Full Stack Web App (AI Integration)",
      year: "2025",
      image: "./img/syllabus-calendar/preview.jpg",
      imageDetail: "./img/syllabus-calendar/detail.jpg",
      description:
        "A web application that converts course syllabi into interactive calendars for tracking assignments, readings, and exams. Features an intelligent syllabus parser powered by GPT-4o with regex fallback for reliable data extraction, and a responsive React interface for event management.",
      color: "34, 197, 94",
      technologies: {
        frontend: "React, TypeScript, Tailwind CSS",
        backend: "Node.js, Express, GPT-4o API",
      },
      link: "https://syllabus-to-calendar-kappa.vercel.app",
    },
    {
      number: "02",
      title: "Cloud Storage Uploader",
      category: "Full Stack Development",
      year: "2025",
      image: "./img/cloud-storage/preview.jpg",
      imageDetail: "./img/cloud-storage/detail.jpg",
      description:
        "A secure, production-ready file upload platform with JWT authentication and role-based access control. Includes drag-and-drop uploads in React, RESTful APIs built with Spring Boot, and scalable cloud storage via AWS S3, all containerized and deployed with Docker on AWS.",
      technologies: {
        frontend: "React.js, Tailwind CSS",
        backend: "Spring Boot, PostgreSQL, AWS S3, Docker",
      },
      color: "59, 130, 246",
      link: "https://github.com/donacianojesus/Cloud-Storage-Uploader",
    },
    {
      number: "03",
      title: "Weblog Blog Platform",
      category: "Backend / Full Stack Development",
      year: "2024",
      image: "./img/weblog/preview.jpg",
      imageDetail: "./img/weblog/detail.jpg",
      description:
        "A CRUD-based blogging platform featuring secure authentication with BCrypt and modular layered architecture for scalability and maintainability. Built using Java and PostgreSQL, containerized with Docker Compose for seamless deployment and testing.",
      technologies: {
        frontend: "CLI-based interface",
        backend: "Java, PostgreSQL, JDBC, BCrypt, Docker",
      },
      color: "245, 158, 11",
      link: "https://github.com/donacianojesus/WeBlog",
    },
    {
      number: "04",
      title: "Jesus Donaciano – Portfolio Website",
      category: "Frontend Development / Personal Project",
      year: "2025",
      image: "./img/portfolio/preview.jpg",
      imageDetail: "./img/portfolio/detail.jpg",
      description:
        "My modern, responsive portfolio website built with React, TypeScript, and cutting-edge web technologies. It features smooth animations, elegant design, and an immersive user experience to showcase my projects and skills, optimized for performance and accessibility.",
      technologies: {
        frontend: "React, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Spring",
        backend: "Static Site",
      },
      color: "139, 92, 246",
      link: "https://github.com/donacianojesus/my-portfolio",
    },
  ];

  useEffect(() => {
    if (isProjectsInView && !hasAnimated) {
      projectsControls.start("visible");
      setTimeout(() => {
        setHasAnimated(true);
      }, 500);
    } else if (!isProjectsInView && hasAnimated) {
      projectsControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isProjectsInView, projectsControls, hasAnimated, setHasAnimated]);

  // ----- Overlay ----- //

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setIsOverlayVisible(false);
    }, 800);
  };

  const lenis = useLenis();

  useEffect(() => {
    if (isOverlayVisible) {
      lenis?.stop();
      document.documentElement.style.overflowY = "hidden";
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      lenis?.start();
      document.documentElement.style.overflowY = "auto";
    }
  }, [isOverlayVisible]);

  // ----- Image Preloading ----- //

  useEffect(() => {
    projects.map((project: Project) => {
      const img = new Image();
      img.src = project.image;

      const img2 = new Image();
      img2.src = project.imageDetail;
    });
  }, []);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{
        background: backgroundGradient,
        zIndex: isOverlayVisible ? 20 : 10,
      }}
      initial={initialState}
      animate={projectsControls}
      className="w-screen min-h-screen flex justify-center flex-col items-center relative z-10"
    >
      {isTouchDevice || (!isTouchDevice && isMobile) ? (
        <motion.div>
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl tracking-[calc(3rem * 0.02)] text-center mb-10 text-light"
          >
            Selected Projects
          </motion.h2>

          {/* Mobile Version: Card like design */}
          <div className="grid grid-cols-2 grid-flow-row max-sm:grid-cols-1 gap-6 gap-y-32 px-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                className="w-80 max-sm:w-[80vw] flex flex-col gap-y-4 items-center"
                variants={fadeInUpVariants}
                onClick={() => handleProjectClick(project)}
                custom={index + 1}
              >
                <div
                  key={project.number}
                  className="w-80 aspect-[77/44] max-sm:w-[80vw] bg-cover bg-center rounded-xl"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <h1 className="khula-regular text-4xl mt-8 text-light">{project.title}</h1>
                <hr />
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="poppins-extralight text-lg text-light">
                    {project.category}
                  </p>
                  <p className="poppins-extralight text-lg text-light">{project.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate={projectsControls}
          className="max-w-[1000px] w-full flex justify-center flex-col items-center px-4"
        >
          <motion.h2
            custom={0}
            variants={fadeInUpVariants}
            className="poppins-light text-3xl tracking-[calc(3rem * 0.02)] mb-10 text-light"
          >
            Selected Projects
          </motion.h2>

          <div
            ref={itemsRef}
            className="flex justify-center items-center flex-col w-full"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                className="flex flex-col w-full group project-item cursor-pointer"
                style={{ willChange: "transform, opacity" }}
                onClick={() => handleProjectClick(project)}
                variants={fadeInUpVariants}
                custom={index + 1}
              >
                <div className="w-full flex justify-between items-center h-[200px]">
                  <div className="flex justify-start items-start h-fit gap-x-4">
                    <p className="poppins-extralight text-2xl leading-none text-gray-1 group-hover:text-light transition-colors">
                      {project.number}
                    </p>
                    <h1 className="khula-regular text-6xl tracking-[calc(3.75rem * 0.03)] text-light group-hover:text-gray-1 transition-all group-hover:ml-2">
                      {project.title}
                    </h1>
                  </div>
                  <p className="poppins-extralight text-lg pr-2 text-gray-1 group-hover:text-light group-hover:pr-4 transition-all">
                    {project.category}
                  </p>
                </div>
                <hr className="w-full border-gray-2 group-hover:border-gray-1 transition-colors"></hr>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {(isOverlayVisible || selectedProject) && (
          <>
            <Curve isVisible={isOverlayVisible} />
            <motion.div
              className="fixed inset-0 w-full z-[999] flex items-center justify-center"
              style={{ pointerEvents: isContentVisible ? "auto" : "none" }}
              initial="hidden"
              animate={isOverlayVisible ? "visible" : "exit"}
              exit="exit"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {isContentVisible && selectedProject && (
                  <Overlay project={selectedProject} isMobile={isMobile} />
                )}
              </AnimatePresence>
            </motion.div>
            {isContentVisible && (
              <button
                onClick={closeOverlay}
                className="fixed z-[9999] top-6 right-6 px-4 py-2 text-light text-xl poppins-regular flex flex-row gap-x-2 items-center"
              >
                <X size={32} />
              </button>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
