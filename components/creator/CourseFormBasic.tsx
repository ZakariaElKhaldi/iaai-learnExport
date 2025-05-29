"use client";

import { useState } from 'react';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

// Course categories and levels
const COURSE_CATEGORIES = [
  'Web Development',
  'Data Science',
  'Mobile Development',
  'DevOps',
  'Cybersecurity',
  'Machine Learning',
  'Cloud Computing',
  'UI/UX Design',
  'Game Development',
  'Blockchain',
];

const COURSE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
];

export interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnailUrl?: string;
  price: string;
  tags: string[];
}

interface CourseFormBasicProps {
  initialData?: Partial<CourseFormData>;
  onSave: (data: CourseFormData) => void;
}

export function CourseFormBasic({ initialData = {}, onSave }: CourseFormBasicProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || '',
    level: initialData.level || '',
    thumbnailUrl: initialData.thumbnailUrl || '',
    price: initialData.price || '0',
    tags: initialData.tags || [],
  });
  
  const [tagsInput, setTagsInput] = useState('');
  
  const handleChange = (field: keyof CourseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleTagsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      const newTag = tagsInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      setTagsInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-medium">Course Title</Label>
              <Input 
                id="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-base font-medium">Description</Label>
              <Textarea 
                id="description"
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-1 min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-base font-medium">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="level" className="text-base font-medium">Level</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => handleChange('level', value)}
                >
                  <SelectTrigger id="level" className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="price" className="text-base font-medium">Price ($)</Label>
              <Input 
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter course price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tags" className="text-base font-medium">Tags</Label>
              <Input 
                id="tags"
                placeholder="Enter tags and press Enter"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onKeyDown={handleTagsChange}
                className="mt-1"
              />
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <div key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center">
                      {tag}
                      <button 
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-primary hover:text-primary/70"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="thumbnail" className="text-base font-medium">Course Thumbnail</Label>
              <div className="mt-1 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                {formData.thumbnailUrl ? (
                  <div className="relative w-full">
                    <img 
                      src={formData.thumbnailUrl} 
                      alt="Course thumbnail" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleChange('thumbnailUrl', '')}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button type="button" variant="outline" className="mt-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 