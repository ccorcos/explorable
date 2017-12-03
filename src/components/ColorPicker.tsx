import * as React from "react"
import Component from "reactive-magic/component"

export interface ColorPickerProps {}

export default class ColorPicker extends Component<ColorPickerProps> {
	view() {
		return (
			<div
				style={{
					height: 100,
					width: 800,
					backgroundImage:
						"linear-gradient(-90deg, hsl(0, 100%, 50%), hsl(120, 100%, 50%), hsl(240, 100%, 50%), hsl(0, 100%, 50%))",
				}}
			/>
		)
	}
}
