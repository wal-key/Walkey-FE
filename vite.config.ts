import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // 모든 네트워크 인터페이스에서 접속 허용
        host: '0.0.0.0',
        // 현재 사용 중인 포트 (기본은 5173이지만, API와 맞추려면 3001 등 설정 가능)
        port: 5173,
    },
})