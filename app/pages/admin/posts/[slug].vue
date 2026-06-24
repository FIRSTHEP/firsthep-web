<script setup lang="ts">
const route = useRoute()
const token = useCookie('admin_token')
const isNew = route.params.slug === 'new'

const form = ref({
  title: '',
  slug: '',
  description: '',
  category: '',
  image: '',
  youtube: '',
  tags: '',
  content: '',
  published: true,
})

const saving = ref(false)
const error = ref('')
const uploadingHero = ref(false)

async function loadPost() {
  if (isNew) return
  try {
    const res = await $fetch<any>(`/api/posts/${route.params.slug}`, { headers: { authorization: `Bearer ${token.value}` } })
    const post = res.data
    form.value = { ...post, tags: (post.tags || []).join(', '), published: !!post.published }
  } catch { navigateTo('/admin') }
}

async function save() {
  saving.value = true
  error.value = ''
  try {
    const body = {
      ...form.value,
      tags: form.value.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: form.value.published ? 1 : 0,
    }
    if (isNew) {
      const res = await $fetch<any>('/api/posts', { method: 'POST', body, headers: { authorization: `Bearer ${token.value}` } })
      navigateTo(`/admin/posts/${res.data.slug}`)
    } else {
      await $fetch(`/api/posts/${route.params.slug}`, { method: 'PUT', body, headers: { authorization: `Bearer ${token.value}` } })
    }
  } catch (e: any) {
    error.value = e.data?.message || 'Save failed'
  }
  saving.value = false
}

async function uploadHeroImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    uploadingHero.value = true
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await $fetch<any>('/api/upload', { method: 'POST', body: fd, headers: { authorization: `Bearer ${token.value}` } })
      form.value.image = res.data.url
    } catch (e: any) {
      error.value = e.data?.message || 'Upload failed'
    }
    uploadingHero.value = false
  }
  input.click()
}

onMounted(loadPost)
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
    <nav class="border-b border-zinc-800/50 px-6 h-16 flex items-center justify-between max-w-5xl mx-auto">
      <a href="/admin/posts" class="text-sm text-zinc-400 hover:text-white transition">&larr; Back</a>
      <div class="flex gap-3 items-center">
        <label class="flex items-center gap-2 text-sm text-zinc-400">
          <input type="checkbox" v-model="form.published" class="rounded">
          Published
        </label>
        <button @click="save" :disabled="saving" class="px-5 py-1.5 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-500 transition disabled:opacity-50">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-6 py-10">
      <h1 class="text-2xl font-bold mb-8">{{ isNew ? 'New Post' : 'Edit Post' }}</h1>
      <p v-if="error" class="mb-4 text-red-400 text-sm">{{ error }}</p>

      <div class="grid gap-5">
        <div>
          <label class="text-xs text-zinc-500 mb-1 block">Title</label>
          <input v-model="form.title" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="text-xs text-zinc-500 mb-1 block">Slug</label>
            <input v-model="form.slug" placeholder="auto-generated if empty" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
          </div>
          <div>
            <label class="text-xs text-zinc-500 mb-1 block">Category</label>
            <input v-model="form.category" placeholder="e.g. PC Build, Audio" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
          </div>
        </div>

        <div>
          <label class="text-xs text-zinc-500 mb-1 block">Description</label>
          <input v-model="form.description" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
        </div>

        <div>
          <label class="text-xs text-zinc-500 mb-1 block">Hero Image</label>
          <div class="flex gap-3 items-start">
            <input v-model="form.image" placeholder="URL or upload" class="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
            <button @click="uploadHeroImage" :disabled="uploadingHero" class="px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-300 hover:bg-zinc-700 transition shrink-0">
              {{ uploadingHero ? 'Uploading...' : 'Upload' }}
            </button>
          </div>
          <div v-if="form.image" class="mt-3 rounded-xl overflow-hidden max-w-md">
            <img :src="form.image" class="w-full aspect-video object-cover">
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label class="text-xs text-zinc-500 mb-1 block">YouTube URL</label>
            <input v-model="form.youtube" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
          </div>
          <div>
            <label class="text-xs text-zinc-500 mb-1 block">Tags (comma separated)</label>
            <input v-model="form.tags" placeholder="pc-build, mini-itx" class="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600">
          </div>
        </div>

        <div>
          <label class="text-xs text-zinc-500 mb-1 block">Content</label>
          <ClientOnly>
            <RichEditor v-model="form.content" />
          </ClientOnly>
        </div>
      </div>
    </main>
  </div>
</template>
