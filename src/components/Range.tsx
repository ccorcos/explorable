import * as React from "react"
import Component from "reactive-magic/component"
import { Value } from "reactive-magic"
import Slider from "./Slider"

export interface RangeProps {
	min: number
	max: number
	value: Value<number>
	decimal: number
	style?: React.CSSProperties
}

export default class Range extends Component<RangeProps> {
	view() {
		const factor = Math.pow(10, this.props.decimal)
		return (
			<Slider
				min={this.props.min}
				max={this.props.max}
				value={this.props.value}
				scale={1 / window.innerWidth * 2 * (this.props.max - this.props.min)}
				render={({ dragState, ...events }) => {
					return (
						<span
							style={{
								userSelect: "none",
								cursor: "ew-resize",
								...this.props.style,
							}}
							{...events}
						>
							{Math.round(this.props.value.get() * factor) / factor}
						</span>
					)
				}}
			/>
		)
	}
}
