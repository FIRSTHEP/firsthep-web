<script setup lang="ts">
const token = useCookie('admin_token')
const posts = ref<any[]>([])
const loading = ref(true)

async function fetchPosts() {
  loading.value = true
  try {
    const res = await $fetch<any>('/api/posts?all', { headers: { authorization: `Bearer ${token.value}` } })
    posts.value = res.data || []
  } catch { navigateTo('/admin') }
  loading.value = false
}

async function deletePost(slug: string) {
  if (!confirm(`Delete "${slug}"?`)) return
  await $fetch(`/api/posts/${slug}`, { method: 'DELETE', headers: { authorization: `Bearer ${token.value}` } })
  await fetchPosts()
}

function logout() {
  token.value = null
  navigateTo('/admin')
}

onMounted(fetchPosts)
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
    <nav class="border-b border-zinc-800/50 px-6 h-16 flex items-center justify-between max-w-6xl mx-auto">
      <span class="font-bold text-white">Admin</span>
      <div class="flex gap-4 items-center text-sm">
        <a href="/" target="_blank" class="text-zinc-400 hover:text-white transition">View Site</a>
        <a href="/admin/posts/new" class="px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-500 transition">New Post</a>
        <button @click="logout" class="text-zinc-500 hover:text-zinc-300 transition">Logout</button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 py-10">
      <h1 class="text-2xl font-bold mb-8">Posts</h1>
      <div v-if="loading" class="text-zinc-500">Loading...</div>
      <div v-else class="space-y-3">
        <div
          v-for="post in posts"
          :key="post.slug"
          class="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
        >
          <img :src="post.image" class="w-20 h-12 object-cover rounded-lg shrink-0" v-if="post.image">
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-white truncate">{{ post.title }}</h3>
            <p class="text-xs text-zinc-500">{{ post.category }} &middot; {{ post.created_at?.slice(0, 10) }}</p>
          </div>
          <span v-if="!post.published" class="text-[10px] px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">Draft</span>
          <a :href="`/admin/posts/${post.slug}`" class="text-sm text-zinc-400 hover:text-white transition">Edit</a>
          <button @click="deletePost(post.slug)" class="text-sm text-red-400 hover:text-red-300 transition">Delete</button>
        </div>
      </div>
    </main>
  </div>
</template>
