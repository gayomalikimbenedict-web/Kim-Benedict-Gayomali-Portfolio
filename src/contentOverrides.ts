export type ContentOverrides = Record<string, string>;

export const isContentOverrides = (value: unknown): value is ContentOverrides =>
  Boolean(
    value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.entries(value).every(([key, text]) => key.length > 0 && typeof text === 'string')
  );

const editableSections = '.portfolio-main .page-section:not(.settings-section)';
const excludedElements = 'svg, script, style, input, textarea, select, option, [aria-hidden="true"]';

const getTextNodes = (overrides: ContentOverrides = {}): Text[] => {
  const sections = document.querySelectorAll<HTMLElement>(editableSections);
  const nodes: Text[] = [];

  sections.forEach((section) => {
    const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const textNode = node as Text;
      const parent = textNode.parentElement;
      if (parent && !parent.closest(excludedElements)) {
        const key = getTextNodeKey(textNode);
        if (
          textNode.nodeValue?.trim() ||
          Object.prototype.hasOwnProperty.call(overrides, key)
        ) {
          nodes.push(textNode);
        }
      }
      node = walker.nextNode();
    }
  });

  return nodes;
};

const getTextNodeKey = (node: Text): string => {
  const parent = node.parentElement;
  const editableKey = parent
    ?.closest<HTMLElement>('[data-portfolio-editable]')
    ?.dataset.portfolioEditable;
  if (editableKey) return editableKey;

  const section = parent?.closest<HTMLElement>('.page-section');
  if (!parent || !section) {
    throw new Error('Editable text must belong to a portfolio section.');
  }

  const path: string[] = [];
  let element: HTMLElement | null = parent;
  while (element && element !== section) {
    const siblings = element.parentElement
      ? Array.from(element.parentElement.children).filter(
          (sibling) => sibling.tagName === element?.tagName
        )
      : [];
    path.unshift(
      `${element.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(element) + 1})`
    );
    element = element.parentElement;
  }

  const textSiblings = Array.from(parent.childNodes).filter(
    (sibling) => sibling.nodeType === Node.TEXT_NODE
  );
  const textIndex = textSiblings.indexOf(node);
  return `${section.id}/${path.join('/')}/text(${textIndex})`;
};

export const applyContentOverrides = (overrides: ContentOverrides): void => {
  getTextNodes(overrides).forEach((node) => {
    const key = getTextNodeKey(node);
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      node.nodeValue = overrides[key];
    }
  });
};

export const setPortfolioTextEditable = (enabled: boolean): void => {
  if (!enabled) {
    document
      .querySelectorAll<HTMLElement>('.portfolio-main [data-portfolio-editable]')
      .forEach((element) => {
        const text = element.textContent || '';
        if (element.dataset.portfolioEditWrapper === 'true') {
          element.replaceWith(document.createTextNode(text));
        } else {
          element.textContent = text;
        }
      });
      document
        .querySelectorAll<HTMLElement>('.portfolio-main [data-portfolio-editable]')
        .forEach((element) => {
          element.removeAttribute('contenteditable');
          element.removeAttribute('data-portfolio-editable');
          element.removeAttribute('data-portfolio-edit-wrapper');
          element.removeAttribute('spellcheck');
        });
      return;
  }

  const targets = getTextNodes().map((node) => ({
    node,
    key: getTextNodeKey(node),
  }));
  targets.forEach(({ node, key }) => {
    const parent = node.parentElement;
    if (!parent) return;
    const target =
      parent.childElementCount === 0 && parent.childNodes.length === 1
        ? parent
        : parent.ownerDocument.createElement('span');
    if (target !== parent) {
      target.dataset.portfolioEditWrapper = 'true';
      parent.insertBefore(target, node);
      target.appendChild(node);
    }
    target.setAttribute('contenteditable', 'plaintext-only');
    target.setAttribute('data-portfolio-editable', key);
    target.setAttribute('spellcheck', 'false');
  });
};

export const getPortfolioTextEdits = (): ContentOverrides => {
  const edits: ContentOverrides = {};
  document
    .querySelectorAll<HTMLElement>('.portfolio-main [data-portfolio-editable]')
    .forEach((element) => {
      const key = element.dataset.portfolioEditable;
      if (key) edits[key] = element.textContent || '';
    });
  return edits;
};
