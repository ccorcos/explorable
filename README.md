# Explorable Explanations with Markdown

This repo shows how easy it is to create [explorable explanations](http://explorabl.es/) with markdown.

This project uses the [`markdown-it-component`](https://github.com/ccorcos/markdown-it-component) plugin and the [`markdown-it-renderer`](https://github.com/ccorcos/markdown-it-renderer) to allow you to render React components using a new syntax `[ComponentName]{prop: "value"}`. This makes it much easier to write long-form content with interactive bits litered throughout.

## Getting Started

If you want to make your own explorable explanation using this repo...

```sh
npm install
npm run compile # compiled all the images into images.ts
npm start
```

Write your article in `article.md` and import any components you want to use in `index.tsx`.

When you want to publish, create a `gh-pages` branch and push it to Github (you only need to do this the first time).

```
git checkout -b gh-pages
git push origin gh-pages
git checkout master
```

Then you can deploy with `npm run release` and the page will appear in `<username>.github.io/<project>`.