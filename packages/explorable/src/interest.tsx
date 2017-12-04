import { Value, DerivedValue } from "reactive-magic"

export const principle = new Value(0)
export const contribution = new Value(1000)
export const interest = new Value(0.05)
export const time = new Value(10)
export const total = new DerivedValue(() => {
	const p = principle.get()
	const c = contribution.get()
	const r = interest.get()
	const y = time.get()
	// http://www.moneychimp.com/articles/finworks/fmbasinv.htm
	return p * Math.pow(1 + r, y) + c / r * (Math.pow(1 + r, y + 1) - (1 + r))
})
