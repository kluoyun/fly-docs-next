// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FLY Docs',
  tagline: 'Klipper documentation for FLY products',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mellow.klipper.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kluoyun', // Usually your GitHub org/user name.
  projectName: 'fly-docs-next', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en', 'ja', 'fr', 'de', 'ru', 'ko'],
  },
  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          disableVersioning: false,
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/kluoyun/fly-docs-next/tree/master/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          editUrl:
            'https://github.com/kluoyun/fly-docs-next/tree/master/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
          ]
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      metadata: [
        { name: 'keywords', content: 'fly, fly3d, mellow, 3dmellow, klipper, rrf, 3dprinter, fly-sb2040, fly-sht36' },
      ],
      navbar: {
        title: 'Klipper Docs',
        logo: {
          alt: 'FLY Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '产品文档',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'debugdocSidebar',
            label: '调试文档',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'toolsdocSidebar',
            label: '实用工具',
          },
          { to: '/blog', label: '动态', position: 'left' },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'resdownSidebar',
            label: '资源下载',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
            queryString: '?persistLocale=true',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://gitlocalize.com/repo/9688',
                label: 'Help Us Translate',
              },
            ],
          },
          {
            href: 'https://github.com/Mellow-3D/klipper-docs',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '产品文档',
                to: '/docs/intro',
              },
              {
                label: '调试文档',
                to: '/docs/debug-doc',
              },
              {
                label: '原文档站',
                href: 'https://mellow-old.klipper.cn',
              },
            ],
          },
          {
            title: '客户服务',
            items: [
              {
                label: '解决方案',
                to: 'mailto:service@3dmellow.com',
              },
              {
                label: '技术支持',
                to: 'mailto:service@3dmellow.com',
              },
              {
                label: '联系我们',
                to: 'mailto:service@3dmellow.com',
              },
            ],
          },
          {
            title: '产品选型',
            items: [
              {
                label: '淘宝',
                href: 'https://shop126791347.taobao.com/',
              },
              {
                label: 'Aliexpress',
                href: 'https://mellow.aliexpress.com/',
              }
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'QQ Group',
                href: 'https://qm.qq.com/q/WtBuUgkIWC',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/qMvp24jWNw',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/groups/395979321769632',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '新闻动态',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Mellow-3D',
              },
            ],
          },
        ],
        logo: {
          alt: 'Mellow Logo',
          src: '/img/logo.png',
          width: 64,
          height: 64,
          href: 'https://mellow.klipper.cn',
        },
        copyright: `Copyright © ${new Date().getFullYear()} 3D Mellow, Inc. All rights reserved`,
      },
      announcementBar: {
        id: `announcementBar-next`,
        content: `🎉️ <b>全新文档站点测试</b> 🥳️`,
      },
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        additionalLanguages: [
          'powershell',
          'bash',
          'diff',
          'json',
          'python',
          'yaml',
          'ini',
          'toml',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
        theme: prismThemes.oneLight,
        darkTheme: prismThemes.oneDark,
      },
      algolia: {
        appId: 'LZ40BJW1SW',
        apiKey: '729491300f69121a45f199542a7bac71',
        indexName: 'mellow-next-klipper',
        container: '### REPLACE ME WITH A CONTAINER (e.g. div) ###',
        contextualSearch: true,
        facetFilters: ["language:zh-Hans", ["docusaurus_tag:default", "docusaurus_tag:docs-default-current"]],
      },
    }),
};

export default config;
