<script setup lang="ts">
const socials = [
  { name: 'YouTube', url: 'https://www.youtube.com/c/FIRSTHEP' },
  { name: 'Instagram', url: 'https://www.instagram.com/firsthep/' },
  { name: 'Facebook', url: 'https://www.facebook.com/firstheps' },
]

const setups = [
  {
    title: 'Mini ITX White Build',
    desc: 'Fractal Terra + RTX 5080 SFF + 9800X3D',
    budget: '140,000',
    img: 'https://i.ytimg.com/vi/BOWzkzQHpqk/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=BOWzkzQHpqk',
  },
  {
    title: 'L-Shape Standing Desk',
    desc: 'Ergonoz Integra + Mario Kart Setup',
    budget: '85,000',
    img: 'https://i.ytimg.com/vi/1kulJLWp3WQ/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=1kulJLWp3WQ',
  },
  {
    title: 'My Desk Setup Tour',
    desc: 'Dream Desk - Minimal White Theme',
    budget: '95,000',
    img: 'https://i.ytimg.com/vi/fEFZT2RS7qg/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=fEFZT2RS7qg',
  },
  {
    title: 'Bewell Ergonomic Desk',
    desc: 'Standing Desk + Health Setup',
    budget: '25,000',
    img: 'https://i.ytimg.com/vi/itAIdxZ3mTg/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=itAIdxZ3mTg',
  },
]

const reviews = [
  { title: 'LG UltraGear 32GS95UE', category: 'Monitor', views: '227K', url: 'https://www.youtube.com/watch?v=URD18YfxqcU', img: 'https://i.ytimg.com/vi/URD18YfxqcU/mqdefault.jpg' },
  { title: 'ROG G700 Ryzen 9800X3D + RTX 5070', category: 'PC Build', views: '312K', url: 'https://www.youtube.com/watch?v=NNPD91foW_o', img: 'https://i.ytimg.com/vi/NNPD91foW_o/mqdefault.jpg' },
  { title: 'ANKER soundcore Liberty 5 Pro', category: 'Audio', views: '11K', url: 'https://www.youtube.com/watch?v=Zd4n-qKkqoI', img: 'https://i.ytimg.com/vi/Zd4n-qKkqoI/mqdefault.jpg' },
  { title: 'Keychron K5 Max', category: 'Keyboard', views: '5K', url: 'https://www.youtube.com/watch?v=czBq5b0cXS8', img: 'https://i.ytimg.com/vi/czBq5b0cXS8/mqdefault.jpg' },
  { title: 'ANKER eufy Solar Camera', category: 'Smart Home', views: '2.9K', url: 'https://www.youtube.com/watch?v=sJqKGicKZb4', img: 'https://i.ytimg.com/vi/sJqKGicKZb4/mqdefault.jpg' },
  { title: 'Ergonoz Integra L-Shape', category: 'Desk', views: '3.9K', url: 'https://www.youtube.com/watch?v=1kulJLWp3WQ', img: 'https://i.ytimg.com/vi/1kulJLWp3WQ/mqdefault.jpg' },
]

const popularVideos = [
  { title: 'ลองกินอาหารของ "ทหารจีน" MRE', views: '459K', img: 'https://i.ytimg.com/vi/3hE8YbP4L38/mqdefault.jpg', url: 'https://www.youtube.com/watch?v=3hE8YbP4L38' },
  { title: 'รีวิวคอมเกมมิ่ง ROG G700', views: '312K', img: 'https://i.ytimg.com/vi/NNPD91foW_o/mqdefault.jpg', url: 'https://www.youtube.com/watch?v=NNPD91foW_o' },
  { title: 'โคตรข้าวกล่องจากจีน!! อุ่นร้อนด้วยตัวเอง', views: '229K', img: 'https://i.ytimg.com/vi/M1cGybn754g/mqdefault.jpg', url: 'https://www.youtube.com/watch?v=M1cGybn754g' },
  { title: 'LG UltraGear 4K 240Hz OLED Review', views: '227K', img: 'https://i.ytimg.com/vi/URD18YfxqcU/mqdefault.jpg', url: 'https://www.youtube.com/watch?v=URD18YfxqcU' },
]

