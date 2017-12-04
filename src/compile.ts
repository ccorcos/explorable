import * as fs from "fs"
import StringRenderer from "markdown-it-renderer/StringRenderer"

const images: Set<string> = new Set()

const renderer = new StringRenderer({
	tag: (name, props, children) => {
		if (name === "img") {
			images.add(props.src)
		}
		return undefined
	},
})

const article = fs.readFileSync(`${__dirname}/article.md`, "utf8")

renderer.render(article)

const lines = Array.from(images).map(src => {
	return `	"${src}": require("file-loader!${src}"),`
})

const file = `

const images = {
	${lines.join("\n")}
}

export default images

`

fs.writeFileSync(`${__dirname}/images.ts`, file, "utf8")
