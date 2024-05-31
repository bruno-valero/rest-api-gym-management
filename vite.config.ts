// @ts-ignore
import tsconfigPaths from 'vite-tsconfig-paths'
// @ts-ignore
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins:[tsconfigPaths()],
    test:{
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma']
        ]
    }
})