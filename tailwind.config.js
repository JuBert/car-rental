export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./nuxt.config.{js,ts}',
		'./app/**/*.{js,vue,ts}',
	],
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		extend: {
			textColor: {
				prominent: 'var(--primary-1000)',
				standard: 'var(--primary-900)',
				subtle: 'var(--primary-800)',
			},
			colors: {
				primary: {
					prominent: 'var(--primary-700)',
					standard: 'var(--primary-500)',
					subtle: 'var(--primary-400)',
				},
			},
			fontWeight: {
				'step-1': 300,
				'step-2': 600,
				'step-3': 800,
			},
			fontSize: {
				h1: 'clamp(2.125rem, calc(1.52rem + 3.04vw), 4.25rem)', // ~34px
				h2: 'clamp(1.75rem, calc(1.25rem + 2.50vw), 3.50rem)', // ~28px
				h3: 'clamp(1.50rem, calc(1.29rem + 1.07vw), 2.25rem)', // ~24px
				h4: 'clamp(1.25rem, calc(1.11rem + 0.71vw), 1.75rem)', // ~20px
				subtitle: 'clamp(1.125rem, calc(1.00rem + 0.64vw), 1.58rem)', // ~18px
				'body-1': 'clamp(1.00rem, calc(0.94rem + 0.29vw), 1.20rem)', // ~16px
				'body-2': 'clamp(0.875rem, calc(0.83rem + 0.25vw), 1.05rem)', // ~14px
				caption: 'clamp(0.75rem, calc(0.71rem + 0.21vw), 1.05rem)', // ~12px
				tiny: 'clamp(0.625rem, 0.4688rem + 0.5vw, 0.75rem)', // ~10px
			},
		},
	},
}
