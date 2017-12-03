import * as React from "react"
import Component from "reactive-magic/component"
import { Value } from "reactive-magic"
import Draggable, { Point, DraggableProps } from "./Draggable"

export interface SliderProps {
	min: number
	max: number
	value: Value<number>
	scale?: number
	render: DraggableProps["render"]
}

export default class Slider extends Component<SliderProps> {
	private startValue: number = 0

	private handleDragStart = () => {
		this.startValue = this.props.value.get()
	}

	private handleDragMove = (offset: Point) => {
		const delta =
			offset.x * (this.props.scale === undefined ? 1 : this.props.scale)
		this.props.value.set(
			Math.min(
				Math.max(this.startValue + delta, this.props.min),
				this.props.max
			)
		)
	}

	view() {
		return (
			<Draggable
				onDragStart={this.handleDragStart}
				onDragMove={this.handleDragMove}
				render={this.props.render}
			/>
		)
	}
}
