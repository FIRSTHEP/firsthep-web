<script setup lang="ts">
const { data: res } = await useFetch<any>('/api/posts')
const posts = computed(() => res.value?.data || [])
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-xl font-bold tracking-tight text-white">FIRSTHEP</a>
        <div class="hidden sm:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="/" class="hover:text-white transition">Home</a>
          <a href="/blog" class="text-white">Blog</a>
          <a href="/#contact" class="px-4 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-500 transition">Collab</a>
        </div>
      </div>
    </nav>

    <main class="pt-28 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-2">Blog</h1>
        <p class="text-zinc-500 mb-12">รีวิว บทความ และไอเดียจัดโต๊ะคอม</p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="post in posts"
            :key="post.slug"
            :href="`/blog/${post.slug}`"
            class="group block rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 hover:bg-zinc-800/50 transition"
          >
            <div class="aspect-video overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="p-4">
              <span class="text-[10px] font-medium text-red-400 uppercase tracking-wider">{{ post.category }}</span>
              <h3 class="mt-1 font-semibold text-zinc-100 leading-snug text-sm">{{ post.title }}</h3>
              <p class="mt-1 text-xs text-zinc-500 line-clamp-2">{{ post.description }}</p>
              <p class="mt-2 text-xs text-zinc-600">{{ post.created_at?.slice(0, 10) }}</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>
