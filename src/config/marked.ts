import { marked } from 'marked';
import hljs from 'highlight.js';

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
  // 코드 블록을 위한 Syntax Highlighting 처리
  code(code: string, language: string) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return `<pre><code class="hljs ${validLanguage}">${
      hljs.highlight(code, { language: validLanguage }).value
    }</code></pre>`;
  },
};

export const markedExtended = marked.use({ renderer });
