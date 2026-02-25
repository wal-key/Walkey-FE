import ky from 'ky';

// 1. 공통 설정 만들기
export const api = ky.create({
    prefixUrl: 'https://walkey-be.onrender.com',
    credentials: 'include', // 쿠키 전송 허용 (요청 보낼 때 쿠키도 같이 보내겠다는 거임)

    headers: {
        'content-type': 'application/json',
    },

    // 훅 설정
    hooks: {
        //요청 전에 실행
        beforeRequest: [
            (req) => {
                // 로그인 토큰이 있으면 꺼내서 넣기 없으면 아쉬운 거지
                // 토큰 없다고 했어서 아마 나중에 유저 정보를 쿠키 같은데다 넣고 할 듯
                const token = localStorage.getItem('accessToken');
                if (token) {
                    req.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
        // 요청 후에 실행
        afterResponse: [
            (_req, _opt, res) => {
                // 로그인이 풀렸을 때(401) 처리
                if (res.status === 401) {
                    console.log('로그인이 만료되었습니다.');
                    localStorage.removeItem('accessToken');
                }

            }
        ]
    },
});

// Hooks 다른 기능
// beforeRetry (재시도 직전) : 요청이 실패해서 "다시 시도(Retry)"하기 직전에 실행
// beforeError (에러 발생 직전): 에러가 catch문으로 넘어가기 직전에 가로챔

// 그냥 다른 기능
// retry (재시도 설정)
// onDownloadProgress (다운로드 진행률)