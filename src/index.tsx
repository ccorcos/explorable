import * as React from "react"
import * as ReactDOM from "react-dom"
import { css } from "glamor"
import * as article from "raw-loader!./article.md"
import ReactRenderer from "markdown-it-renderer/ReactRenderer"
import Counter from "./components/Counter"
import * as MarkdownItComponent from "markdown-it-component"

css.global("a", {
	color: "inherit",
	textDecoration: "none",
})

const renderer = new ReactRenderer(
	{
		tag: (name, props, children) => {
			if (name === "Counter") {
				return <Counter {...props} />
			}
		},
	},
	[MarkdownItComponent({ jsonData: true })]
)
const rendered = renderer.render(article)

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<div>{rendered}</div>, root)
