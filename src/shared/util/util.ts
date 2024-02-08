import * as fs from 'fs';
import * as path from 'path';
import * as matter from 'gray-matter';
import { ContentFileData, FrontMatter } from '../type/content';

export const recursiveReadDir = async (
  entry: string,
): Promise<ContentFileData[]> => {
  const results: ContentFileData[] = [];

  function addToResult(_fileData: ContentFileData) {
    const { name } = _fileData;
    if (name.endsWith('.md') && name !== 'README.md') {
      results.push(_fileData);
    }
  }

  async function recursiveDir(dir: string): Promise<void> {
    const _files = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = _files.filter((file) => file.name !== '.git');
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        await recursiveDir(fullPath);
      } else {
        /**
         * @note - problem with frontMatter and excerpt logic
         * excerpt 생성을 위해서 파일을 읽는 상태이고, 추후에 데이터가 db로 관리하면 삭제되어야함
         * 이 부분 때문에 test 케이스가 실패하고 있는데 제거 예정이라 고치지 않을 듯
         */
        const _fileData = fs.readFileSync(fullPath, 'utf8');
        const parsedData = matter(_fileData);
        const frontMatter = parsedData.data as FrontMatter;
        const excerpt = frontMatter.published
          ? generateExcerpt(parsedData.content, 'large')
          : '';

        const fileData = {
          path: fullPath,
          name: file.name,
          slug: file.name.split('.')[0], // 현재는 slug와 파일명이 같다고 가정하기 때문에 확장자만 제거
          excerpt,
        };
        addToResult(fileData);
      }
    }
  }

  await recursiveDir(entry);
  return results;
};

export const getFrontMatter = (fullPath: string): FrontMatter => {
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return data as FrontMatter;
};

const excerptSizeMap = {
  small: 90,
  medium: 150,
  large: 210,
} as const;

/**
 * Generate excerpt from content
 * @param content - markdown string excluding frontmatter
 * @param excerptSize - size of excerpt
 * @returns generated excerpt string
 */
export const generateExcerpt = (
  content: string,
  excerptSize: keyof typeof excerptSizeMap = 'small',
) => {
  const contentNoTitle = content.replace(/# .+\n/, '');
  const contentNoHeading = contentNoTitle.replace(/#+/, '');
  const contentNoLineBreak = contentNoHeading.replace(/\n/g, '');
  const size = excerptSizeMap[excerptSize];
  const excerpt = contentNoLineBreak.slice(0, size);
  return excerpt;
};
