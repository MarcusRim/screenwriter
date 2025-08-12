import { Node, mergeAttributes, textInputRule } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
//import { Paragraph } from '@tiptap/extension-paragraph';
import './ScreenplayNodes.css';


// Act or Teaser - Page break, centered, underlined, all caps
// Tiptap Hard break extension


// Action - regular margin
export const Action = Node.create({
    name: 'action',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.action' }]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'action'}), 0]
    },

    addKeyboardShortcuts() {
        return {
            'Mod-0': () => {
                if (this.editor.isActive('action')) {
                    return false
                }
                this.editor.chain().focus().setNode('action').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'paragraph' && $from.parent.type.name !== 'action')) {
                    return false
                }
                this.editor.commands.setHardBreak()
            },
            Tab: () => {
                const { $from } = this.editor.state.selection
                if ($from.parent.type.name !== 'action') 
                    return false
                this.editor.chain().focus().setNode('sceneHeading').run()
                return true
            },
        }
    },
})

// Scene Heading - all caps, regular margin
export const SceneHeading = Node.create({
    name: 'sceneHeading',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{tag: 'h2.scene-heading'}]},
    renderHTML({HTMLAttributes}) {
        return ['h2', mergeAttributes(HTMLAttributes, {class: 'scene-heading'}), 0]
    },
    addKeyboardShortcuts() {
        return {
            // control 1
            'Mod-1': () => {
                if (this.editor.isActive('sceneHeading')) {
                    return false
                }
                this.editor.chain().focus().setNode('sceneHeading').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'sceneHeading')) {
                    return false
                }
                this.editor.commands.setHardBreak()
            },
            Tab: () => {
                const { $from } = this.editor.state.selection
                if ($from.parent.type.name !== 'sceneHeading') 
                    return false
                this.editor.chain().focus().setNode('action').run()
                return true
            },
        }
    },
})

// Character - all caps, 3.7 in margin (2.2 from regular), 2.3 right margin
export const Character = Node.create({
    name: 'character',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.character'}]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'character'}), 0]
    },
    addKeyboardShortcuts() {
        return {
            // control 2
            'Mod-2': () => {
                if (this.editor.isActive('character')) {
                    return false
                }
                this.editor.chain().focus().setNode('character').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'character')) {
                    return false
                }
                this.editor.chain().focus().splitBlock().setNode('dialogue').run()
                return true
            },
        }
    },

})

// Parenthetical - 3.1 in margin (1.6 from regular), 2.3 right margin (1.3 from regular)
export const Parenthetical = Node.create({
    name: 'parenthetical',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.parenthetical'}]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'parenthetical'}), 0]
    },
    addKeyboardShortcuts() {
        return {
            // control 3
            'Mod-3': () => {
                if (this.editor.isActive('parenthetical')) {
                    return false
                }
                this.editor.chain().focus().setNode('parenthetical').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'parenthetical')) {
                    return false
                }
            },
            Tab: () => {
                const { $from } = this.editor.state.selection
                if ($from.parent.type.name !== 'parenthetical')
                    return false
                this.editor.chain().focus().setNode('dialogue').run()
                return true
            },
        }
    },
})

// Dialogue - 2.5 in margin (1 from regular), 2.3 right margin
export const Dialogue = Node.create({
    name: 'dialogue',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.dialogue'}]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'dialogue'}), 0]
    },
    addKeyboardShortcuts() {
        return {
            // control 4
            'Mod-4': () => {
                if (this.editor.isActive('dialogue')) {
                    return false
                }
                this.editor.chain().focus().setNode('dialogue').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'dialogue')) {
                    return false
                }
                this.editor.commands.setHardBreak()
            },
            Tab: () => {
                const { $from } = this.editor.state.selection
                if ($from.parent.type.name !== 'dialogue') 
                    return false
                this.editor.chain().focus().setNode('parenthetical').run()
                return true
            },
        }
    },
})

// Transition - right alined, all caps, regular left margin
export const Transition = Node.create({
    name: 'transition',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.transition'}]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'transition'}), 0]
    },
    addKeyboardShortcuts() {
        return {
            // control 5
            'Mod-5': () => {
                if (this.editor.isActive('transition')) {
                    return false
                }
                this.editor.chain().focus().setNode('transition').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || ($from.parent.type.name !== 'transition')) {
                    return false
                }
                this.editor.commands.setHardBreak()
            },
        }
    },
})

// Shot - all caps
export const Shot = Node.create({
    name: 'shot',
    group: 'block',
    content: 'inline*',
    parseHTML() {return [{ tag: 'p.shot' }]},
    renderHTML({HTMLAttributes}) {
        return ['p', mergeAttributes(HTMLAttributes, {class: 'shot'}), 0]
    },

    addKeyboardShortcuts() {
        return {
            //control 6
            'Mod-6': () => {
                if (this.editor.isActive('shot')) {
                    return false
                }
                this.editor.chain().focus().setNode('shot').run()
                return true
            },
            Enter: () => {
                const {state, chain} = this.editor
                const {$from, empty} = state.selection
                if (!empty || $from.parent.type.name !== 'shot') {
                    return false
                }
                this.editor.commands.setHardBreak()
            },
        }
    },
})