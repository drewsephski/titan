import { Metadata } from 'next';
import Link from 'next/link';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BookOpen, Clock, User, Tag, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Showcase3D } from '@/components/3d-showcase';

export const metadata: Metadata = {
  title: 'Blog - Titan',
  description: 'Insights, tutorials, and stories about web development, design, and technology.',
};

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to the rise of edge computing and beyond.',
    author: 'Drew Sepeczi',
    readTime: '5 min read',
    date: 'May 28, 2025',
    category: 'Web Development',
    tags: ['Trends', 'AI', 'Edge Computing'],
    featured: true,
    slug: 'future-of-web-dev-2025',
  },
  {
    id: 2,
    title: 'Mastering React Server Components',
    excerpt: 'A deep dive into React Server Components, how they work, and how they can improve your application performance and user experience.',
    author: 'Drew Sepeczi',
    readTime: '7 min read',
    date: 'May 20, 2025',
    category: 'React',
    tags: ['Performance', 'Components'],
    featured: true,
    slug: 'react-server-components',
  },
  {
    id: 3,
    title: 'Building Accessible Web Applications',
    excerpt: 'Learn the best practices for creating web applications that are accessible to all users, including those with disabilities.',
    author: 'Drew Sepeczi',
    readTime: '6 min read',
    date: 'May 15, 2025',
    category: 'Accessibility',
    tags: ['Best Practices', 'Inclusion'],
    featured: false,
    slug: 'accessible-web-apps',
  },
  {
    id: 4,
    title: 'State Management in 2025: Beyond Redux',
    excerpt: 'Exploring modern state management solutions and how they compare to traditional approaches like Redux.',
    author: 'Drew Sepeczi',
    readTime: '8 min read',
    date: 'May 10, 2025',
    category: 'React',
    tags: ['State Management', 'Performance'],
    featured: false,
    slug: 'state-management-2025',
  },
  {
    id: 5,
    title: 'The Complete Guide to CSS Grid',
    excerpt: 'Master CSS Grid with this comprehensive guide covering all the properties and techniques you need to know.',
    author: 'Drew Sepeczi',
    readTime: '10 min read',
    date: 'May 5, 2025',
    category: 'CSS',
    tags: ['Layout', 'Responsive Design'],
    featured: false,
    slug: 'complete-css-grid',
  },
  {
    id: 6,
    title: 'TypeScript Best Practices',
    excerpt: 'Learn how to write better TypeScript code with these best practices and patterns.',
    author: 'Drew Sepeczi',
    readTime: '9 min read',
    date: 'April 28, 2025',
    category: 'TypeScript',
    tags: ['Best Practices', 'Type Safety'],
    featured: true,
    slug: 'typescript-best-practices',
  },
];

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Web Development', count: blogPosts.filter(post => post.category === 'Web Development').length },
  { name: 'React', count: blogPosts.filter(post => post.category === 'React').length },
  { name: 'Accessibility', count: blogPosts.filter(post => post.category === 'Accessibility').length },
  { name: 'CSS', count: blogPosts.filter(post => post.category === 'CSS').length },
  { name: 'TypeScript', count: blogPosts.filter(post => post.category === 'TypeScript').length },
];

const tags = [
  { name: 'Trends', count: 1 },
  { name: 'AI', count: 1 },
  { name: 'Edge Computing', count: 1 },
  { name: 'Performance', count: 2 },
  { name: 'Components', count: 1 },
  { name: 'Best Practices', count: 2 },
  { name: 'Inclusion', count: 1 },
  { name: 'State Management', count: 1 },
  { name: 'Layout', count: 1 },
  { name: 'Responsive Design', count: 1 },
  { name: 'Type Safety', count: 1 },
];

export default function BlogPage() {
  const welcomeText = `Welcome to the Titan Blog. Discover insights, tutorials, and stories about web development, design, and technology.`;
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6 pb-2">
          Titan Blog
        </h1>
        <div className="text-xl text-muted-foreground mb-8">
          <TextGenerateEffect words={welcomeText} duration={0.8} />
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 py-6 text-base"
          />
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-1 h-6 bg-primary rounded-full mr-2"></span>
            Featured Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article className="h-full flex flex-col rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-md dark:border-gray-800">
                  <div className="h-48 bg-muted/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                    <div className="absolute bottom-3 left-3 z-20">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Newest
              </Button>
              <Button variant="outline" size="sm">
                Popular
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {regularPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                <article className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-full sm:w-48 h-40 bg-muted/50 rounded-lg flex-shrink-0 overflow-hidden">
                    {/* Image placeholder */}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span className="text-primary font-medium">{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-2">
                        <User className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground">{post.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center">
                1
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 flex items-center justify-center">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </nav>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Categories */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-between py-2 px-1 rounded hover:bg-muted transition-colors"
                  >
                    <span className="text-muted-foreground hover:text-foreground">
                      {category.name}
                    </span>
                    <span className="text-xs bg-muted-foreground/10 text-muted-foreground rounded-full px-2 py-0.5">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-primary" />
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/blog/tag/${tag.name.toLowerCase()}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tag.name}
                  <span className="ml-1 text-muted-foreground/70">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest articles and news delivered to your inbox every week.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>
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
    </div>
  );
}
