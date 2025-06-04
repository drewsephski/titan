import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, User, X, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import styles from './blog-post-styles.module.css';

interface BlogPostCardProps {
  post: BlogPost;
  isFeatured?: boolean;
  className?: string;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, isFeatured = false, className }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform cursor-pointer ${isFeatured ? 'flex flex-col' : 'flex flex-col sm:flex-row gap-6 p-4'} ${className}`}
      >
        <div className={`${isFeatured ? 'h-48 w-full' : 'w-full sm:w-48 h-40'} bg-muted/50 relative overflow-hidden rounded-lg flex-shrink-0`}>
          {/* Placeholder Image */}
          <Image
            src={`https://picsum.photos/seed/${post.id}/400/300`} // Use a unique seed for each post
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105 group-hover:brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-10" />
          <div className="absolute bottom-4 left-4 z-20">
            <Badge variant="secondary" className="backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        </div>
        <div className={`${isFeatured ? 'p-6 flex-1' : 'flex-1'}`}>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock3 className="h-3.5 w-3.5 mr-1" /> {post.readTime}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 transition-opacity group-hover:opacity-80">
            {post.excerpt}
          </p>
          {isFeatured ? (
            <>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs transition-transform group-hover:scale-105">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-sm transition-colors group-hover:text-primary">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                  <User className="h-3 w-3" />
                </div>
                <span className="text-muted-foreground">{post.author}</span>
              </div>
              <div className="flex items-center text-sm text-primary font-medium transition-transform group-hover:translate-x-1 group-hover:opacity-80 mt-4">
                Read article
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs transition-transform group-hover:scale-105">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center text-sm transition-colors group-hover:text-primary">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                  <User className="h-3 w-3" />
                </div>
                <span className="text-muted-foreground">{post.author}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </DialogTrigger>
   <DialogContent className="sm:max-w-[800px] bg-card border border-border shadow-lg rounded-2xl p-8">
     <div className="flex flex-col gap-8">
       <div className="flex justify-between items-center">
         <div className="flex flex-col gap-2">
           <DialogTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
             <TextGenerateEffect words={post.title} duration={0.8} />
           </DialogTitle>
           <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
             <span className="flex items-center">
               <Clock3 className="h-4 w-4 mr-1.5" />
               {post.readTime}
             </span>
             <span className="flex items-center">
               <Calendar className="h-4 w-4 mr-1.5" />
               {post.date}
             </span>
           </div>
         </div>
         <DialogClose asChild>
           <Button variant="ghost" size="icon" className="h-10 w-10">
             <X className="h-5 w-5" />
           </Button>
         </DialogClose>
       </div>

       <div className="flex flex-col gap-6">
         <div className="flex items-center gap-6">
           <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
             <User className="h-6 w-6 text-muted-foreground" />
           </div>
           <div className="flex flex-col">
             <h4 className="text-lg font-semibold text-muted-foreground">{post.author}</h4>
             <p className="text-sm text-muted-foreground/80">{post.category}</p>
           </div>
         </div>

         <div className={`${styles.blogPostContent} prose max-w-none`}>
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
         </div>

         <div className="flex flex-wrap gap-3">
           {post.tags.map((tag) => (
             <Badge key={tag} variant="outline" className="text-sm">
               {tag}
             </Badge>
           ))}
         </div>
       </div>
     </div>
   </DialogContent>
  </Dialog>
);