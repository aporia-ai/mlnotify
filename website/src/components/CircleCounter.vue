<template>
	<svg class="circle-counter" :viewBox="`0 0 ${UNITS} ${UNITS}`" :height="size || '100%'" :width="size || '100%'">
		<g
			:transform="
				`rotate(${rotate},${UNITS / 2},${UNITS / 2}) ${
					reverse ? 'scale(1,-1) translate(0, -' + UNITS + ')' : ''
				}`
			"
		>
			<circle
				:cx="UNITS / 2"
				:cy="UNITS / 2"
				:r="getRadius()"
				:stroke="stroke"
				:stroke-width="getStrokeWidth(strokeWidth)"
				fill="none"
				:stroke-dasharray="getLengths()"
				stroke-linecap="round"
			/>
			<path
				:d="describeArc(UNITS / 2, UNITS / 2, getRadius(), 0, activeEnd())"
				fill="none"
				:stroke="activeStroke ? activeStroke : 'url(#paint0_linear)'"
				:stroke-width="activeCount === 0 ? 0 : getStrokeWidth(activeWidth)"
				stroke-linecap="round"
				:stroke-dasharray="getLengths()"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear"
				x1="707.838"
				y1="579.252"
				x2="471.483"
				y2="823.527"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#48CFAD" />
				<stop offset="1" stop-color="#00AFFF" />
			</linearGradient>
		</defs>
	</svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		size: {
			type: String,
			default: '',
		},
		text: {
			type: String,
			default: '',
		},
		dashCount: {
			type: Number,
			default: 60,
		},
		activeCount: {
			type: Number,
			default: 10,
		},
		strokeWidth: {
			type: Number,
			default: 20,
		},
		activeWidth: {
			type: Number,
			default: 20,
		},
		stroke: {
			type: String,
			default: 'lightgrey',
		},
		activeStroke: {
			type: String,
			default: '',
		},
		dashSpacing: {
			type: Number,
			default: 1 / 3,
		},
		rotate: {
			type: Number,
			default: -90,
		},
		reverse: {
			type: Boolean,
			default: false,
		},
		success: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			UNITS: 300,
		}
	},
	created(): void {
		// Arbitrary dimensions of SVG to set up user-space units
		this.UNITS = 300
	},
	methods: {
		// Stroke is provided as a percentage of the radius, translate into user space units
		getStrokeWidth(stroke: number): number {
			return (stroke * this.UNITS) / 2000
		},

		// Determine the 'end' angle of the path for the active dashes in degrees.
		activeEnd(): number {
			if (this.activeCount === 0) {
				return 0
			}
			return 360 * (this.activeCount * this.dashPerc() + (this.activeCount - 1) * this.spacePerc())
		},

		// An array of the length of the dash & the length of the space between dashes
		getLengths(): number[] {
			return [2 * Math.PI * this.getRadius() * this.dashPerc(), 2 * Math.PI * this.getRadius() * this.spacePerc()]
		},

		// The space beween dashes as a percentage of the total length
		spacePerc(): number {
			return this.dashSpacing / this.dashCount
		},

		// The length of a dash as a percentage of the total length
		dashPerc(): number {
			return (1 - this.dashSpacing) / this.dashCount
		},

		// Radius of the circle arc
		getRadius(): number {
			return (
				(this.UNITS - Math.max(this.getStrokeWidth(this.strokeWidth), this.getStrokeWidth(this.activeWidth))) /
				2
			)
		},

		// SVG path definition requires points in cartesian space
		polarToCartesian(cx: number, cy: number, radius: number, degrees: number): { x: number; y: number } {
			const radians = (degrees * Math.PI) / 180.0
			return {
				x: cx + radius * Math.cos(radians),
				y: cy + radius * Math.sin(radians),
			}
		},

		// Path definition for circular arc
		describeArc(cx: number, cy: number, radius: number, startDegrees: number, endDegrees: number): string {
			const start = this.polarToCartesian(cx, cy, radius, startDegrees)
			const end = this.polarToCartesian(cx, cy, radius, endDegrees)

			let largeArc = Math.abs(endDegrees - startDegrees) < 180 ? 0 : 1
			let sweep = endDegrees < startDegrees ? 0 : 1

			return `M${start.x} ${start.y} A${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x} ${end.y}`
		},
	},
})
</script>
