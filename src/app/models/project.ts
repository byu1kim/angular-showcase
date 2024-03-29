import { Category } from './category';
import { Tag } from './tag';

export interface Project {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  website: string | null;
  github: string | null;
  published_date: string | null;
  image: String[] | null;
  thumb: string | null;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  category: Category | null;
  tags: Tag[];
}
