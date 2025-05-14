"use client";
import React, { useState, useMemo, useCallback } from "react";
// Assuming CourseCard is in this path
// import CourseCard from "@/components/courses/CourseCard"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookOpen, Filter, Search, TrendingUp, Sparkles, Clock, Star, Users } from "lucide-react";

// --- Basic CourseCard Component (for demonstration) ---
// In a real app, this would be in its own file: @/components/courses/CourseCard.tsx
interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: { name: string; avatar?: string };
  duration: string;
  lessonCount: number;
  level: 'beginner' | 'intermediate' | 'advanced' | string; // Allow string for flexibility
  rating?: number;
  ratingCount?: number;
  enrollmentCount?: number;
  price?: number;
  category?: string;
  tags?: string[];
  isFree?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id, title, description, imageUrl, instructor, duration, lessonCount, level, rating, enrollmentCount, price
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <img src={imageUrl || `https://via.placeholder.com/300x180.png/E0E0E0/B0B0B0?text=Course+Image`} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mb-2">By {instructor.name}</p>
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
          <span><Clock size={14} className="inline mr-1" />{duration}</span>
          <span><BookOpen size={14} className="inline mr-1" />{lessonCount} lessons</span>
        </div>
        <Badge variant="outline" className="capitalize mb-2 self-start">{level}</Badge>
        
        <div className="mt-auto pt-2">
          <div className="flex justify-between items-center mb-2">
            {rating && (
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
            {enrollmentCount && <span className="text-xs text-gray-500">{enrollmentCount.toLocaleString()} enrolled</span>}
          </div>
          <div className="text-lg font-bold">
            {price === 0 ? "Free" : price ? `$${price.toFixed(2)}` : "N/A"}
          </div>
          {/* <Button variant="default" size="sm" className="w-full mt-2">View Course</Button> */}
        </div>
      </div>
    </div>
  );
};
// --- End of Basic CourseCard Component ---


