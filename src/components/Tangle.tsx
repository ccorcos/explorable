import * as React from "react"
import Component from "reactive-magic/component"
import { Gettable, Value, DerivedValue } from "reactive-magic"
import * as math from "mathjs"
import Slider from "./Slider"

const parser = math.parser()
const inputs: { [name: string]: Value<number> } = {}
const outputs: { [name: string]: DerivedValue<number> } = {}

export interface InputProps {
	name: string
	init: number
	min: number
	max: number
	decimal: number
	style?: React.CSSProperties
}

export class Input extends Component<InputProps> {
	value: Value<number>

	willMount() {
		if (!inputs[this.props.name]) {
			inputs[this.props.name] = new Value(this.props.init)
			parser.set(this.props.name, () => {
				return inputs[this.props.name].get()
			})
		}
		this.value = inputs[this.props.name]
	}

	view() {
		const factor = Math.pow(10, this.props.decimal)
		return (
			<Slider
				min={this.props.min}
				max={this.props.max}
				value={this.value}
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
							{Math.round(this.value.get() * factor) / factor}
						</span>
					)
				}}
			/>
		)
	}
}

export interface OutputProps {
	name: string
	eval: string
	decimal: number
}

export class Output extends Component<OutputProps> {
	value: DerivedValue<number>

	willMount() {
		if (!outputs[this.props.name]) {
			outputs[this.props.name] = new DerivedValue(() => {
				return parser.eval(this.props.eval)
			})
			parser.set(this.props.name, () => {
				return outputs[this.props.name].get()
			})
		}
		this.value = outputs[this.props.name]
	}

	view() {
		const factor = Math.pow(10, this.props.decimal)
		return <span>{Math.round(this.value.get() * factor) / factor}</span>
	}
}
