export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Added content field
  author: string;
  readTime: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  slug: string;
};