// Sample course data (remains the same as provided)
const sampleCourses = [
  {
    id: "1",
    title: "Introduction to AI and Machine Learning",
    description: "Learn the basics of artificial intelligence and machine learning concepts with practical examples.",
    duration: "8 hours",
    lessons: 12,
    level: "Beginner",
    instructor: "Dr. Sarah Jensen",
    instructorAvatar: "/assets/avatars/instructor-1.jpg", // Placeholder
    image: `https://picsum.photos/seed/ai/600/360`,
    price: 49.99,
    rating: 4.8,
    ratingCount: 234,
    category: "AI",
    tags: ["machine learning", "ai", "python"],
    enrolled: 1420,
    lastUpdated: "2023-11-15",
    trending: true,
    featured: true
  },
  {
    id: "2",
    title: "Advanced React Development",
    description: "Master advanced React patterns and build complex user interfaces with modern techniques.",
    duration: "10 hours",
    lessons: 15,
    level: "Advanced",
    instructor: "Michael Thompson",
    instructorAvatar: "/assets/avatars/instructor-2.jpg",
    image: `https://picsum.photos/seed/react/600/360`,
    price: 79.99,
    rating: 4.9,
    ratingCount: 182,
    category: "Web Development",
    tags: ["react", "javascript", "frontend"],
    enrolled: 980,
    lastUpdated: "2023-12-01",
    trending: true,
    featured: true
  },
  {
    id: "3",
    title: "Cloud Architecture with AWS",
    description: "Design scalable and resilient applications using AWS services and best practices.",
    duration: "12 hours",
    lessons: 18,
    level: "Intermediate",
    instructor: "James Wilson",
    instructorAvatar: "/assets/avatars/instructor-3.jpg",
    image: `https://picsum.photos/seed/aws/600/360`,
    price: 69.99,
    rating: 4.7,
    ratingCount: 156,
    category: "Cloud Computing",
    tags: ["aws", "cloud", "serverless"],
    enrolled: 754,
    lastUpdated: "2023-10-20",
    featured: true
  },
  {
    id: "4",
    title: "Data Analysis with Python",
    description: "Learn to analyze and visualize data using Python libraries like Pandas, NumPy and Matplotlib.",
    duration: "9 hours",
    lessons: 14,
    level: "Intermediate",
    instructor: "Lisa Rodriguez",
    instructorAvatar: "/assets/avatars/instructor-4.jpg",
    image: `https://picsum.photos/seed/python_data/600/360`,
    price: 59.99,
    rating: 4.6,
    ratingCount: 210,
    category: "Data Science",
    tags: ["python", "data analysis", "pandas"],
    enrolled: 1290,
    lastUpdated: "2023-11-05",
    trending: true
  },
  {
    id: "5",
    title: "Cybersecurity Fundamentals",
    description: "Understand the basics of cybersecurity, common threats, and protective measures for digital assets.",
    duration: "7 hours",
    lessons: 10,
    level: "Beginner",
    instructor: "Robert Chen",
    instructorAvatar: "/assets/avatars/instructor-5.jpg",
    image: `https://picsum.photos/seed/cybersec/600/360`,
    price: 54.99,
    rating: 4.5,
    ratingCount: 178,
    category: "Security",
    tags: ["cybersecurity", "network security", "ethical hacking"],
    enrolled: 875,
    lastUpdated: "2023-09-15"
  },
  {
    id: "6",
    title: "Full Stack Development with MERN",
    description: "Build end-to-end applications using MongoDB, Express, React, and Node.js with modern patterns.",
    duration: "15 hours",
    lessons: 22,
    level: "Intermediate",
    instructor: "Angela Davis",
    instructorAvatar: "/assets/avatars/instructor-6.jpg",
    image: `https://picsum.photos/seed/mern/600/360`,
    price: 89.99,
    rating: 4.9,
    ratingCount: 245,
    category: "Web Development",
    tags: ["mern", "javascript", "fullstack"],
    enrolled: 1560,
    lastUpdated: "2023-12-10",
    trending: true,
    featured: true
  },
  {
    id: "7",
    title: "Mobile App Development with Flutter",
    description: "Create beautiful cross-platform mobile applications with Flutter and Dart programming language.",
    duration: "11 hours",
    lessons: 16,
    level: "Intermediate",
    instructor: "David Kim",
    instructorAvatar: "/assets/avatars/instructor-7.jpg",
    image: `https://picsum.photos/seed/flutter/600/360`,
    price: 64.99,
    rating: 4.8,
    ratingCount: 192,
    category: "Mobile Development",
    tags: ["flutter", "dart", "mobile"],
    enrolled: 1120,
    lastUpdated: "2023-11-25",
    trending: true
  },
  {
    id: "8",
    title: "DevOps Engineering on AWS",
    description: "Master continuous integration, delivery, and deployment using AWS DevOps services and tools.",
    duration: "14 hours",
    lessons: 20,
    level: "Advanced",
    instructor: "Emily Johnson",
    instructorAvatar: "/assets/avatars/instructor-8.jpg",
    image: `https://picsum.photos/seed/devops_aws/600/360`,
    price: 79.99,
    rating: 4.7,
    ratingCount: 165,
    category: "DevOps",
    tags: ["devops", "aws", "ci/cd"],
    enrolled: 890,
    lastUpdated: "2023-10-05"
  },
  {
    id: "9",
    title: "Blockchain Development with Solidity",
    description: "Learn to build decentralized applications (DApps) on Ethereum blockchain using Solidity.",
    duration: "13 hours",
    lessons: 19,
    level: "Advanced",
    instructor: "Alex Martinez",
    instructorAvatar: "/assets/avatars/instructor-9.jpg",
    image: `https://picsum.photos/seed/blockchain/600/360`,
    price: 84.99,
    rating: 4.6,
    ratingCount: 150,
    category: "Blockchain",
    tags: ["blockchain", "ethereum", "solidity"],
    enrolled: 680,
    lastUpdated: "2023-09-28",
    featured: true
  },
  {
    id: "10",
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and user experience design for digital products.",
    duration: "9 hours",
    lessons: 14,
    level: "Beginner",
    instructor: "Sophia White",
    instructorAvatar: "/assets/avatars/instructor-10.jpg",
    image: `https://picsum.photos/seed/uiux/600/360`,
    price: 59.99,
    rating: 4.9,
    ratingCount: 210,
    category: "Design",
    tags: ["ui", "ux", "design"],
    enrolled: 1350,
    lastUpdated: "2023-11-18",
    trending: true
  },
  {
    id: "11",
    title: "Natural Language Processing",
    description: "Deep dive into NLP concepts and build practical applications using Python and modern libraries.",
    duration: "12 hours",
    lessons: 17,
    level: "Advanced",
    instructor: "Dr. Maria Garcia",
    instructorAvatar: "/assets/avatars/instructor-11.jpg",
    image: `https://picsum.photos/seed/nlp/600/360`,
    price: 74.99,
    rating: 4.8,
    ratingCount: 175,
    category: "AI",
    tags: ["nlp", "python", "machine learning"],
    enrolled: 920,
    lastUpdated: "2023-12-05"
  },
  {
    id: "12",
    title: "Introduction to Data Science",
    description: "A comprehensive introduction to data science concepts, tools, and methodologies.",
    duration: "10 hours",
    lessons: 15,
    level: "Beginner",
    instructor: "Mark Anderson",
    instructorAvatar: "/assets/avatars/instructor-12.jpg",
    image: `https://picsum.photos/seed/data_intro/600/360`,
    price: 0, // Free course
    rating: 4.7,
    ratingCount: 230,
    category: "Data Science",
    tags: ["data science", "python", "statistics"],
    enrolled: 1980,
    lastUpdated: "2023-10-15",
    featured: true
  }
];


