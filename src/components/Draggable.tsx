import * as React from "react"
import { Value } from "reactive-magic"
import Component from "reactive-magic/component"

export type Point = {
	x: number
	y: number
}

export type DragMouseEvent = React.MouseEvent<Element> | MouseEvent
export type DragTouchEvent = React.TouchEvent<Element> | TouchEvent

type DragState =
	| {
			dragging: false
		}
	| {
			dragging: true
			touchId: number | undefined
			offset: Point
			prev: Point
			current: Point
		}

export interface RenderProps {
	onMouseDown: (e: DragMouseEvent) => void
	onTouchStart: (e: DragTouchEvent) => void
	dragState: DragState
}

export interface DraggableProps {
	render: (props: RenderProps) => JSX.Element
	onDragStart?: (offset: Point) => void
	onDragMove?: (offset: Point) => void
	onDragEnd?: (offset: Point) => void
}

export default class Draggable extends Component<DraggableProps> {
	private dragState: Value<DragState> = new Value({ dragging: false as false })

	willUnmount() {
		this.stopWindowListeners()
	}

	private startWindowListeners() {
		window.addEventListener("mousemove", this.handleMouseMove)
		window.addEventListener("mouseup", this.handleMouseUp)
		window.addEventListener("touchmove", this.handleTouchMove)
		window.addEventListener("touchend", this.handleTouchEnd)
	}

	private stopWindowListeners() {
		window.removeEventListener("mousemove", this.handleMouseMove)
		window.removeEventListener("mouseup", this.handleMouseUp)
		window.removeEventListener("touchmove", this.handleTouchMove)
		window.removeEventListener("touchend", this.handleTouchEnd)
	}

	private handleDown = (p: Point, touchId?: number) => {
		this.dragState.set({
			dragging: true,
			touchId,
			prev: p,
			current: p,
			offset: { x: 0, y: 0 },
		})
		this.startWindowListeners()
		if (this.props.onDragStart) {
			this.props.onDragStart({ x: 0, y: 0 })
		}
	}

	private handleMouseDown = (e: DragMouseEvent) => {
		this.handleDown({ x: e.pageX, y: e.pageY })
	}

	private handleTouchStart = (e: DragTouchEvent) => {
		const touch = e.changedTouches[0]
		this.handleDown({ x: touch.pageX, y: touch.pageY }, touch.identifier)
	}

	private currentTouch = (e: DragTouchEvent) => {
		const state = this.dragState.get()
		if (state.dragging) {
			const touches = e.changedTouches
			for (let i = 0; i < touches.length; i++) {
				const touch = touches[i]
				if (touch.identifier === state.touchId) {
					return touch
				}
			}
		}
	}

	private handleMove = (p: Point) => {
		const state = this.dragState.get()
		if (state.dragging) {
			const { touchId, current, offset, prev } = state
			const newOffset = {
				x: offset.x + current.x - prev.x,
				y: offset.y + current.y - prev.y,
			}
			this.dragState.set({
				dragging: true,
				touchId,
				prev: current,
				current: p,
				offset: newOffset,
			})
			if (this.props.onDragMove) {
				this.props.onDragMove(newOffset)
			}
		}
	}

	private handleMouseMove = (e: DragMouseEvent) => {
		this.handleMove({ x: e.pageX, y: e.pageY })
	}

	private handleTouchMove = (e: DragTouchEvent) => {
		const touch = this.currentTouch(e)
		if (touch) {
			this.handleMove({ x: touch.pageX, y: touch.pageY })
		}
	}

	private handleUp = () => {
		const state = this.dragState.get()
		if (state.dragging) {
			if (this.props.onDragEnd) {
				this.props.onDragEnd(state.offset)
			}
			this.dragState.set({ dragging: false })
			this.stopWindowListeners()
		}
	}

	private handleMouseUp = (e: DragMouseEvent) => {
		this.handleUp()
	}

	private handleTouchEnd = (e: DragTouchEvent) => {
		const touch = this.currentTouch(e)
		if (touch) {
			this.handleUp()
		}
	}

	view({ render }: DraggableProps) {
		return render({
			onMouseDown: this.handleMouseDown,
			onTouchStart: this.handleTouchStart,
			dragState: this.dragState.get(),
		})
	}
}
