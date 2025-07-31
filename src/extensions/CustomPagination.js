import { Pagination } from 'tiptap-pagination-breaks';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const CustomPagination = Pagination.extend({
  name: 'customPagination',

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('pagination');

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => ({ ...this.options }),
          apply: (tr, value) => {
            const newOptions = tr.getMeta('paginationOptions');
            return newOptions ? { ...value, ...newOptions } : value;
          },
        },
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations = [];
            let currentPageHeight = 0;
            let pageNumber = 1;
            let lastNodeWasList = false;
            let currentListHeight = 0;
            let listStartPos = 0;

            const options = pluginKey.getState(state);
            const { pageHeight, pageMargin, showPageNumber, label } = options;
            const effectivePageHeight = pageHeight - 2 * pageMargin;

            const createPageBreak = (pos) => {
              return Decoration.widget(pos, () => {
                const pageBreak = document.createElement('div');
                pageBreak.className = 'page-break';
                pageBreak.style.cssText = `
                  height: 20px;
                  width: 100%;
                  border-top: 1px dashed #ccc;
                  margin: 10px 0;
                  position: relative;
                `;
                pageBreak.setAttribute('data-page-number', String(pageNumber));

                if (showPageNumber) {
                  const pageIndicator = document.createElement('span');
                  pageIndicator.className = 'page-number';
                  pageIndicator.textContent = `${label || 'Page'} ${pageNumber}`;
                  pageIndicator.style.cssText = `
                    position: absolute;
                    right: 0;
                    top: -10px;
                    font-size: 12px;
                    color: #666;
                    background: white;
                    padding: 0 4px;
                  `;
                  pageBreak.appendChild(pageIndicator);
                }

                pageNumber++;
                return pageBreak;
              });
            };

            doc.descendants((node, pos) => {
              if (!node.isBlock) return;

              const nodeDOM = this.editor.view.nodeDOM(pos);
              if (!(nodeDOM instanceof HTMLElement)) return;

              const isList =
                node.type.name === 'bulletList' ||
                node.type.name === 'orderedList';
              const isListItem = node.type.name === 'listItem';

              // Calculate node height
              const nodeHeight = isListItem
                ? calculateListItemHeight(nodeDOM)
                : nodeDOM.offsetHeight;

              if (nodeHeight === 0) return;

              // Handle list items
              if (isList || isListItem) {
                if (!lastNodeWasList) {
                  listStartPos = pos;
                  currentListHeight = 0;
                }
                currentListHeight += nodeHeight;
                lastNodeWasList = true;

                // Check if next node is not a list
                const nextNode = doc.nodeAt(pos + node.nodeSize);
                const isLastListItem =
                  !nextNode ||
                  (nextNode.type.name !== 'listItem' &&
                    nextNode.type.name !== 'bulletList' &&
                    nextNode.type.name !== 'orderedList');

                if (isLastListItem) {
                  // Process the entire list
                  if (
                    currentPageHeight + currentListHeight >
                    effectivePageHeight
                  ) {
                    decorations.push(createPageBreak(listStartPos));
                    currentPageHeight = currentListHeight;
                  } else {
                    currentPageHeight += currentListHeight;
                  }
                  lastNodeWasList = false;
                }
                return;
              }

              // Handle non-list blocks
              lastNodeWasList = false;
              if (currentPageHeight + nodeHeight > effectivePageHeight) {
                decorations.push(createPageBreak(pos));
                currentPageHeight = nodeHeight;
              } else {
                currentPageHeight += nodeHeight;
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

function calculateListItemHeight(element) {
  const style = window.getComputedStyle(element);
  const marginTop = parseFloat(style.marginTop) || 0;
  const marginBottom = parseFloat(style.marginBottom) || 0;
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;

  return (
    element.offsetHeight + marginTop + marginBottom + paddingTop + paddingBottom
  );
}