// Derived data (grouping, featured, etc.)
const coursesByCategory = sampleCourses.reduce((acc, course) => {
  acc[course.category] = acc[course.category] || [];
  acc[course.category].push(course);
  return acc;
}, {} as Record<string, typeof sampleCourses>);

const featuredCourses = sampleCourses.filter(course => course.featured).slice(0, 8); // Limit for carousel
const trendingCourses = sampleCourses.filter(course => course.trending).slice(0, 8); // Limit for scroll area
const newCourses = [...sampleCourses]
  .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  .slice(0, 8); // Limit for carousel
const freeCourses = sampleCourses.filter(course => course.price === 0).slice(0, 4); // Limit for section

const allCategoriesList = ["All Categories", ...Object.keys(coursesByCategory).sort()];
const allLevelsList = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "Newest", label: "Newest" },
  { value: "Popular", label: "Most Popular (Enrolled)" },
  { value: "Highest", label: "Highest Rated" },
  { value: "Price Low", label: "Price: Low to High" },
  { value: "Price High", label: "Price: High to Low" },
];
const heroSearchSuggestions = ["JavaScript", "Python", "Machine Learning", "React", "UI/UX", "AWS"];
const ITEMS_PER_PAGE = 8;

export default function ExploreCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All Categories");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("All Levels");
  const [selectedSortBy, setSelectedSortBy] = useState("Newest");
  const [activeTabCategory, setActiveTabCategory] = useState("All"); // For the Tabs component
  const [visibleItemCount, setVisibleItemCount] = useState(ITEMS_PER_PAGE);

  // Debounce search term



  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    // setSearchTerm will trigger the useEffect for debouncing
    // For immediate search on button click, you could setDebouncedSearchTerm(searchTerm) here
    // but usually, the live typing search is preferred.
    console.log("Search submitted:", searchTerm);
    // Reset to the "All" tab and filters to show general search results
    setActiveTabCategory("All");
    setSelectedCategoryFilter("All Categories"); 
    setSelectedLevelFilter("All Levels");
    setVisibleItemCount(ITEMS_PER_PAGE);
  };
  
  const handleHeroBadgeClick = (term: string) => {
    setSearchTerm(term);
    // Optionally trigger search immediately or let debounce handle it
    setDebouncedSearchTerm(term); // for immediate effect
    setActiveTabCategory("All");
    setVisibleItemCount(ITEMS_PER_PAGE);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let courses = [...sampleCourses];

    // 1. Filter by Active Tab Category (if not "All")
    if (activeTabCategory !== "All") {
      courses = courses.filter(course => course.category === activeTabCategory);
    }

    // 2. Filter by Search Term (applies to title, description, tags)
    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(lowerSearchTerm) ||
        course.description.toLowerCase().includes(lowerSearchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // 3. Filter by Advanced Category Filter (if not "All Categories")
    if (selectedCategoryFilter !== "All Categories") {
      courses = courses.filter(course => course.category === selectedCategoryFilter);
    }

    // 4. Filter by Level (if not "All Levels")
    if (selectedLevelFilter !== "All Levels") {
      courses = courses.filter(course => course.level === selectedLevelFilter);
    }

    // 5. Sort
    switch (selectedSortBy) {
      case "Popular":
        courses.sort((a, b) => (b.enrolled || 0) - (a.enrolled || 0));
        break;
      case "Highest":
        courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Price Low":
        courses.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "Price High":
        courses.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case "Newest":
      default:
        courses.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
    }
    return courses;
  }, [debouncedSearchTerm, activeTabCategory, selectedCategoryFilter, selectedLevelFilter, selectedSortBy]);

  const coursesForCurrentTab = useMemo(() => {
    if (activeTabCategory === "All") {
      return filteredAndSortedCourses; // Filters apply to "All" tab
    }
    // For specific category tabs, we use the pre-filtered list by tab, then apply other filters
    return filteredAndSortedCourses.filter(c => c.category === activeTabCategory);
  }, [activeTabCategory, filteredAndSortedCourses]);


  const paginatedCourses = useMemo(() => {
    return coursesForCurrentTab.slice(0, visibleItemCount);
  }, [coursesForCurrentTab, visibleItemCount]);

  const handleShowMore = () => {
    setVisibleItemCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleViewAllClick = (section: string) => {
    console.log(`"View all" clicked for ${section}`);
    // In a real app, this would navigate: router.push(`/courses/${section.toLowerCase()}`)
  };

  const uniqueInstructors = useMemo(() => {
    const instructorsMap = new Map<string, { name: string; avatar: string | undefined; category: string }>();
    sampleCourses.forEach(course => {
      if (!instructorsMap.has(course.instructor)) {
        instructorsMap.set(course.instructor, {
          name: course.instructor,
          avatar: course.instructorAvatar,
          category: course.category, // Assign first category found
        });
      }
    });
    return Array.from(instructorsMap.values()).slice(0, 6); // Show top 6
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Hero section with search */}
      <section className="pb-8 md:pb-12">
        <div className="rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Unlock Your Potential
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore a universe of courses taught by industry experts. Start your learning journey today!
            </p>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for courses, skills, or instructors..."
                  className="pl-10 h-12 text-base bg-white ring-1 ring-gray-300 focus:ring-primary"
                />
              </div>
              <Button type="submit" className="h-12 px-8 text-base">Search</Button>
            </form>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-600 mr-2">Popular:</span>
              {heroSearchSuggestions.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-primary/20"
                  onClick={() => handleHeroBadgeClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced filters */}
      <section className="mb-8 sticky top-0 bg-background/95 backdrop-blur-sm py-4 z-10 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Refine Your Search:</span>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {allCategoriesList.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevelFilter} onValueChange={setSelectedLevelFilter}>
              <SelectTrigger className="w-full sm:w-[150px] h-10">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {allLevelsList.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSortBy} onValueChange={setSelectedSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured courses carousel */}
      {featuredCourses.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Courses</h2>
            </div>
            <Button variant="link" className="text-primary font-medium" onClick={() => handleViewAllClick("Featured")}>
              View all
            </Button>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {featuredCourses.map((course) => (
                <CarouselItem key={course.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <CourseCard {...course} level={course.level.toLowerCase() as any} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-18px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 disabled:opacity-50" />
            <CarouselNext className="absolute right-[-18px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 disabled:opacity-50" />
          </Carousel>
        </section>
      )}

      {/* Trending Now section with horizontal scroll */}
      {trendingCourses.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <Button variant="link" className="text-primary font-medium" onClick={() => handleViewAllClick("Trending")}>
              View all
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex space-x-4 pb-4">
              {trendingCourses.map((course) => (
                <div key={course.id} className="w-[300px] min-w-[300px] shrink-0">
                  <CourseCard {...course} level={course.level.toLowerCase() as any} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}

      {/* Browse by Category (Main Filterable Section) */}
      <section className="mb-12">
        <Tabs 
          value={activeTabCategory} 
          onValueChange={(value) => {
            setActiveTabCategory(value);
            setVisibleItemCount(ITEMS_PER_PAGE); // Reset pagination on tab change
            if (value !== "All") {
              // If a specific category tab is clicked, clear the advanced category filter
              // to avoid conflicting filters, or set it to match the tab.
              // For simplicity, let's assume tab selection overrides advanced category filter.
              setSelectedCategoryFilter("All Categories"); 
            }
          }} 
          className="w-full"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Browse All Courses</h2>
            <ScrollArea className="w-full md:w-auto whitespace-nowrap">
              <TabsList className="h-auto p-1 justify-start md:justify-center">
                <TabsTrigger value="All" className="h-9 px-4">All</TabsTrigger>
                {Object.keys(coursesByCategory).map((category) => (
                  <TabsTrigger key={category} value={category} className="h-9 px-4">{category}</TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="md:hidden"/>
            </ScrollArea>
          </div>

          <TabsContent value={activeTabCategory} className="mt-0">
            {paginatedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} level={course.level.toLowerCase() as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
                <p className="text-gray-500">Try adjusting your filters or search term.</p>
              </div>
            )}

            {visibleItemCount < coursesForCurrentTab.length && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" onClick={handleShowMore} className="gap-2 px-6 py-3 text-base">
                  Show more courses
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>

      {/* Recently added courses */}
      {newCourses.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Recently Added</h2>
            </div>
            <Button variant="link" className="text-primary font-medium" onClick={() => handleViewAllClick("New")}>
              View all
            </Button>
          </div>
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {newCourses.map((course) => (
                <CarouselItem key={course.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <CourseCard {...course} level={course.level.toLowerCase() as any} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-18px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 disabled:opacity-50" />
            <CarouselNext className="absolute right-[-18px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 disabled:opacity-50" />
          </Carousel>
        </section>
      )}

      {/* Free courses section */}
      {freeCourses.length > 0 && (
        <section className="mb-12">
          <div className="rounded-2xl bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 p-8 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <Star className="h-7 w-7 text-yellow-500 fill-yellow-400" />
                <h2 className="text-2xl font-bold text-gray-800">Free Courses to Get Started</h2>
              </div>
              <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50" onClick={() => handleViewAllClick("Free")}>
                View all free courses
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {freeCourses.map((course) => (
                <CourseCard key={course.id} {...course} price={0} level={course.level.toLowerCase() as any} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top instructors section */}
      {uniqueInstructors.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-indigo-500" />
                <h2 className="text-2xl font-bold">Learn from Top Instructors</h2>
            </div>
            <Button variant="link" className="text-primary font-medium" onClick={() => handleViewAllClick("Instructors")}>
              View all instructors
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
            {uniqueInstructors.map((instructor) => (
              <div key={instructor.name} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 overflow-hidden ring-2 ring-offset-2 ring-primary/50">
                  <img 
                    src={instructor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=random&size=128`} 
                    alt={instructor.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="font-semibold text-gray-800">{instructor.name}</h3>
                <p className="text-sm text-gray-500">{instructor.category}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}