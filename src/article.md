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

	> If you put $[Tangle]{
			name: "contribution",
			init: 1000,
			min: 1,
			max: 10000,
			decimal: 0
		} per year into an investment that makes [Tangle]{
			name: "interest",
			init: 5,
			min: 1,
			max: 20,
			decimal: 1
		}% interest, then after [Tangle]{
			name: "years",
			init: 10,
			min: 1,
			max: 100,
			decimal: 0
		} years, you'll have $[Tangle]{
			name: "total",
			decimal: 0,
			eval: "contribution() / (interest() / 100) * (pow(1 + interest() / 100, years() + 1) - (1 + interest() / 100))"
		}!

- Embed rich interactive media into your documents.

	[ColorPicker]{}

- Embed an image:

	![](./static/leaves.jpg)