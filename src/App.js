// src/App.js
import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import TextEditor from './components/TextEditor';
import { Flex, Box } from '@chakra-ui/react';

export default function App() {
  const [content, setContent] = useState(''); // initialize variables and function

  /*
  * Function that logs the current content in the text editor
  */
  const handleSave = () => {
    console.log('Saving content:', content);
  }
  return (
    <Flex direction = "column" height = "100vh">
      <MenuBar onSave = {handleSave} />
      <Box flex = "1">
        <TextEditor value = {content} onChange = {setContent} />
      </Box>
    </Flex>
  );
}
