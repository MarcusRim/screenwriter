// src/components/Page.jsx
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

export const Page = React.forwardRef((props, ref) => {
    // set up states for what mode user is in
    const [mode, setMode] = useState('normal');

    // handle different conditions for use of tab and enter
    const handleKeyDown = e => {
        // Tab will change modes
        if (e.key === 'Tab') {
            e.preventDefault()
            document.execCommand('insertText', false, '\t')
            setMode('character')
        }
        else if (e.key === 'Enter') {
            if (mode !== 'normal') {
                if (mode === 'character')
                    setMode('parenthetical')
                if (mode === 'parenthetical')
                    setMode('dialogue')
                if (mode === 'dialogue')
                    setMode('normal')
                if (mode === 'transition')
                    setMode('normal')
            }
            else {
                e.preventDefault()
                document.execCommand('insertText', false, '\n\n')
            }
        }
    }


    return (
        <Box
            ref={ref}
            contentEditable
            onKeyDown = {handleKeyDown}
            w="8.5in"
            minH = "11in"
            border="1px solid"
            borderColor="gray.300"
            boxShadow="0 2px 6px rgba(0,0,0,0.1)"
            pt = "1in"
            pb = "1in"
            pr = "1in"
            pl = "1.5in"
            mb={4}
            whiteSpace="pre-wrap"
            wordBreak="break-word"
            fontFamily = "'Courier New', Courier, monospace"
            lineHeight = "1"
            fontSize = '12pt'
            outline = 'none'
            {...props}
            
        />
    )
});
