import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	root: '',
	server: {
		host: '0.0.0.0',
		port: 3456,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './', 'src/'),
			'@pages': path.resolve(__dirname, './', 'src/pages'),
			'@config': path.resolve(__dirname, './', 'src/config'),
			'@utils': path.resolve(__dirname, './', 'src/utils'),
			'@services': path.resolve(__dirname, './', 'src/services'),
			'@components': path.resolve(__dirname, './', 'src/components'),
		}
	},
	// 配置less
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					'primary-color': '#ff4a4a',
					'text-color-dark': '#333333'
				},
				javascriptEnabled: true
			}
		}
	}
})
