import * as React from "react"
import * as ReactDOM from "react-dom"
import { css } from "glamor"
import * as article from "raw-loader!./article.md"
import ReactRenderer from "markdown-it-renderer/ReactRenderer"
import Counter from "./components/Counter"
import * as MarkdownItComponent from "markdown-it-component"
import * as interest from "./interest"
import Range from "./components/Range"
import Render from "./components/Render"
import ColorPicker from "./components/ColorPicker"
import images from "./images"

css.global("a", {
	color: "inherit",
	textDecoration: "none",
})

const renderer = new ReactRenderer(
	{
		tag: (name, props, children) => {
			if (name === "img") {
				return <img {...props} src={images[props.src]} />
			}
			if (name === "Counter") {
				return <Counter {...props} />
			}
			if (name === "Invest") {
				return (
					<Range
						min={0}
						max={10000}
						decimal={0}
						value={interest.contribution}
					/>
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
			// Total
			// ColorPicker
			// ColorSwatch
		},
	},
	[MarkdownItComponent({ jsonData: true })]
)
const rendered = renderer.render(article)

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<div>{rendered}</div>, root)
