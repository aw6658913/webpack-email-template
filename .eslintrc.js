module.exports = {
    extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    globals: {
        ENV: true,
        PUBLISH_ENV: true,
        MOCK_API_PREFIX: true,
        page: true,
        PATH_PREFIX: true,
        APP_TYPE: true
    },
    rules: {
        indent: [2, 4, { SwitchCase: 1 }],
        'react/jsx-props-no-spreading': 0,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        '@typescript-eslint/indent': [2, 4],
        'comma-dangle': [2, 'never'],
        'no-console': 0,
        'max-len': [
            2,
            {
                code: 120,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ]
    }
};
