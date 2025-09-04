import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
// import lineClamp from '@tailwindcss/line-clamp'
export default defineConfig({
  plugins: [
    tailwindcss(),
    typography,
    forms,
    // lineClamp,
  ],
  server: {
      port: 5500,   // ✅ change port here
  },
})

// http://localhost:5500/