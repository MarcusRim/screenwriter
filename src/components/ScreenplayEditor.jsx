// src/components/ScreenplayEditor.jsx
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useEditor, EditorContent, EditorProvider } from '@tiptap/react';
//import { Pagination } from 'tiptap-pagination-breaks';
import { CustomPagination } from '../extensions/CustomPagination';
import StarterKit from '@tiptap/starter-kit';
import './screenplay.css';

export default function ScreenplayEditor({
  value, onChange
}) {
  const PAGE_HEIGHT = 1056 // 11 in
  const [heightPx, setHeightPx] = useState(PAGE_HEIGHT)

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomPagination.configure({
        pageHeight: PAGE_HEIGHT, // 11 in
        pageWidth: 816,   // 8.5 in
        pageMargin: 96,   // 1 in
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'screenplay-editor',
      },
    },
    onUpdate: ({editor}) => {
      onChange(editor.getText());
      const totalHeight = editor.view.dom.scrollHeight
      const pages = Math.ceil(totalHeight / PAGE_HEIGHT)
      const newHeight = pages * PAGE_HEIGHT
      setHeightPx(newHeight)
      editor.view.dom.style.height = '${newHeight}px'
      console.log('heightPX = ', heightPx)
    },
  });
  
  // don't render until editor exists
  if (!editor) {
    return null;
  }

  return (
    <Box className="screenplay-container">
      <EditorContent 
        editor = {editor} 
        style = {{
          height: '${heightPx}px',
          overflow: 'visible',
        }}
      />
    </Box>
  );
}