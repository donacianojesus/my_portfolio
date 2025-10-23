import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import Magnetic from "./Magnetic";

type ResumeProps = {
  isMobile: boolean;
  custom?: number;
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

const Resume: React.FC<ResumeProps> = ({ isMobile, custom = 0 }) => {
  const handleDownload = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/resume/Jesus_Donaciano_Resume.pdf';
    link.download = 'Jesus_Donaciano_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    // Open resume in a new tab for viewing
    window.open('/resume/Jesus_Donaciano_Resume.pdf', '_blank');
  };

  return (
    <motion.div
      variants={fadeInUpVariants}
      custom={custom}
      className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row gap-6'} items-center`}
    >
      <Magnetic>
        <button
          onClick={handleView}
          className="flex bg-transparent border-2 border-light rounded-full text-light pl-4 pr-6 gap-x-2 py-3 w-max poppins-regular select-none hover:bg-light hover:text-dark transition-colors duration-300"
        >
          <ExternalLink size={20} />
          View Resume
        </button>
      </Magnetic>
      
      <Magnetic>
        <button
          onClick={handleDownload}
          className="flex bg-light rounded-full text-dark pl-4 pr-6 gap-x-2 py-3 w-max poppins-regular select-none hover:bg-gray-1 transition-colors duration-300"
        >
          <Download size={20} />
          Download Resume
        </button>
      </Magnetic>
    </motion.div>
  );
};

export default Resume;