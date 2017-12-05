import * as React from "react"
import Component from "reactive-magic/component"
import { Value } from "reactive-magic"

export interface CounterProps {
	delta?: number
}

export default class Counter extends Component<CounterProps> {
	private count = new Value(0)

	private handleInc = e => {
		this.count.update(x => x + (this.props.delta || 1))
	}

	private handleDec = e => {
		this.count.update(x => x - (this.props.delta || 1))
	}

	view() {
		return (
			<div>
				<button onClick={this.handleDec}>{"-"}</button>
				<span style={{ margin: 5, textAlign: "center" }}>
					{this.count.get()}
				</span>
				<button onClick={this.handleInc}>{"+"}</button>
			</div>
		)
	}
}
