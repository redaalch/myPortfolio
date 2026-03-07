declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    slug: string;
    date: string;
    tags: string[];
    description: string;
    coverImage?: string;
    author: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
