<script setup lang="ts">
const token = useCookie('admin_token', { maxAge: 86400 })
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ data: { token: string } }>('/api/auth/login', {
      method: 'POST',
      body: { password: password.value },
    })
    token.value = res.data.token
    navigateTo('/admin/posts')
  } catch (e: any) {
    error.value = e.data?.message || 'Login failed'
  }
  loading.value = false
}

onMounted(() => {
  if (token.value) navigateTo('/admin/posts')
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-bold text-white text-center mb-8">Admin Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
        <button type="submit" :disabled="loading" class="w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-500 transition disabled:opacity-50">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p v-if="error" class="mt-4 text-red-400 text-sm text-center">{{ error }}</p>
    </div>
  </div>
</template>
