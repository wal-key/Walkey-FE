module.exports = {
    /**
     * WAL-16 add: husky 설정 추가
     */
    parserPreset: {
        parserOpts: {
            headerPattern: /^([A-Z]+-\d+)\s(add|remove|fix|update|refactor|rename|handle|apply):\s(.+)$/,
            headerCorrespondence: ['jira', 'type', 'subject'],
        },
    },

    rules: {
        // subject는 반드시 있어야 함
        'subject-empty': [2, 'never'],

        // 타입은 위에서 정의한 것만 허용
        'type-enum': [
            2,
            'always',
            ['add', 'remove', 'fix', 'update', 'refactor', 'rename', 'handle', 'apply'],
        ],

        // 타입은 소문자만
        'type-case': [2, 'always', 'lower-case'],

        // body는 자유 (길이 제한 없음)
        'body-max-line-length': [0, 'always'],
    },
}
