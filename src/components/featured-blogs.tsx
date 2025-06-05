"use client";

import {  blogPosts } from "@/data/blog-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedBlogs() {
  // Get featured blog posts (first 3 featured posts)
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Blogs</h2>
          <Link href="/blog" className="text-sm font-medium flex items-center gap-2">
            View All
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start gap-2"
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
