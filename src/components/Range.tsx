import * as React from "react"
import Component from "reactive-magic/component"
import { Value } from "reactive-magic"

export interface RangeProps {
	min: number
	max: number
	value: Value<number>
	decimal: number
	style?: React.CSSProperties
}

type DragState =
	| {
			dragging: true
			startX: number
			startValue: number
			valueRange: number
		}
	| { dragging: false }

export default class Range extends Component<RangeProps> {
	willUnmount() {
		this.stopListeners()
	}

	private dragState: DragState = { dragging: false }

	private handleMouseDown = (e: React.MouseEvent<any>) => {
		const value = this.props.value.get()
		this.dragState = {
			dragging: true,
			startX: e.clientX,
			startValue: value,
			valueRange: this.props.max - this.props.min,
		}
		this.startListeners()
	}

	private startListeners() {
		window.addEventListener("mousemove", this.handleMouseMove)
		window.addEventListener("mouseup", this.handleMouseUp)
	}

	private stopListeners() {
		window.removeEventListener("mousemove", this.handleMouseMove)
		window.removeEventListener("mouseup", this.handleMouseUp)
	}

	private handleMouseMove = (e: MouseEvent) => {
		if (this.dragState.dragging) {
			const delta =
				(e.clientX - this.dragState.startX) /
				window.innerWidth /
				2 *
				this.dragState.valueRange
			this.props.value.set(
				Math.min(
					Math.max(this.dragState.startValue + delta, this.props.min),
					this.props.max
				)
			)
		}
	}

	private handleMouseUp = (e: MouseEvent) => {
		this.dragState = { dragging: false }
		this.stopListeners()
	}

	view() {
		const factor = Math.pow(10, this.props.decimal)
		return (
			<span
				style={{
					maring: 5,
					userSelect: "none",
					cursor: "ew-resize",
					...this.props.style,
				}}
				onMouseDown={this.handleMouseDown}
			>
				{Math.round(this.props.value.get() * factor) / factor}
			</span>
		)
	}
}
