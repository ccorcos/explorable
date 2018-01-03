import * as React from "react"
import * as ReactDOM from "react-dom"
import * as glamor from "glamor"
import ReactRenderer from "markdown-it-renderer/ReactRenderer"
import Counter from "./components/Counter"
import * as MarkdownItComponent from "markdown-it-component"
import * as Tangle from "./components/Tangle"
import ColorPicker from "./components/ColorPicker"
import * as ast from "./article.md"

glamor.css.global("html", {
	padding: 0,
	margin: 0,
})

glamor.css.global("body", {
	padding: 0,
	margin: "1em 2em",
	maxWidth: "50em",
	fontFamily: '-apple-system, "Helvetica", "Arial", sans-serif',
	color: "#444",
	tabSize: 4,
})

glamor.css.global("img", {
	maxWidth: "100%",
})

const renderer = new ReactRenderer({
	tag: (name, props: any, children) => {
		if (name === "Counter") {
			return <Counter {...props} />
		}
		if (name === "Tangle") {
			if (props.eval) {
				return <Tangle.Output {...props} />
			} else {
				return <Tangle.Input {...props} />
			}
		}
		if (name === "ColorPicker") {
			return <ColorPicker />
		}
		// Fix the annoying div inside a p warning.
		if (name === "p") {
			return React.createElement(
				"div",
				{
					style: { margin: "1em 0" },
					...props,
				},
				...children
			)
		}
	},
})
const rendered = renderer.renderAst(ast)

const root = document.getElementById("root")
ReactDOM.render(<div>{rendered}</div>, root)
