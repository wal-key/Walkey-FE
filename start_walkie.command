#!/bin/bash
export PATH=$PATH:/usr/local/bin
cd "$(dirname "$0")"

echo "Walkie 서버를 시작합니다..."

# node/npm 확인
if ! command -v npm &> /dev/null; then
    echo "오류: npm을 찾을 수 없습니다. Node.js가 설치되어 있는지 확인해주세요."
    read -p "엔터 키를 눌러 종료하세요..."
    exit 1
fi

echo "패키지 설치 확인 중..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "브라우저 실행 준비 중..."
# 백그라운드에서 브라우저 열기 (3초 딜레이)
(sleep 3 && open http://localhost:5173) &

echo "개발 서버 실행 (Vite)..."
npm run dev

# 서버가 종료되면 창이 닫히지 않도록 대기
read -p "서버가 종료되었습니다. 엔터 키를 눌러 창을 닫으세요..."
