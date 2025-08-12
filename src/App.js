// src/App.js
import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import ScreenplayEditor from './components/ScreenplayEditor';
import { Flex } from '@chakra-ui/react';

export default function App() {
  const [content, setContent] = useState(''); // initialize variables and function

  //Export to .txt function
  function exportTxt(filename, text) {
    
  }

  return (
    <Flex direction = "column" height = "100vh">
      <MenuBar/>
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
