import * as React from "react"
import Component from "reactive-magic/component"
import { Value } from "reactive-magic"
import Draggable, { Point } from "./Draggable"

export interface RangeProps {
	min: number
	max: number
	value: Value<number>
	decimal: number
	style?: React.CSSProperties
}

export default class Range extends Component<RangeProps> {
	private startValue: number = 0

	private handleDragStart = () => {
		this.startValue = this.props.value.get()
	}

	private handleDragMove = (offset: Point) => {
		const range = this.props.max - this.props.min
		const delta = offset.x / window.innerWidth * 2 * range

		this.props.value.set(
			Math.min(
				Math.max(this.startValue + delta, this.props.min),
				this.props.max
			)
		)
	}

	view() {
		const factor = Math.pow(10, this.props.decimal)
		return (
			<Draggable
				onDragStart={this.handleDragStart}
				onDragMove={this.handleDragMove}
				render={({ dragState, ...events }) => {
					return (
						<span
							style={{
								maring: 5,
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