const vlogs = [
  { title: 'เที่ยวไต้หวัน 1 วัน ครบจบ! ตะลุยซีเหมินติง', views: '4.6K', img: 'https://i.ytimg.com/vi/WrL_7f_UV0M/maxresdefault.jpg', url: 'https://www.youtube.com/watch?v=WrL_7f_UV0M' },
  { title: 'เที่ยวญี่ปุ่นด้วยตัวเอง ลุยเล่นสกีหิมะ', views: '13K', img: 'https://i.ytimg.com/vi/df6idj22cXw/maxresdefault.jpg', url: 'https://www.youtube.com/watch?v=df6idj22cXw' },
  { title: 'นั่งรถไฟตู้นอนไป "เชียงใหม่" 3วัน 2คืน', views: '70K', img: 'https://i.ytimg.com/vi/5KC0z5etR3o/maxresdefault.jpg', url: 'https://www.youtube.com/watch?v=5KC0z5etR3o' },
]

const stats = [
  { label: 'Subscribers', value: '53K+' },
  { label: 'Videos', value: '1,400+' },
  { label: 'Total Views', value: '30M+' },
  { label: 'Years Active', value: '9' },
]

const brands = ['XPG', 'GIGABYTE', 'Noctua', 'Ergonoz', 'ANKER', 'Keychron', 'LG', 'ASUS ROG', 'Bewell', 'DeskSpace', 'Lunio', 'CUKTECH']

const { data: blogRes } = await useFetch<any>('/api/posts?limit=3')
const blogPosts = computed(() => blogRes.value?.data || [])

// Parallax
const parallaxX = ref(0)
const parallaxY = ref(0)
function onMouseMove(e: MouseEvent) {
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 10
  parallaxX.value = x
  parallaxY.value = y
}
onMounted(() => window.addEventListener('mousemove', onMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))

