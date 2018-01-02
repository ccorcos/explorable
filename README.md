# Explorable Explanations with Markdown [[Demo](http://ccorcos.github.io/explorable)]

This repo shows how easy it is to create [explorable explanations](http://explorabl.es/) with markdown.

This project uses a markdown syntax `[ComponentName]{prop: "value"}` to render React components inline!

## Getting Started

If you want to make your own explorable explanation using this repo...

```sh
npm install
npm start
```

Write your article in `article.md` and import any components you want to use in `index.tsx`.

When you want to publish, run `npm run release` and the page will appear in `<username>.github.io/<project>`.