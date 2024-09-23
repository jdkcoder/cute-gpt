import {
   defineConfig,
   presetAttributify,
   presetIcons,
   presetTypography,
   presetUno,
   presetWebFonts,
   transformerDirectives,
   transformerVariantGroup
} from 'unocss'

export default defineConfig({
   shortcuts: [
      // ...
   ],
   theme: {
      colors: {
         // ...
      }
   },
   presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
         cdn: 'https://esm.sh/',
         autoInstall: true
      }),
      presetTypography(),
      presetWebFonts({
         fonts: {
            // ...
         },
      }),
   ],
   transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
   ],
   content: {
      pipeline: {
         include: [
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
            'src/**/*.{js,ts}',
            'src/**/*.stories.{js,ts}',
         ],
      },
   },
})