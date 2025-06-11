import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

export default function MenuBar({ onSave }) {
  return (
    <Flex bg="gray.100" borderBottom="2px solid" borderColor="#496b24" px={4} py={2} align="center">
      <Button variant="ghost" onClick={() => console.log('File menu')}>
        File
      </Button>
      <Button variant="ghost" onClick={onSave}>
        Save
      </Button>
      <Button variant="ghost" onClick={() => alert('Help coming soon')}>
        Help
      </Button>
    </Flex>
  );
}