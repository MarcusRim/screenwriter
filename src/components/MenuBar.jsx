import React from 'react';
import { Flex, Menu, Button } from "@chakra-ui/react";

export default function MenuBar({ 
    onImportFile,
    onExportPDF,
    onExportTxt,
    onSaveAsCopy,
    onHelp,
  }) {
  return (
    <Flex bg="gray.100" borderBottom="2px solid" borderColor="#496b24" px={4} py={2} align="center" gap={2}>
      <Menu.Root>
        <Menu.Trigger>
          <Button variant="ghost" /* rightIcon={<ChevronDownIcon />} */>File</Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item onClick={onImportFile}>Import File</Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={onExportPDF}>Export / Save as PDF</Menu.Item>
            <Menu.Item onClick={onExportTxt}>Export / Save as TXT</Menu.Item>
            <Menu.Separator />
            <Menu.Item onClick={onSaveAsCopy}>Save As…</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
      <Button variant="ghost" onClick={onHelp}>
        Help
      </Button>
    </Flex>
  );
}