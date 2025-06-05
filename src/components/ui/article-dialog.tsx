"use client";

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Article = {
  title: string
  description: string
  content: string
  category: string
  readTime: string
  date: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

interface ArticleDialogProps {
  article: Article | null
  onOpenChange: (open: boolean) => void
  className?: string
}

export function ArticleDialog({
  article,
  onOpenChange,
  className,
  ...props
}: ArticleDialogProps) {
  if (!article) return null

  return (
    <Dialog open={!!article} onOpenChange={onOpenChange} {...props}>
      <DialogContent className={cn("max-w-7xl w-[100vw] max-h-[90vh] p-4 overflow-hidden [&>button]:hidden", className)}>

        <DialogHeader className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">{article.readTime}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>

          <DialogTitle className="text-xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </DialogTitle>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-medium text-muted-foreground">
                {article.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">{article.author.role}</p>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="pt-8 space-y-8 overflow-y-auto max-h-[calc(90vh-12rem)] pr-4 -mr-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <p className="text-lg text-foreground/90 leading-relaxed">
            {article.description}
          </p>

          <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:my-4 prose-p:leading-relaxed prose-p:text-foreground/90 prose-ul:my-4 prose-li:my-1">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-6 mt-8 border-t border-border">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/blog">
                All Articles
              </Link>
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
