import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      prerender({
        routes: [
          '/', 
          '/profil/sejarah', 
          '/profil/visi-misi', 
          '/profil/struktur', 
          '/profil/akreditasi', 
          '/akademik/kurikulum', 
          '/akademik/pembelajaran', 
          '/fasilitas', 
          '/galeri', 
          '/alumni/pendataan', 
          '/alumni/statistik'
        ],
        renderer: new PuppeteerRenderer({
          // Wait 5 seconds to ensure React Suspense and Supabase fetches are complete
          renderAfterTime: 5000
        }),
        server: {
          port: 3000
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
