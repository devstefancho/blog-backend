export type FrontMatter = {
  published: boolean;
  id: string;
  slug: string;
  title: string;
  summary: string;
  toc: boolean;
  tags: string[];
  categories: string[];
  createdDate: string;
  updatedDate: string;
};

export type ContentFileData = {
  path: string;
  name: string;
  slug: string;
};
