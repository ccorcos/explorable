import * as React from "react"
import Component from "reactive-magic/component"

export interface RenderProps {
	render: () => React.ReactNode
}

export default class Render extends Component<RenderProps> {
	view() {
		return this.props.render() as any
	}
}
