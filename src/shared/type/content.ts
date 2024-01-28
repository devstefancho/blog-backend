import { ApiProperty } from '@nestjs/swagger';

export class FrontMatter {
  @ApiProperty({ description: 'Whether the content is published' })
  published: boolean;

  @ApiProperty({
    description: 'The unique identifier of the content',
    example: 'atomic-habits',
  })
  id: string;

  @ApiProperty({
    description: 'The slug for the content',
    example: 'atomic-habits',
  })
  slug: string;

  @ApiProperty({
    description: 'The title of the content',
    example: 'Atomic Habits',
  })
  title: string;

  @ApiProperty({
    description: 'A summary of the content',
    example: 'Atomic Habits',
  })
  summary: string;

  @ApiProperty({ description: 'Whether table of contents is enabled' })
  toc: boolean;

  @ApiProperty({
    description: 'Tags associated with the content',
    example: ['book'],
  })
  tags: string[];

  @ApiProperty({
    description: 'Categories the content belongs to',
    example: ['book'],
  })
  categories: string[];

  @ApiProperty({
    description: 'The creation date of the content',
    example: '2023-11-06T00:00:00.000Z',
  })
  createdDate: string;

  @ApiProperty({
    description: 'The last update date of the content',
    example: '2024-01-23T00:00:00.000Z',
  })
  updatedDate: string;
}

export type ContentFileData = {
  path: string;
  name: string;
  slug: string;
};
