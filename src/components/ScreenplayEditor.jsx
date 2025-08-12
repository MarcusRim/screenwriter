// src/components/ScreenplayEditor.jsx

import './screenplay.css';
import { Box } from '@chakra-ui/react';
import { useEditor, EditorContent } from '@tiptap/react';
import PaginationExtension, { PageNode, HeaderFooterNode, BodyNode }
  from 'tiptap-extension-pagination';
import StarterKit from '@tiptap/starter-kit';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Action, SceneHeading, Character, Parenthetical,
  Dialogue, Transition, Shot } from '../extensions/ScreenplayNodes';

export default function ScreenplayEditor({
  value, onChange
}) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: { HTMLAttributes: {class: 'action'}}
      }),
      PaginationExtension.configure({
        defaultPaperSize: 'letter',
        pageAmendmentOptions: {
          enableHeader: false,
          enableFooter: false,
        },
      }),
      PageNode,
      HeaderFooterNode,
      BodyNode,
      HardBreak,
      Action,
      SceneHeading,
      Character,
      Parenthetical,
      Dialogue,
      Transition,
      Shot,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'screenplay-editor',
      },
    },
    onUpdate: ({editor}) => {
      onChange(editor.getText());
    },
  });
  
  // don't render until editor exists
  if (!editor) {
    return null;
  }

  return (
    <Box
      className="screenplay-container"
      bg="gray.100"
      h="100vh"
      overflowY="auto"
    >
      <EditorContent
        editor={editor}
        className="screenplay-editor"
      />
    </Box>
  );
}