// src/components/ScreenplayEditor.jsx
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react';
import { useEditor, EditorContent } from '@tiptap/react';
//import { Pagination } from 'tiptap-pagination-breaks';
//import { CustomPagination } from '../extensions/CustomPagination';
import PaginationExtension, { 
  PageNode, HeaderFooterNode, BodyNode }
  from 'tiptap-extension-pagination';
import StarterKit from '@tiptap/starter-kit';
import './screenplay.css';

export default function ScreenplayEditor({
  value, onChange
}) {
  const PAGE_HEIGHT = 1056 // 11 in

  const editor = useEditor({
    extensions: [
      StarterKit,
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
      p="8"
      h="100vh"
      overflowY="auto"
      mx="auto"
      maxW="calc(8.5in + 4rem)"
    >
      <EditorContent
        editor={editor}
        className="screenplay-editor"
      />
    </Box>
  );
}