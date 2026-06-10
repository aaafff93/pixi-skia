import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            skia: path.resolve(__dirname, 'src/modules/skia'),
        },
    },
})