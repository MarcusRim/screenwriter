// src/App.js
import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import ScreenplayEditor from './components/ScreenplayEditor';
import { Flex, Box } from '@chakra-ui/react';

export default function App() {
  const [content, setContent] = useState(''); // initialize variables and function

  /*
  * handleSave
  * Function that logs the current content in the text editor
  */
  const handleSave = () => {
    console.log('Saving content:', content);
  }
  return (
    <Flex direction = "column" height = "100vh">
      <MenuBar onSave = {handleSave} />
      <Flex
        flex = "1"
        overflowY = "auto"
        justify = "center"
        bg = "gray.100"
        py = {4}
      >
        <ScreenplayEditor
          value = {content}
          onChange = {setContent}
        />
      </Flex>
    </Flex>
  );
}
