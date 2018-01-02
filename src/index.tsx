import * as React from "react"
import * as ReactDOM from "react-dom"
import * as glamor from "glamor"
import ReactRenderer from "markdown-it-renderer/ReactRenderer"
import Counter from "./components/Counter"
import * as MarkdownItComponent from "markdown-it-component"
import * as interest from "./interest"
import Range from "./components/Range"
import Render from "./components/Render"
import ColorPicker from "./components/ColorPicker"
import * as ast from "./article.md"

console.log(ast)

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
	tag: (name, props, children) => {
		if (name === "Counter") {
			return <Counter {...props} />
		}
		if (name === "Invest") {
			return (
				<Range min={0} max={10000} decimal={0} value={interest.contribution} />
			)
		}
		if (name === "Interest") {
			return (
				<Range min={0.01} max={0.2} decimal={2} value={interest.interest} />
			)
		}
		if (name === "Time") {
			return <Range min={1} max={100} decimal={0} value={interest.time} />
		}
		if (name === "Total") {
			return (
				<Render
					render={() => <span>{Math.round(interest.total.get())}</span>}
				/>
			)
		}
		if (name === "ColorPicker") {
			return <ColorPicker />
		}
	},
})
const rendered = renderer.renderAst(ast)

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<div>{rendered}</div>, root)
