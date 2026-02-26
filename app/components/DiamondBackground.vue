<template>
  <canvas ref="canvas" class="diamond-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)

// Symmetrical Brilliant-cut diamond geometry
const segments = 10
const vertices: number[][] = []
const faces: number[][] = []

// 1. Table Center (Anchor for the top face)
const tableY = -0.6
vertices.push([0, tableY, 0]) // Vertex 0

// 2. Table Ring
const tableR = 0.55
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * Math.PI * 2
	vertices.push([Math.cos(angle) * tableR, tableY, Math.sin(angle) * tableR])
} // Vertices 1 to 16

// 3. Girdle Ring
const girdleY = -0.2
const girdleR = 1.0
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * Math.PI * 2
	vertices.push([
		Math.cos(angle) * girdleR,
		girdleY,
		Math.sin(angle) * girdleR,
	])
} // Vertices 17 to 32

// 4. Culet (Bottom Point)
vertices.push([0, 1.2, 0])
const culetIndex = vertices.length - 1

// Build Faces
for (let i = 0; i < segments; i++) {
	const currentTable = i + 1
	const nextTable = ((i + 1) % segments) + 1
	const currentGirdle = i + 1 + segments
	const nextGirdle = ((i + 1) % segments) + 1 + segments

	faces.push([0, currentTable, nextTable])
	faces.push([currentTable, currentGirdle, nextGirdle])
	faces.push([currentTable, nextGirdle, nextTable])
	faces.push([culetIndex, nextGirdle, currentGirdle])
}

interface Diamond {
	x: number
	y: number
	size: number
	opacity: number
	vx: number
	vy: number
	speedRotX: number
	speedRotY: number
	speedRotZ: number
	rotX: number
	rotY: number
	rotZ: number
}

