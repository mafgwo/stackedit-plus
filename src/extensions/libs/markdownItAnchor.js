function groupHeadings(headings, level = 1) {
  const result = [];
  let currentItem;

  function pushCurrentItem() {
    if (currentItem) {
      if (currentItem.children.length > 0) {
        currentItem.children = groupHeadings(currentItem.children, level + 1);
      }
      result.push(currentItem);
    }
  }
  headings.forEach((heading) => {
    if (heading.level !== level) {
      currentItem = currentItem || {
        children: [],
      };
      currentItem.children.push(heading);
    } else {
      pushCurrentItem();
      currentItem = heading;
    }
  });
  pushCurrentItem();
  return result;
}

function arrayToHtml(arr) {
  if (!arr || !arr.length) {
    return '';
  }
  const ulHtml = arr.map((item) => {
    let result = `<li class="preview-toc-item preview-toc-l${item.level}">`;
    if (item.anchor && item.title) {
      result += `<a href="#${item.anchor}">${item.title}</a>`;
    }
    result += arrayToHtml(item.children);
    return `${result}</li>`;
  }).join('\n');
  return `<ul>${ulHtml}</ul>`;
}

export default (md) => {
  md.core.ruler.before('replacements', 'anchors', (state) => {
    const anchorHash = {};
    let headingOpenToken;
    let headingContent;
    const tocTokens = [];
    const headings = [];
    state.tokens.forEach((token) => {
      if (token.type === 'heading_open') {
        headingContent = '';
        headingOpenToken = token;
      } else if (token.type === 'heading_close') {
        headingOpenToken.headingContent = headingContent;

        // According to http://pandoc.org/README.html#extension-auto_identifiers
        let slug = headingContent
          .replace(/\s/g, '-') // Replace all spaces and newlines with hyphens
          .replace(/[\0-,/:-@[-^`{-~]/g, '') // Remove all punctuation, except underscores, hyphens, and periods
          .toLowerCase(); // Convert all alphabetic characters to lowercase

        // Remove everything up to the first letter
        let i;
        for (i = 0; i < slug.length; i += 1) {
          const charCode = slug.charCodeAt(i);
          if ((charCode >= 0x61 && charCode <= 0x7A) || charCode > 0x7E) {
            break;
          }
        }

        // If nothing left after this, use `section`
        slug = slug.slice(i) || 'section';

        let anchor = slug;
        let index = 1;
        while (Object.prototype.hasOwnProperty.call(anchorHash, anchor)) {
          anchor = `${slug}-${index}`;
          index += 1;
        }
        anchorHash[anchor] = true;
        headingOpenToken.headingAnchor = anchor;
        headingOpenToken.attrs = [
          ['id', anchor],
        ];
        headings.push({
          title: headingOpenToken.headingContent,
          anchor: headingOpenToken.headingAnchor,
          level: parseInt(headingOpenToken.tag.slice(1), 10),
          children: [],
        });
        headingOpenToken = undefined;
      } else if (headingOpenToken) {
        headingContent += token.children.reduce((result, child) => {
          if (child.type !== 'footnote_ref') {
            return result + child.content;
          }
          return result;
        }, '');
      }
      if (token.type === 'inline' && (token.content === '[TOC]' || token.content === '[toc]')) {
        tocTokens.push(token);
      }
    });
    // 没有TOC 直接返回
    if (tocTokens.length === 0) {
      return;
    }
    // 没有header
    if (headings.length === 0) {
      // 置空[TOC]文案为空字符串
      tocTokens.forEach((tocToken) => {
        tocToken.children[0].content = '';
        tocToken.content = '';
      });
    } else {
      tocTokens.forEach((tocToken) => {
        // toc目录
        const toc = groupHeadings(headings);
        // 拼接为html
        const tocHtml = arrayToHtml(toc);
        const tocDiv = new state.Token('html_inline', '', 0);
        tocDiv.content = `<div class="preview-toc">${tocHtml}</div>`;
        tocToken.children.unshift(tocDiv);
        tocToken.children[1].content = '';
        tocToken.content = '';
      });
    }
  });
};
