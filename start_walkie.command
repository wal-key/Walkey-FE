#!/bin/bash
cd "$(dirname "$0")"
echo "Walkie 서버를 시작합니다..."
echo "잠시 후 브라우저가 자동으로 실행됩니다."
npm install # 필요한 경우 의존성 설치
open http://localhost:5173
npm run dev
