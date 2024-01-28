import { ApiProperty } from '@nestjs/swagger';
import { FrontMatter } from 'src/shared/type/content';

export class ContentDto {
  @ApiProperty({
    description: 'html content',
    example:
      '\n      <h1>\n        <a name="atomic-habits" class="anchor" href="#atomic-habits">\n          <span class="header-link"></span>\n        </a>\n        Atomic Habits\n      </h1><p>(chapter 15까지 읽음)</p>\n<p>글쓴이: James Clear</p>\n<p>매일 1%의 향상은 1년뒤에 37배의 향상의 결과를 낸다.\n하지만, 이 과정에서 중간에 Valley of Disappointment가 발생한다.\n기대했던 결과가 특정 지점까지는 나타나지 않는 것이다.</p>',
  })
  html: string;

  @ApiProperty({ description: 'frontmatter', type: FrontMatter })
  frontmatter: FrontMatter;

  @ApiProperty({
    description: 'raw content',
    example:
      '\n\n# Atomic Habits\n(chapter 15까지 읽음)\n\n글쓴이: James Clear\n\n매일 1%의 향상은 1년뒤에 37배의 향상의 결과를 낸다.\n하지만, 이 과정에서 중간에 Valley of Disappointment가 발생한다.\n기대했던 결과가 특정 지점까지는 나타나지 않는 것이다.',
  })
  content: string;
}
