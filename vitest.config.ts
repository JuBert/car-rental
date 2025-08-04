/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./', import.meta.url)),
		},
	},
	test: {
		outputFile: {
			json: 'coverage/json-report.json',
		},
		globals: true,
		include: ['./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
			reporter: [
				'text',
				'json-summary',
			],
			all: true,
			exclude: [
				'**/*.config.{js,ts,vue}',
				'node_modules',
				'.nuxt',
				'.output',
				'test',
				'.pnpm-store',
				'build',
			],
			include: ['**/*.{js,ts,vue}'],
		},
	},
})
