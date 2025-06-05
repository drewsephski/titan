"use client";

import { useState } from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BookOpen, Clock, User, Calendar } from 'lucide-react';
import { Showcase3D } from '@/components/3d-showcase';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { blogPosts } from '@/data/blog-posts';
import { BlogPost } from '@/types/blog';

export default function BlogPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const welcomeText = `Welcome to the Titan Blog. Discover insights, tutorials, and technology.`;

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6 pb-2">
            Titan Blog
          </h1>
          <div className="max-w-s4xl mx-auto text-lg text-muted-foreground px-4">
            <TextGenerateEffect words={welcomeText} duration={0.8} className="leading-relaxed" />
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
                      <h4 className="text-lg font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary">
                        {selectedPost.author}
                      </h4>
                      <p className="text-sm text-muted-foreground/80 transition-colors duration-300 hover:text-primary/70">
                        {selectedPost.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}