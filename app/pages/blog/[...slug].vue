<script setup lang="ts">
const route = useRoute()
const slug = (route.params.slug as string[]).join('/')
const { data: res } = await useFetch<any>(`/api/posts/${slug}`)
const post = computed(() => res.value?.data)
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-bold tracking-tight text-white">FIRSTHEP</a>
        <div class="hidden sm:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="/" class="hover:text-white transition">Home</a>
          <a href="/blog" class="hover:text-white transition">Blog</a>
        </div>
      </div>
    </nav>

    <main class="pt-28 pb-20 px-6">
      <div v-if="post" class="max-w-3xl mx-auto">
        <span class="text-xs font-medium text-red-400 uppercase tracking-wider">{{ post.category }}</span>
        <h1 class="mt-2 text-3xl sm:text-4xl font-bold text-white leading-tight">{{ post.title }}</h1>
        <p class="mt-3 text-zinc-500">{{ post.description }}</p>
        <p class="mt-2 text-sm text-zinc-600">{{ post.created_at?.slice(0, 10) }}</p>

        <div v-if="post.image" class="mt-8 rounded-2xl overflow-hidden">
          <img :src="post.image" :alt="post.title" class="w-full aspect-video object-cover">
        </div>

        <a
          v-if="post.youtube"
          :href="post.youtube"
          target="_blank"
          class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 text-red-400 text-sm hover:bg-red-600/20 transition"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Watch on YouTube
        </a>

        <article class="mt-10 blog-content" v-html="post.content" />

        <div v-if="post.tags?.length" class="mt-10 flex flex-wrap gap-2">
          <span v-for="tag in post.tags" :key="tag" class="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs border border-zinc-700">#{{ tag }}</span>
        </div>

        <a href="/blog" class="mt-10 inline-block text-sm text-zinc-500 hover:text-zinc-300 transition">&larr; Back to Blog</a>
      </div>
    </main>
  </div>
</template>

<style>
.blog-content h2 { @apply text-xl font-bold text-white mt-8 mb-3; }
.blog-content h3 { @apply text-lg font-semibold text-white mt-6 mb-2; }
.blog-content p { @apply my-2 text-zinc-300 leading-relaxed; }
.blog-content ul { @apply list-disc pl-6 my-3 text-zinc-300 space-y-1; }
.blog-content ol { @apply list-decimal pl-6 my-3 text-zinc-300 space-y-1; }
.blog-content blockquote { @apply border-l-4 border-zinc-600 pl-4 my-4 text-zinc-400 italic; }
.blog-content img { @apply rounded-xl max-w-full my-4; }
.blog-content a { @apply text-red-400 hover:underline; }
.blog-content strong { @apply text-white font-semibold; }
</style>
