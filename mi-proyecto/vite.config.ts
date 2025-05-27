import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/', // Asegúrate de esto para el despliegue en la raíz del dominio
  build: {
    outDir: 'dist' // Esto es lo que Vercel necesita
  }
})

