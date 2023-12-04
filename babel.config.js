const presets = ['@rnx-kit/babel-preset-metro-react-native']
const plugins = ['lodash']

plugins.push(
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        tests: ['./tests/'],
        '@': './src',
      },
    },
  ],
  'react-native-reanimated/plugin',
)

module.exports = {
  presets,
  plugins,
}
