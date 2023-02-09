import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    require.resolve('@umijs/plugins/dist/locale'),
    require.resolve('@umijs/plugins/dist/model'),
  ],
  model: {},
  icons: {
    autoInstall: {},
  },
  mfsu: false,
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
    antd: false,
  },
});
