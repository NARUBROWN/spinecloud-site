English | [Korean](README.ko.md)

# Spine Cloud Website

A VitePress site with `home.spinecloud.dev` as its planned address. It provides product information and technical documentation for the open beta. Technical documentation distinguishes verified operational behavior from unresolved questions.

## Run locally

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

Static output is generated in `.vitepress/dist`. Domain connection and deployment settings have not been applied yet.

## Pages and content

The homepage lives in `.vitepress/theme/Layout.vue`; deployment demonstrations use `.vitepress/theme/components/DeployDemo.vue`. Styles are in `.vitepress/theme/style.css`. The logo and favicon use the same SVG as `spinecloud.dev`. Public Sans loads from its package; its license is included in `public/licenses/public-sans.txt`. The homepage and technical documentation share the dashboard's dark theme and button styles.

[FastAPI Cloud](https://fastapicloud.com/) informed the product introduction, command demonstrations, deployment flow, and operational feature structure. Spine Cloud descriptions are based on the separate product repository's README and verification records. Application names and URLs in the terminal demonstration are illustrative. `ProductDemo.vue` presents features using a Vue interface based on the actual dashboard design. Application lists and deployment history are switchable; account connection and environment variable forms are illustrative. Displayed names and URLs are example data and do not modify real accounts or deployments. `product-demo-locales.json` manages Korean, English, Japanese, Simplified Chinese, and Traditional Chinese copy.

Visual verification artifacts are stored in Git-ignored `output/playwright`, including 1440px, 768px, and 390px captures, taste checks, and design review records.
