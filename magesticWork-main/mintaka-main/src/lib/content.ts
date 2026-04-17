import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export async function getCollection(collectionName: string, locale?: string) {
  const collectionPath = path.join(contentDirectory, collectionName);
  
  if (!fs.existsSync(collectionPath)) {
    return [];
  }

  // If locale is provided, look into the locale subdirectory
  const targetPath = locale ? path.join(collectionPath, locale) : collectionPath;
  
  if (!fs.existsSync(targetPath)) {
    return [];
  }

  const files = fs.readdirSync(targetPath);
  
  const allData = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(targetPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      const slug = file.replace(/\.mdx?$/, '');
      
      return {
        slug,
        data,
        content,
      };
    });

  return allData;
}

export async function getEntryBySlug(collectionName: string, slug: string, locale?: string) {
  const collectionPath = path.join(contentDirectory, collectionName);
  const targetPath = locale ? path.join(collectionPath, locale) : collectionPath;
  
  const mdxPath = path.join(targetPath, `${slug}.mdx`);
  const mdPath = path.join(targetPath, `${slug}.md`);
  
  let filePath = '';
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    slug,
    data,
    content,
  };
}
