/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { makeMetroConfig } = require('@rnx-kit/metro-config')
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks')
const { getDefaultConfig } = require('metro-config')
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig()

  return makeMetroConfig({
    resolver: {
      resolveRequest: MetroSymlinksResolver(),
      sourceExts:
        process.env.MY_APP_MODE === 'mocked'
          ? [
              'mock.js',
              'mock.ts',
              'mock.json',
              'mock.tsx',
              ...defaultSourceExts,
              'svg',
            ]
          : [...defaultSourceExts, 'svg'],
      assetExts: assetExts.filter(ext => ext !== 'svg'),
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          // TODO: switch inlineRequires to true when all require cycles will be solved
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
  })
})()
