module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', 'react', 'react-hooks', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['error'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
      typescript: {},
    },
  },
  ignorePatterns: ['react-native.config.js'],
}
