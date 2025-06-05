"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BookOpen, ArrowRight, Clock, User, Calendar, ArrowUp } from 'lucide-react';
import { Showcase3D } from '@/components/3d-showcase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { blogPosts } from '@/data/blog-posts';
import { BlogPost } from '@/types/blog';
import { toast } from 'sonner';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Blog Post Card Component
const BlogPostCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => (
  <motion.article
    variants={item}
    className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="relative h-48 overflow-hidden">
      <div
        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
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

export default function BlogPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const welcomeText = `Welcome to the Titan Blog. Discover insights, tutorials, and stories about web development, design, and technology.`;

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleNewsletterSubscribe = () => {

    // Implement newsletter subscription logic here
    const newsletterSubscriptionEndpoint = 'https://titan.run/api/newsletter/subscribe';
    fetch(newsletterSubscriptionEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: window.prompt('Enter your email address to subscribe to our newsletter'),
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    console.log('Subscribing to newsletter...');
    toast.success('Subscription successful!', {
      icon: '🎉',
      description: 'You will receive our latest articles in your inbox.',
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6 pb-2">
          Titan Blog
        </h1>
        <div className="text-xl text-muted-foreground">
          <TextGenerateEffect words={welcomeText} duration={0.8} />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group relative rounded-lg border p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md dark:border-gray-800 hover:border-primary/10 hover:bg-muted/5 hover:scale-[1.01]"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                    <div
                      onClick={() => handlePostClick(post)}
                      className="before:absolute before:inset-0 cursor-pointer before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100"
                    >
                      {post.title}
                    </div>
                  </h2>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">{post.excerpt}</p>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>

              <div className="flex items-center text-sm font-medium text-primary cursor-pointer group-hover:text-primary/90 transition-colors duration-300" onClick={() => handlePostClick(post)}>
                <span>Read more</span>
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <BookOpen className="mr-2 h-4 w-4" />
          View all articles
        </button>
      </div>

      {/* 3D Showcase Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Interactive 3D Experience
        </h2>
        <div className="rounded-xl overflow-hidden">
          <Showcase3D
            title="Explore in 3D"
            description="Interact with our 3D scene to see how we bring designs to life. Rotate, zoom, and explore the details of our interactive models."
            height="600px"
            className="border-none shadow-lg"
          />
        </div>
      </div>

      {/* Post Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
       <DialogContent className="sm:max-w-[900px] bg-card border border-border shadow-lg rounded-2xl p-8 transition-all duration-300 hover:bg-muted/90">
         {selectedPost && (
           <>
             <DialogHeader>
               <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                 <TextGenerateEffect words={selectedPost.title} duration={0.8} />
               </DialogTitle>
               <DialogDescription className="flex items-center text-sm text-muted-foreground gap-4">
                 <div className="flex items-center">
                   <Clock className="h-4 w-4 mr-1.5" /> {selectedPost.readTime}
                 </div>
                 <div className="flex items-center">
                   <Calendar className="h-4 w-4 mr-1.5" /> {selectedPost.date}
                 </div>
                 <div className="flex items-center">
                   <User className="h-4 w-4 mr-1.5" /> {selectedPost.author}
                 </div>
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-8">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center transition-all duration-300 hover:scale-105">
                   <User className="h-6 w-6 text-muted-foreground transition-colors duration-300 hover:text-primary" />
                 </div>
                 <div>
                   <h4 className="text-lg font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary">{selectedPost.author}</h4>
                   <p className="text-sm text-muted-foreground/80 transition-colors duration-300 hover:text-primary/70">{selectedPost.category}</p>
                 </div>
               </div>
               <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
             </div>
           </>
         )}
       </DialogContent>
      </Dialog>
    </div>
  );
}