</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800/50">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2">
          <img src="https://yt3.googleusercontent.com/1BFznelwR-N5f4zUvV6YlkP-OQ7YJ_xHnJ8s3qZzDInYxiOsjIKOvHSDFESoJYuKjlQl62QUoJQ=s160-c-k-c0x00ffffff-no-rj" alt="FIRSTHEP" class="w-8 h-8 rounded-full">
          <span class="text-xl font-bold tracking-tight text-white">FIRSTHEP</span>
        </a>
        <div class="hidden sm:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#setups" class="hover:text-white transition">Setups</a>
          <a href="#reviews" class="hover:text-white transition">Reviews</a>
          <a href="/blog" class="hover:text-white transition">Blog</a>
          <a href="#vlogs" class="hover:text-white transition">Vlogs</a>
          <a href="#about" class="hover:text-white transition">About</a>
          <a href="#contact" class="px-4 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-500 transition">Collab</a>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="pt-24 sm:pt-40 pb-16 sm:pb-32 px-4 sm:px-6 relative overflow-hidden min-h-[70vh] sm:min-h-[85vh] flex items-center">
      <img
        src="https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/697299896_1405912631553655_8213654840207680752_n.png?stp=dst-png&cstp=mx1672x941&ctp=s1672x941&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE3H4e3Jh-37qJyNUUDaE_SMVRTqRnyDXcxVFOpGfINd3C4dwwAyvMnvvQpevyVRNXk8Nw12EYPiy96CyoZu64J&_nc_ohc=-0XgoVcUO9YQ7kNvwGqdIAo&_nc_oc=AdpmFe5gxyme6VEp0WOmJM28OdTHXnFUL3fyJvldzb9-UCJ6I5E5W7DUjnxh7Jbon9w&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&_nc_gid=nzHPNo5BUrpkGmi0b5EtgQ&_nc_ss=7b2a8&oh=00_Af9WH-49OnuvYJ141fIiRgAa01TzhZ4-Wihx0pg6Y76oCw&oe=6A41F83D"
        alt="FIRSTHEP Setup"
        class="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-200 ease-out"
        :style="{ transform: `scale(1.1) translate(${parallaxX}px, ${parallaxY}px)` }"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/75 to-zinc-950" />
      <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50" />
      <div class="relative max-w-4xl mx-auto text-center">
        <p class="text-sm sm:text-xl font-light tracking-[0.25em] text-zinc-400 uppercase mb-6 sm:mb-8">Minimal Desk Setup & Tech Review</p>
        <h1 class="text-4xl sm:text-8xl font-bold tracking-tight text-white leading-none">
          FIRSTHEP
        </h1>
        <div class="mt-8 w-12 h-px bg-red-500 mx-auto" />
        <p class="mt-8 text-base text-zinc-400 max-w-lg mx-auto leading-relaxed font-light">
          จัดโต๊ะคอมสไตล์มินิมอล คุมโทนสีขาว<br>
          รีวิว Gaming Gear, Smart Home และ Gadget ที่คัดมาแล้วว่าดีจริง
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-3 sm:gap-5">
          <a
            href="https://www.youtube.com/c/FIRSTHEP"
            target="_blank"
            class="group flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:bg-red-600/20 hover:border-red-500/50 transition duration-300"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span class="text-sm sm:text-lg font-medium text-zinc-200 group-hover:text-white">YouTube</span>
          </a>
          <a
            href="https://www.instagram.com/firsthep/"
            target="_blank"
            class="group flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:bg-pink-600/20 hover:border-pink-500/50 transition duration-300"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <span class="text-sm sm:text-lg font-medium text-zinc-200 group-hover:text-white">Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/firstheps"
            target="_blank"
            class="group flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:bg-blue-600/20 hover:border-blue-500/50 transition duration-300"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span class="text-sm sm:text-lg font-medium text-zinc-200 group-hover:text-white">Facebook</span>
          </a>
        </div>
        <p class="mt-8 text-xs text-zinc-600 tracking-wider">53K subscribers &middot; 1.4K videos</p>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 px-6 border-y border-zinc-800/50">
      <div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        <div v-for="s in stats" :key="s.label">
          <p class="text-3xl font-bold text-white">{{ s.value }}</p>
          <p class="text-sm text-zinc-500 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="py-20 px-6" v-if="blogPosts.length">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">Blog</h2>
            <p class="text-zinc-500">บทความและรีวิวล่าสุด</p>
          </div>
          <a href="/blog" class="text-sm text-red-400 hover:text-red-300 transition">View All &rarr;</a>
        </div>
        <div class="grid sm:grid-cols-3 gap-4">
          <a
            v-for="post in blogPosts"
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
              <p class="mt-2 text-xs text-zinc-500">{{ post.created_at?.slice(0, 10) }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Setups Gallery -->
    <section id="setups" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-2">Setup Gallery</h2>
        <p class="text-zinc-500 mb-10">ไอเดียจัดโต๊ะคอมจาก FIRSTHEP</p>
        <div class="grid sm:grid-cols-2 gap-4">
          <a
            v-for="(s, i) in setups"
            :key="i"
            :href="s.url"
            target="_blank"
            class="group relative aspect-[16/9] rounded-2xl overflow-hidden"
          >
            <img :src="s.img" :alt="s.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div class="absolute bottom-0 inset-x-0 p-5">
              <p class="text-white font-semibold text-lg">{{ s.title }}</p>
              <p class="text-zinc-300 text-sm">{{ s.desc }}</p>
              <p class="text-zinc-500 text-xs mt-1">Budget ~{{ s.budget }} THB</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section id="reviews" class="py-20 px-6 bg-zinc-900/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-2">Latest Reviews</h2>
        <p class="text-zinc-500 mb-10">รีวิว Tech & Gadget ที่คัดมาแล้ว</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            v-for="(r, i) in reviews"
            :key="i"
            :href="r.url"
            target="_blank"
            class="group block rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 hover:bg-zinc-800/50 transition"
          >
            <div class="aspect-video overflow-hidden">
              <img :src="r.img" :alt="r.title" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="p-4">
              <span class="text-[10px] font-medium text-red-400 uppercase tracking-wider">{{ r.category }}</span>
              <h3 class="mt-1 font-semibold text-zinc-100 leading-snug text-sm">{{ r.title }}</h3>
              <p class="mt-2 text-xs text-zinc-500">{{ r.views }} views</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Popular Videos -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-2">Popular Videos</h2>
        <p class="text-zinc-500 mb-10">คลิปยอดนิยมที่คนดูเยอะที่สุด</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            v-for="(v, i) in popularVideos"
            :key="i"
            :href="v.url"
            target="_blank"
            class="group block rounded-xl overflow-hidden"
          >
            <div class="aspect-video overflow-hidden rounded-xl">
              <img :src="v.img" :alt="v.title" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            </div>
            <div class="pt-3">
              <h3 class="font-medium text-zinc-200 text-sm leading-snug line-clamp-2">{{ v.title }}</h3>
              <p class="mt-1 text-xs text-zinc-500">{{ v.views }} views</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Vlogs -->
    <section id="vlogs" class="py-20 px-6 bg-zinc-900/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-2">Travel & Vlog</h2>
        <p class="text-zinc-500 mb-10">บันทึกการเดินทางและรสชาติ</p>
        <div class="grid sm:grid-cols-3 gap-4">
          <a
            v-for="(v, i) in vlogs"
            :key="i"
            :href="v.url"
            target="_blank"
            class="group relative aspect-[16/10] rounded-2xl overflow-hidden"
          >
            <img :src="v.img" :alt="v.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div class="absolute bottom-0 inset-x-0 p-5">
              <p class="text-white font-semibold">{{ v.title }}</p>
              <p class="text-zinc-400 text-sm mt-1">{{ v.views }} views</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Brands -->
    <section class="py-16 px-6 border-y border-zinc-800/50">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-sm text-zinc-500 uppercase tracking-widest mb-8">Brands I've Worked With</p>
        <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <span v-for="b in brands" :key="b" class="text-zinc-500 font-medium text-sm hover:text-zinc-300 transition">{{ b }}</span>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-6">About FIRSTHEP</h2>
        <p class="text-zinc-400 leading-relaxed">
          สวัสดีค่ะ ปิ่นเองค่ะ! ปิ่นชอบจัดโต๊ะคอมสไตล์มินิมอลคุมโทนสีขาว
          รีวิว Gaming Gear, Smart Home, Desk Setup และ Gadget ที่ใช้จริงในชีวิตประจำวัน
          ช่องนี้จะพาทุกคนไปเจอไอเทมดีๆ ที่ช่วยให้พื้นที่ทำงานของคุณสวยขึ้นและใช้งานได้จริง
        </p>
        <p class="text-zinc-500 mt-4 leading-relaxed">
          เริ่มทำ YouTube มาตั้งแต่ปี 2017 ตอนนี้มีคลิปรีวิวมากกว่า 1,400 คลิป
          ครอบคลุมตั้งแต่ประกอบคอม PC Build, จัดโต๊ะทำงาน, เก้าอี้เพื่อสุขภาพ,
          ไปจนถึง Travel Vlog ทั้งในไทยและต่างประเทศ
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-2 text-sm">
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Desk Setup</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">PC Build</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Smart Home</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Gaming Gear</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Ergonomic Chair</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Travel Vlog</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">3D Print</span>
          <span class="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">Food Review</span>
        </div>
      </div>
    </section>

    <!-- Contact / Collab -->
    <section id="contact" class="py-20 px-6 bg-zinc-900/50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Collaboration</h2>
        <p class="text-zinc-400 mb-4">สนใจร่วมงาน สปอนเซอร์ หรือรีวิวสินค้า ติดต่อได้เลยค่ะ</p>
        <p class="text-zinc-500 text-sm mb-8">Product Review / Sponsored Content / Brand Ambassador / Event</p>
        <a
          href="mailto:first.pk16@gmail.com"
          class="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-500 transition shadow-lg shadow-red-600/20"
        >
          Get in Touch
        </a>
        <div class="mt-8 flex justify-center gap-6 text-sm text-zinc-500">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" class="hover:text-zinc-300 transition">
            {{ s.name }}
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-6 border-t border-zinc-800/50">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-600">
        <span>FIRSTHEP 2026</span>
        <span>Minimal Desk Setup & Tech Review</span>
      </div>
    </footer>
  </div>
</template>
