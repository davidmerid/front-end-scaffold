const { withTamagui } = require('@tamagui/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'solito',
    'react-native-web',
    'react-native',
    '@scaffold/app',
    '@scaffold/ui',
    'tamagui',
    '@tamagui/core',
    '@tamagui/config',
    '@tamagui/sheet',
    '@tamagui/select',
    '@tamagui/toast',
  ],
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = function () {
  let config = nextConfig

  const tamaguiPlugin = withTamagui({
    config: '../../packages/ui/src/tamagui.config.ts',
    components: ['tamagui'],
    appDir: true,
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  })

  return {
    ...config,
    ...tamaguiPlugin(config),
  }
}
