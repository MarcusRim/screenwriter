// src/components/TextEditor.jsx
import React from 'react';
import { Textarea } from '@chakra-ui/react';

export default function TextEditor({ value, onChange }) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start writing your screenplay or load in previous file"
      resize="none"
      height="100%"
      border="none"
      _focus={{ outline: 'none', boxShadow: 'none' }}
    />
  );
}