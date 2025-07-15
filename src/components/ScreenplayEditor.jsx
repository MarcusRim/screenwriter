// src/components/ScreenplayEditor.jsx
import React, { useState, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { Page } from './Page';

export default function ScreenplayEditor({
  value, onChange
}) {
  const [pageRefs, setPageRefs] = useState([React.createRef()]);
  // whenever 'value' changes
  useEffect(() => {
    // this needs to call a function that will separate value into chunks for pages
    console.log(value)
  }, [value]);

  const handleInput = () => {
    const lastIndex = pageRefs.length - 1;
    const lastEl = pageRefs[lastIndex].current;
    if (lastEl && lastEl.scrollHeight > lastEl.clientHeight) {
      setPageRefs(prev => [...prev, React.createRef()]);
      return;
    }
    // serialize all pages back into one string
    const text = pageRefs
      .map(r => r.current?.innerText || '')
      .join('\n');
    onChange(text);
  };

  return (
  <VStack align="center">
    {pageRefs.map((ref, idx) => (
      <Page
        key = {idx}
        ref = {ref}
        onInput = {handleInput}
      />
    ))}
  </VStack>
  );
}