// Define 8 diamonds with varied properties, drifting movement and ultra-slow rotation
const diamonds: Diamond[] = [
	{
		x: Math.random() * 1000,
		y: 200,
		size: 180,
		opacity: 0.07,
		vx: 0.1,
		vy: 0.05,
		speedRotX: 0.0004,
		speedRotY: 0.0006,
		speedRotZ: 0.0002,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 800,
		size: 80,
		opacity: 0.05,
		vx: -0.12,
		vy: 0.08,
		speedRotX: 0.0008,
		speedRotY: 0.0004,
		speedRotZ: 0.0004,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 1400,
		size: 140,
		opacity: 0.06,
		vx: 0.08,
		vy: -0.06,
		speedRotX: 0.0002,
		speedRotY: 0.0004,
		speedRotZ: 0.0006,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 2000,
		size: 280,
		opacity: 0.04,
		vx: -0.04,
		vy: 0.04,
		speedRotX: 0.0002,
		speedRotY: 0.0002,
		speedRotZ: 0.0002,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 2600,
		size: 120,
		opacity: 0.05,
		vx: 0.15,
		vy: 0.1,
		speedRotX: 0.0006,
		speedRotY: 0.0003,
		speedRotZ: 0.0005,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 3200,
		size: 220,
		opacity: 0.07,
		vx: -0.08,
		vy: -0.05,
		speedRotX: 0.0004,
		speedRotY: 0.0006,
		speedRotZ: 0.0004,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 3800,
		size: 100,
		opacity: 0.06,
		vx: 0.05,
		vy: 0.12,
		speedRotX: 0.0003,
		speedRotY: 0.0007,
		speedRotZ: 0.0002,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
	{
		x: Math.random() * 1000,
		y: 4400,
		size: 190,
		opacity: 0.05,
		vx: -0.1,
		vy: 0.06,
		speedRotX: 0.0005,
		speedRotY: 0.0002,
		speedRotZ: 0.0008,
		rotX: Math.random() * Math.PI,
		rotY: Math.random() * Math.PI,
		rotZ: Math.random() * Math.PI,
	},
]

let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null
let lastFrameTime = 0
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
const frameInterval = isMobile ? 1000 / 30 : 0

const draw = (now: number = 0) => {
	if (!canvas.value || !ctx) return

	// Throttle to 30fps on mobile
	if (isMobile && now - lastFrameTime < frameInterval) {
		animationFrame = requestAnimationFrame(draw)
		return
	}
	lastFrameTime = now

	const canvasW = canvas.value.width
	const canvasH = canvas.value.height

	// Visible viewport range for culling
	const scrollY = window.scrollY
	const viewTop = scrollY
	const viewBottom = scrollY + window.innerHeight

	ctx.clearRect(0, 0, canvasW, canvasH)
	ctx.lineJoin = 'round'

	diamonds.forEach((d) => {
		// Drift movement
		d.x += d.vx
		d.y += d.vy

		// Bounce logic
		if (d.x < -d.size) d.vx = Math.abs(d.vx)
		if (d.x > canvasW + d.size) d.vx = -Math.abs(d.vx)
		if (d.y < 0) d.vy = Math.abs(d.vy)
		if (d.y > canvasH) d.vy = -Math.abs(d.vy)

		// Skip off-screen diamonds
		if (d.y + d.size * 1.5 < viewTop || d.y - d.size * 1.5 > viewBottom) return

		// Ultra-slow rotation
		d.rotX += d.speedRotX
		d.rotY += d.speedRotY
		d.rotZ += d.speedRotZ

		const cx = Math.cos(d.rotX),
			sx = Math.sin(d.rotX)
		const cy = Math.cos(d.rotY),
			sy = Math.sin(d.rotY)
		const cz = Math.cos(d.rotZ),
			sz = Math.sin(d.rotZ)

		const projected = vertices.map((v) => {
			let x = v[0],
				y = v[1],
				z = v[2]
			let ny = y * cx - z * sx
			let nz = y * sx + z * cx
			y = ny
			z = nz
			let nx = x * cy + z * sy
			nz = -x * sy + z * cy
			x = nx
			z = nz
			nx = x * cz - y * sz
			ny = x * sz + y * cz
			x = nx
			y = ny
			return [x * d.size + d.x, y * d.size + d.y, z]
		})

		ctx!.globalAlpha = d.opacity

		faces.forEach((f) => {
			const v0 = projected[f[0]]
			const v1 = projected[f[1]]
			const v2 = projected[f[2]]
			const cpz =
				(v1[0] - v0[0]) * (v2[1] - v0[1]) -
				(v1[1] - v0[1]) * (v2[0] - v0[0])

			if (cpz > 0) {
				ctx!.beginPath()
				ctx!.moveTo(v0[0], v0[1])
				ctx!.lineTo(v1[0], v1[1])
				ctx!.lineTo(v2[0], v2[1])
				ctx!.closePath()
				ctx!.fillStyle = 'rgba(129, 140, 248, 0.05)'
				ctx!.fill()
				// Wider translucent stroke for glow, then crisp thin stroke
				ctx!.lineWidth = 3
				ctx!.strokeStyle = 'rgba(129, 140, 248, 0.15)'
				ctx!.stroke()
				ctx!.lineWidth = 1.2
				ctx!.strokeStyle = '#818cf8'
				ctx!.stroke()
			}
		})
	})

	animationFrame = requestAnimationFrame(draw)
}

const updateSize = () => {
	if (canvas.value) {
		const width = window.innerWidth
		const height = Math.max(
			document.documentElement.scrollHeight,
			window.innerHeight,
		)
		if (canvas.value.width !== width || canvas.value.height !== height) {
			canvas.value.width = width
			canvas.value.height = height
		}
	}
}

onMounted(() => {
	ctx = canvas.value?.getContext('2d') || null
	window.addEventListener('resize', updateSize)
	const ro = new ResizeObserver(() => updateSize())
	ro.observe(document.body)
	updateSize()
	animationFrame = requestAnimationFrame(draw)
})

onUnmounted(() => {
	cancelAnimationFrame(animationFrame)
	window.removeEventListener('resize', updateSize)
})
</script>

<style scoped>
.diamond-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
