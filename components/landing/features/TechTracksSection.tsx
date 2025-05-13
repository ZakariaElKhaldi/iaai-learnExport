import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'; // Added useScroll, useTransform
import { Button, Chip, Tooltip, Badge } from '@nextui-org/react'; // Removed Progress as it wasn't used
import { HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiArrowRight, FiFilter, FiTrendingUp, FiCheck, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Added FiChevronLeft, FiChevronRight
import { 
  SiReact, SiJavascript, SiPython, SiAwsamplify, 
  SiDocker, SiKubernetes, SiTensorflow, SiTableau
} from 'react-icons/si';

// Mock data for the tech tracks
const techStackData = [
  { 
    id: 'web', 
    name: 'Web Development', 
    icon: <SiReact />,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    activeColor: 'bg-blue-600 text-white',
    popularity: 92,
    jobGrowth: '+24%',
    category: 'frontend'
  },
  { 
    id: 'data', 
    name: 'Data Science', 
    icon: <SiPython />,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    activeColor: 'bg-purple-600 text-white',
    popularity: 87,
    jobGrowth: '+32%',
    category: 'data'
  },
  { 
    id: 'devops', 
    name: 'DevOps & Cloud', 
    icon: <SiAwsamplify />,
    color: 'bg-green-50 text-green-700 border-green-200',
    activeColor: 'bg-green-600 text-white',
    popularity: 85,
    jobGrowth: '+28%',
    category: 'infrastructure'
  },
  { 
    id: 'mobile', 
    name: 'Mobile Development', 
    icon: <SiReact />, 
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    activeColor: 'bg-orange-600 text-white',
    popularity: 80,
    jobGrowth: '+18%',
    category: 'mobile'
  },
  { 
    id: 'ai', 
    name: 'AI & Machine Learning', 
    icon: <SiTensorflow />,
    color: 'bg-red-50 text-red-700 border-red-200',
    activeColor: 'bg-red-600 text-white',
    popularity: 89,
    jobGrowth: '+41%',
    category: 'data'
  },
  { 
    id: 'cybersecurity', 
    name: 'Cybersecurity', 
    icon: <HiOutlineLightningBolt />,
    color: 'bg-slate-50 text-slate-700 border-slate-200',
    activeColor: 'bg-slate-600 text-white',
    popularity: 94,
    jobGrowth: '+35%',
    category: 'security'
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Tracks', icon: <FiFilter /> },
  { id: 'frontend', name: 'Frontend', icon: <SiReact /> },
  { id: 'data', name: 'Data & AI', icon: <SiPython /> },
  { id: 'infrastructure', name: 'Infrastructure', icon: <SiDocker /> },
  { id: 'mobile', name: 'Mobile', icon: <SiReact /> },
  { id: 'security', name: 'Security', icon: <HiOutlineLightningBolt /> },
];

// Technology courses and skills data
const courseData = {
  'web': [
    { name: 'React', icon: <SiReact />, level: 'Advanced', color: 'blue' },
    { name: 'JavaScript', icon: <SiJavascript />, level: 'Intermediate', color: 'yellow' },
    { name: 'Next.js', icon: null, level: 'Intermediate', color: 'gray' },
  ],
  'data': [
    { name: 'Python', icon: <SiPython />, level: 'Intermediate', color: 'purple' },
    { name: 'SQL', icon: null, level: 'Beginner', color: 'purple' },
    { name: 'Tableau', icon: <SiTableau />, level: 'Advanced', color: 'purple' },
  ],
  'devops': [
    { name: 'AWS', icon: <SiAwsamplify />, level: 'Advanced', color: 'green' },
    { name: 'Docker', icon: <SiDocker />, level: 'Intermediate', color: 'green' },
    { name: 'Kubernetes', icon: <SiKubernetes />, level: 'Advanced', color: 'green' },
  ],
  'mobile': [
    { name: 'React Native', icon: <SiReact />, level: 'Intermediate', color: 'orange' },
    { name: 'Swift', icon: null, level: 'Advanced', color: 'orange' },
    { name: 'Flutter', icon: null, level: 'Beginner', color: 'orange' },
  ],
  'ai': [
    { name: 'TensorFlow', icon: <SiTensorflow />, level: 'Advanced', color: 'red' },
    { name: 'PyTorch', icon: null, level: 'Intermediate', color: 'red' },
    { name: 'Scikit-learn', icon: null, level: 'Intermediate', color: 'red' },
  ],
  'cybersecurity': [
    { name: 'Ethical Hacking', icon: null, level: 'Advanced', color: 'slate' },
    { name: 'Network Security', icon: null, level: 'Intermediate', color: 'slate' },
    { name: 'Cryptography', icon: null, level: 'Advanced', color: 'slate' },
  ],
};

// Features badges data
const featuresBadges = [
  { id: 1, text: 'Personalized Learning Paths', color: 'bg-violet-100 text-violet-700', icon: <HiOutlineAcademicCap /> },
  { id: 2, text: 'Interactive Exercises', color: 'bg-green-100 text-green-700', icon: <HiOutlineLightningBolt /> },
  { id: 3, text: 'Expert-Led Sessions', color: 'bg-fuchsia-100 text-fuchsia-700', icon: <HiOutlineSparkles /> },
  { id: 4, text: 'Industry Projects', color: 'bg-amber-100 text-amber-700', icon: <FiTrendingUp /> },
  { id: 5, text: 'Career Coaching', color: 'bg-sky-100 text-sky-700', icon: <FiCheck /> },
  { id: 6, text: 'Real-world Datasets', color: 'bg-teal-100 text-teal-700', icon: <SiTableau /> }, // Added one more for better carousel demo
];


const TechTracksSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleTechsCount, setVisibleTechsCount] = useState(3);

  const filteredTechStacks = activeCategory === 'all' 
    ? techStackData 
    : techStackData.filter(tech => tech.category === activeCategory);

  useEffect(() => {
    setSelectedTech(null);
    setIsExpanded(false);
    setVisibleTechsCount(Math.min(3, filteredTechStacks.length));
  }, [activeCategory, filteredTechStacks.length]);

  const handleViewMore = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    setVisibleTechsCount(newExpandedState ? filteredTechStacks.length : Math.min(3, filteredTechStacks.length));
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // --- Carousel Logic ---
  const carouselScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // Assume can scroll right initially

  const { scrollXProgress } = useScroll({ container: carouselScrollRef });
  // const scrollProgressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]); // Alternative way to set width

  const checkCarouselScrollability = () => {
    const el = carouselScrollRef.current;
    if (el) {
      const currentScrollLeft = el.scrollLeft;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(currentScrollLeft > 5); // Add a small threshold
      setCanScrollRight(currentScrollLeft < maxScrollLeft - 5); // Add a small threshold
    }
  };

  useEffect(() => {
    const el = carouselScrollRef.current;
    if (el) {
      checkCarouselScrollability(); // Initial check
      el.addEventListener('scroll', checkCarouselScrollability); // Listen to scroll events on the element itself
      window.addEventListener('resize', checkCarouselScrollability);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkCarouselScrollability);
        window.removeEventListener('resize', checkCarouselScrollability);
      }
    };
  }, [featuresBadges]); // Re-check if featuresBadges change (e.g., if items are dynamic)


  const scrollCarousel = (direction) => {
    const el = carouselScrollRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.6; // Scroll by 60% of visible width
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      // checkCarouselScrollability will be called by the 'scroll' event listener on el
    }
  };
  // --- End Carousel Logic ---


  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "circOut" }}
      className="bg-gradient-to-b from-white to-gray-50/70 rounded-3xl p-6 sm:p-8 pt-10 pb-16 mb-24 relative overflow-hidden border border-gray-100 shadow-2xl shadow-slate-200/70"
      aria-labelledby="tech-tracks-heading"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-gradient-to-tl from-pink-500/5 to-fuchsia-500/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200/70 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "circOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium mb-4 shadow-lg shadow-violet-500/30"
          >
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
            <span>Market-Leading Skills</span>
          </motion.div>
          <h2 
            id="tech-tracks-heading" 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600"
          >
            Master In-Demand Technologies
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our career-accelerating platform focuses on the most sought-after skills in today's tech industry. 
            Join over 100,000 professionals who've transformed their careers.
          </p>
        </motion.div>

        {/* Technology Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "circOut" }}
          className="mb-12" 
          role="group" 
          aria-labelledby="filter-heading"
        >
          <div className="flex flex-col items-center">
            <h3 id="filter-heading" className="text-sm font-medium text-gray-700 text-center mb-4"> 
              <span className="inline-flex items-center bg-gray-100/80 px-3 py-1.5 rounded-full border border-gray-200/80">
                <FiFilter className="mr-1.5 text-gray-500" />
                Filter Technology Tracks
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 max-w-4xl mx-auto p-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full flex items-center transition-all duration-250 ease-out text-sm font-medium group ${activeCategory === category.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-white text-gray-700 border border-gray-200/90 hover:border-indigo-400/70 hover:text-indigo-700 hover:shadow-md hover:shadow-indigo-500/10'}`}
                  aria-pressed={activeCategory === category.id}
                >
                  <span className={`mr-1.5 transition-colors duration-250 ${activeCategory === category.id ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600'}`}>{category.icon}</span>
                  {category.name}
                  {activeCategory === category.id && ( <motion.span layoutId="activeTrackPill" className="ml-2 w-1.5 h-1.5 bg-white rounded-full" transition={{ type: "spring", stiffness: 500, damping: 30 }} /> )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Metrics and Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "circOut" }}
          className="relative max-w-4xl mx-auto mb-16 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" aria-hidden="true" />
          <div className="absolute right-0 top-0 -mt-6 -mr-20 w-40 h-40 bg-indigo-600/15 rounded-full blur-3xl" aria-hidden="true" />
          <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            LearnExpert Platform Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[ { value: "100K+", label: "Active Learners" }, { value: "94%", label: "Completion Rate" }, { value: "87%", label: "Career Advancement" }, { value: "+45%", label: "Avg. Salary Hike" } ].map(stat => ( <div key={stat.label}> <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">{stat.value}</p> <p className="text-xs sm:text-sm text-gray-300/90 mt-1">{stat.label}</p> </div> ))}
          </div>
          <div className="mt-8 flex justify-center"> <Badge color="primary" variant="flat" className="px-3 py-1.5 text-xs bg-white/10 text-indigo-300 border border-indigo-400/30"> Data verified - Updated May 2025 </Badge> </div>
        </motion.div>

        {/* --- Platform Features Carousel - ENHANCED --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "circOut" }}
          className="max-w-5xl mx-auto mb-16" // Increased max-width for better spread
        >
          <div className="relative group">
            {/* Scrollable Content with Framer Motion Drag */}
            <motion.div 
              ref={carouselScrollRef}
              className="flex overflow-x-auto space-x-4 sm:space-x-5 pb-4 px-1 scrollbar-hide cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.05} // Reduced elasticity for a tighter feel
              onPanEnd={checkCarouselScrollability} // Check scrollability after drag ends
              // onScroll is handled by the useEffect listener now
            >
              {featuresBadges.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  // Optional: Add individual item entrance if desired, or rely on parent section animation
                  // initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  // animate={{ opacity: 1, y: 0, scale: 1 }}
                  // transition={{ delay: 0.1 + index * 0.05, duration: 0.3, ease: "circOut" }}
                  className={`${feature.color} rounded-xl shadow-lg border border-white/20 p-4 flex flex-col items-center min-w-[170px] sm:min-w-[190px] backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}
                >
                  <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center mb-3 shadow-inner">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <p className="font-medium text-sm text-center leading-snug">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Left Arrow Button */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, scale:0.8, x: -5 }}
                  animate={{ opacity: 1, scale:1, x: 0 }}
                  exit={{ opacity: 0, scale:0.8, x: -5 }}
                  transition={{ duration: 0.2, ease:"easeOut" }}
                  onClick={() => scrollCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-indigo-600 transition-all duration-200 -ml-2 sm:-ml-3 opacity-0 group-hover:opacity-100 md:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  aria-label="Scroll left"
                  style={{ touchAction: 'manipulation' }}
                >
                  <FiChevronLeft size={22} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Right Arrow Button */}
            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, scale:0.8, x: 5 }}
                  animate={{ opacity: 1, scale:1, x: 0 }}
                  exit={{ opacity: 0, scale:0.8, x: 5 }}
                  transition={{ duration: 0.2, ease:"easeOut" }}
                  onClick={() => scrollCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-indigo-600 transition-all duration-200 -mr-2 sm:-mr-3 opacity-0 group-hover:opacity-100 md:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  aria-label="Scroll right"
                  style={{ touchAction: 'manipulation' }}
                >
                  <FiChevronRight size={22} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Gradient Fades for Edge Indication */}
            <div 
              className={`absolute inset-y-0 left-0 w-10 sm:w-12 bg-gradient-to-r from-gray-50/80 via-gray-50/50 to-transparent pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            />
            <div 
              className={`absolute inset-y-0 right-0 w-10 sm:w-12 bg-gradient-to-l from-gray-50/80 via-gray-50/50 to-transparent pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            />
          </div>
            
          {/* Scroll Progress Bar */}
          {featuresBadges.length > Math.floor( (carouselScrollRef.current?.clientWidth || 500) / 200) && ( // Show only if there are more items than can fit (approx)
            <div className="mt-4 h-1.5 max-w-[180px] mx-auto bg-gray-200/80 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ scaleX: scrollXProgress }} 
                    transformOrigin="left" // Ensure scaling happens from the left
                />
            </div>
          )}
        </motion.div>
        {/* --- END Platform Features Carousel --- */}


        {/* Technology cards grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredTechStacks.slice(0, visibleTechsCount).map((tech, i) => {
              const activeBgClass = tech.activeColor.split(' ').find(c => c.startsWith('bg-')) || 'bg-indigo-600';
              const iconContainerBaseColor = tech.color.split(' ').find(c => c.startsWith('bg-')) || 'bg-gray-50';
              const iconContainerTextColor = tech.color.split(' ').find(c => c.startsWith('text-')) || 'text-gray-700';
              const selectedRingColor = tech.activeColor.includes('blue') ? 'ring-blue-500/70' : tech.activeColor.includes('purple') ? 'ring-purple-500/70' : tech.activeColor.includes('green') ? 'ring-green-500/70' : tech.activeColor.includes('orange') ? 'ring-orange-500/70' : tech.activeColor.includes('red') ? 'ring-red-500/70' : tech.activeColor.includes('slate') ? 'ring-slate-500/70' : 'ring-indigo-500/70';

              return (
                <motion.div
                  key={tech.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: "circOut" } }}
                  layout
                  className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200/70 transition-all duration-300 ease-out cursor-pointer ${selectedTech === tech.id ? `ring-3 ring-offset-1 ${selectedRingColor} shadow-lg ${selectedRingColor.replace('ring-','shadow-').replace('/70','/30')}` : 'hover:border-gray-300'}`}
                  onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                >
                  <div className="relative h-1.5 w-full bg-gray-200/70">
                    <motion.div className={`absolute top-0 left-0 h-full ${activeBgClass} rounded-r-full`} initial={{ width: 0 }} animate={{ width: `${tech.popularity}%` }} transition={{ duration: 0.8, ease: "circOut", delay: 0.3 + i * 0.05 }} />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`relative w-12 h-12 rounded-lg ${iconContainerBaseColor} ${iconContainerTextColor} flex items-center justify-center text-2xl mr-3 sm:mr-4 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-md shadow-sm border ${tech.color.split(' ').find(c => c.startsWith('border-')) || 'border-transparent'}`}>
                          <span className="relative z-10">{tech.icon}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">{tech.name}</h3>
                      </div>
                      <Tooltip content={`${tech.popularity}% Industry Demand. Job Growth: ${tech.jobGrowth}`} placement="top" delay={0} closeDelay={0} motionProps={{ variants: { exit: { opacity: 0, scale: 0.95 }, enter: { opacity: 1, scale: 1 }, }, }}>
                        <Badge variant="flat" className={`px-2.5 py-1 text-xs border ${activeBgClass.replace('bg-', 'border-').replace('-600','-300')} ${activeBgClass.replace('bg-', 'bg-').replace('-600','-50')} ${activeBgClass.replace('bg-', 'text-').replace('-600','-700')}`}> <FiTrendingUp className="mr-1" /> Popular </Badge>
                      </Tooltip>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-4"> <FiClock className="mr-1.5" /> <span>12-16 weeks • Beginner to Advanced</span> </div>
                    <AnimatePresence initial={false}>
                      {selectedTech === tech.id && ( <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3, ease: "circOut" }} className="text-gray-600 text-sm overflow-hidden"> Our comprehensive {tech.name} track covers fundamentals to advanced concepts, preparing you for real-world projects and valuable certifications. </motion.div> )}
                    </AnimatePresence>
                    <div className={`space-y-2.5 mb-5 transition-all duration-300 ${selectedTech === tech.id ? 'mt-4' : 'mt-1'}`}>
                      {courseData[tech.id].slice(0, selectedTech === tech.id ? courseData[tech.id].length : 2).map((course, idx) => (
                        <motion.div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50/70 transition-colors" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (selectedTech === tech.id ? 0.1 : 0) + idx * 0.05, duration: 0.3 }}>
                          <div className="flex items-center"> {course.icon ? ( <span className={`mr-2 text-lg text-${course.color}-500`}>{course.icon}</span> ) : ( <span className={`w-2 h-2 rounded-full bg-${course.color}-500 mr-2.5 flex-shrink-0`}></span> )} <span className="text-sm font-medium text-gray-700">{course.name}</span> </div>
                          <Badge color={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'danger'} variant="flat" size="sm" className="text-xs"> {course.level} </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <div className={`mt-5 pt-4 border-t border-gray-200/80 transition-opacity duration-300 ${selectedTech === tech.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <Button fullWidth className={`rounded-lg shadow-md font-semibold transition-all duration-300 ease-out ${selectedTech === tech.id ? `${activeBgClass} text-white hover:opacity-90 transform hover:scale-[1.02]` : `bg-gray-100 text-gray-700 hover:bg-gray-200/70 hover:text-gray-800`}`} endContent={<FiArrowRight className={`transition-transform duration-200 ${selectedTech === tech.id ? 'transform group-hover:translate-x-1' : ''}`}/>} size="md"> {selectedTech === tech.id ? 'Start Learning Path' : 'Explore Track'} </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More / Show Less Button */}
        {filteredTechStacks.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y:10 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "circOut" }}
            className="text-center mt-10 sm:mt-12"
          >
            <Button
              color="default"
              variant="bordered"
              className="font-medium px-6 py-2.5 text-sm text-indigo-700 border-indigo-300 hover:bg-indigo-50/70 hover:border-indigo-400 transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
              onClick={handleViewMore}
              endContent={ <motion.span key={isExpanded ? 'up' : 'down'} initial={{ opacity:0, y: isExpanded ? 5: -5 }} animate={{ opacity:1, y:0 }} className="inline-flex items-center ml-1.5"> {isExpanded ? '↑' : '↓'} </motion.span> }
            >
              {isExpanded ? 'Show Fewer Tracks' : `View All ${filteredTechStacks.length} Tracks`}
            </Button>
          </motion.div>
        )}

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "circOut" }}
          className="text-center mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
              <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/15 rounded-full blur-lg"></div>
              <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white/15 rounded-full blur-lg"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Accelerate Your Tech Career?</h3>
              <p className="text-indigo-100 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Transform your skills with our specialized learning paths. Get started today with a personalized assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="lg"> Start Free Assessment </Button>
                <Button className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 font-bold px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105" size="lg" variant="bordered"> Explore Curriculum </Button>
              </div>
              <div className="mt-6 text-indigo-200 text-xs sm:text-sm"> No credit card required • 7-day free trial • Cancel anytime </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechTracksSection;