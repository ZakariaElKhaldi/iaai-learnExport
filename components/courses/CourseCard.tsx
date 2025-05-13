import React from 'react';
import Link from 'next/link';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    rating: number;
    enrollments: number;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {course.author}</span>
          <span>&#9733; {course.rating} ({course.enrollments})</span>
        </div>
        <Link href={`/courses/${course.id}`} className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
