import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import axios from 'axios'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL || 'http://localhost:3000/api';

  let dynamicRoutes = [];
  try {
    const response = await axios.get(`${apiUrl}/posts`);
    dynamicRoutes = response.data.map(post => `/blog/${post.slug}`);
  } catch (error) {
    console.error('Sitemap generation: Could not fetch posts', error.message);
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: 'https://hexnotes.vercel.app',
        dynamicRoutes: [
          '/blog',
          '/create',
          '/login',
          ...dynamicRoutes
        ]
      })
    ],
  }
})
