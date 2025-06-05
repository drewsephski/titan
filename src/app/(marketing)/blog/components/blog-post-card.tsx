"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="relative h-48 overflow-hidden">
      <div 
        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${post.image || '/images/placeholder-blog.jpg'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags?.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white line-clamp-2">{post.title}</h3>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <div className="flex items-center mr-4">
          <User className="h-4 w-4 mr-1" />
          {post.author || 'Titan Team'}
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {post.date}
        </div>
        <div className="ml-auto flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {post.readTime}
        </div>
      </div>
      <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
      <div className="flex items-center text-primary font-medium group-hover:underline">
        Read more
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </motion.article>
);
