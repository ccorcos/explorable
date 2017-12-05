import * as React from "react"
import { Value } from "reactive-magic"
import Component from "reactive-magic/component"
import Slider from "./Slider"

function positionToColor(p: number) {
	return Math.round(p / 800 * 360)
}

export interface ColorPickerProps {}

export default class ColorPicker extends Component<ColorPickerProps> {
	private color1 = new Value(300)
	private color2 = new Value(750)

	view() {
		const backgroundImage = `linear-gradient(-90deg, hsl(${positionToColor(
			this.color1.get()
		)}, 100%, 50%), hsl(${positionToColor(this.color2.get())}, 100%, 50%))`
		return (
			<div>
				<div
					style={{
						position: "relative",
						height: 100,
						width: 800,
						backgroundImage:
							"linear-gradient(-90deg, hsl(0, 100%, 50%), hsl(240, 100%, 50%), hsl(120, 100%, 50%), hsl(0, 100%, 50%))",
					}}
				>
					<ColorKnob value={this.color1} />
					<ColorKnob value={this.color2} />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignContent: "center",
						justifyContent: "center",
						height: 100,
						width: 800,
						backgroundImage,
					}}
				>
					<span style={{ textAlign: "center", color: "white" }}>
						{backgroundImage}
					</span>
				</div>
			</div>
		)
	}
}

interface ColorKnobProps {
	value: Value<number>
}

class ColorKnob extends Component<ColorKnobProps> {
	view() {
		return (
			<Slider
				min={0}
				max={800}
				value={this.props.value}
				render={({ dragState, ...events }) => {
					return (
						<div
							{...events}
							style={{
								userSelect: "none",
								cursor: "ew-resize",
								height: 20,
								width: 20,
								borderRadius: 20,
								border: "2px solid white",
								position: "absolute",
								top: 40,
								left: this.props.value.get() - 10,
								backgroundColor: `hsl(${positionToColor(
									this.props.value.get()
								)}, 100%, 50%)`,
							}}
						/>
					)
				}}
			/>
		)
	}
}
