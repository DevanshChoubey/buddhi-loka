import { chatFormatAttention } from './chat-format-attention';

export interface RelatedPost {
  title: string;
  category: string;
  image: string;
  slug: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  relatedPosts: RelatedPost[];
}

export interface BlogPosts {
  [key: string]: BlogPostData;
}

export const blogPosts: BlogPosts = {
  "chat-format-attention": chatFormatAttention,
};
