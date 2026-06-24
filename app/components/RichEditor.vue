<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
const token = useCookie('admin_token')
const uploading = ref(false)

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: 'Write your content...' }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val, false)
  }
})

async function uploadImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    uploading.value = true
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await $fetch<{ url: string }>('/api/upload', {
        method: 'POST',
        body: form,
        headers: { authorization: `Bearer ${token.value}` },
      })
      editor.value?.chain().focus().setImage({ src: res.url }).run()
    } catch (e: any) {
      alert('Upload failed: ' + (e.data?.message || e.message))
    }
    uploading.value = false
  }
  input.click()
}

function addLink() {
  const url = prompt('URL:')
  if (url) editor.value?.chain().focus().setLink({ href: url }).run()
}
</script>

<template>
  <div class="border border-zinc-700 rounded-xl overflow-hidden bg-zinc-900">
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-2 border-b border-zinc-700 bg-zinc-800/50">
      <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'bg-zinc-600': editor?.isActive('heading', { level: 2 }) }" class="toolbar-btn">H2</button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'bg-zinc-600': editor?.isActive('heading', { level: 3 }) }" class="toolbar-btn">H3</button>
      <button @click="editor?.chain().focus().toggleBold().run()" :class="{ 'bg-zinc-600': editor?.isActive('bold') }" class="toolbar-btn font-bold">B</button>
      <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ 'bg-zinc-600': editor?.isActive('italic') }" class="toolbar-btn italic">I</button>
      <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ 'bg-zinc-600': editor?.isActive('bulletList') }" class="toolbar-btn">List</button>
      <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ 'bg-zinc-600': editor?.isActive('orderedList') }" class="toolbar-btn">1.</button>
      <button @click="editor?.chain().focus().toggleBlockquote().run()" :class="{ 'bg-zinc-600': editor?.isActive('blockquote') }" class="toolbar-btn">"</button>
      <button @click="editor?.chain().focus().toggleCodeBlock().run()" :class="{ 'bg-zinc-600': editor?.isActive('codeBlock') }" class="toolbar-btn">Code</button>
      <div class="w-px h-6 bg-zinc-700 mx-1 self-center" />
      <button @click="addLink" class="toolbar-btn">Link</button>
      <button @click="uploadImage" :disabled="uploading" class="toolbar-btn">
        {{ uploading ? '...' : 'Image' }}
      </button>
      <div class="w-px h-6 bg-zinc-700 mx-1 self-center" />
      <button @click="editor?.chain().focus().undo().run()" class="toolbar-btn">Undo</button>
      <button @click="editor?.chain().focus().redo().run()" class="toolbar-btn">Redo</button>
    </div>
    <!-- Editor -->
    <EditorContent :editor="editor" class="prose-editor" />
  </div>
</template>

<style>
.toolbar-btn {
  @apply px-2.5 py-1 text-xs text-zinc-300 rounded-md hover:bg-zinc-600 transition;
}
.prose-editor .tiptap {
  @apply p-4 min-h-[300px] text-zinc-200 outline-none;
}
.prose-editor .tiptap h2 { @apply text-xl font-bold text-white mt-6 mb-2; }
.prose-editor .tiptap h3 { @apply text-lg font-semibold text-white mt-4 mb-2; }
.prose-editor .tiptap p { @apply my-2 text-zinc-300; }
.prose-editor .tiptap ul { @apply list-disc pl-6 my-2 text-zinc-300; }
.prose-editor .tiptap ol { @apply list-decimal pl-6 my-2 text-zinc-300; }
.prose-editor .tiptap blockquote { @apply border-l-4 border-zinc-600 pl-4 my-3 text-zinc-400 italic; }
.prose-editor .tiptap code { @apply bg-zinc-800 px-1.5 py-0.5 rounded text-red-300 text-sm; }
.prose-editor .tiptap pre { @apply bg-zinc-800 p-4 rounded-lg my-3 overflow-x-auto; }
.prose-editor .tiptap pre code { @apply bg-transparent p-0; }
.prose-editor .tiptap img { @apply rounded-xl max-w-full my-4; }
.prose-editor .tiptap a { @apply text-red-400 underline; }
.prose-editor .tiptap p.is-editor-empty:first-child::before {
  @apply text-zinc-600;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
