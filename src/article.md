# Explorable Explanations with Markdown Demo

This demo shows how easy it is to create [explorable explanations](http://explorabl.es/) with markdown.

This project uses a markdown syntax `[ComponentName]{prop: "value"}` to render React components inline!

You can find the repo for this demo [here](https://github.com/ccorcos/explorable) and the raw markdown source file [here](https://raw.githubusercontent.com/ccorcos/explorable/master/src/article.md).

# Examples

- Render a component:

	[Counter]{}

- Render a component with props:

	[Counter]{delta: 10}

- Create [Tangle-like](http://worrydream.com/Tangle/) interactive components.

	> If you put $[Invest]{} per year into an investment that makes [Interest]{}% interest, then after [Time]{} years, you'll have [Total]{}!

- Embed rich interactive media into your documents.

	[ColorPicker]{}

	[ColorSwatch]{}

- Embed an image:

	![](./static/leaves.jpg)