import { marked } from 'marked';

const renderer = {
  // add anchor links to headings
  heading(text: string, level: number) {
    const escapedText = text.toLowerCase().replace(/\s/g, '-');
    return `
      <h${level}>
        <a name="${escapedText}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
        </a>
        ${text}
      </h${level}>`;
  },
};

export const markedExtended = marked.use({ renderer });
