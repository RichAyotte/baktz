<template>
	<canvas ref="canvas" class="diamond-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

type Vec3 = [number, number, number]
type Face = [number, number, number]

const canvas = ref<HTMLCanvasElement | null>(null)

// Cached constants
const TWO_PI = Math.PI * 2
const VERTEX_COUNT = 22
const FACE_COUNT = 40
const FILL_STYLE = 'rgba(129, 140, 248, 0.05)'
const STROKE_GLOW = 'rgba(129, 140, 248, 0.25)'
const STROKE_CRISP = '#a5b4fc'

// Symmetrical Brilliant-cut diamond geometry
const segments = 10

// Build vertices into flat Float64Array
const tmpVerts: Vec3[] = []

// 1. Table Center (Anchor for the top face)
const tableY = -0.6
tmpVerts.push([0, tableY, 0]) // Vertex 0

// 2. Table Ring
const tableR = 0.55
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * TWO_PI
	tmpVerts.push([Math.cos(angle) * tableR, tableY, Math.sin(angle) * tableR])
} // Vertices 1 to 10

// 3. Girdle Ring
const girdleY = -0.2
const girdleR = 1.0
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * TWO_PI
	tmpVerts.push([
		Math.cos(angle) * girdleR,
		girdleY,
		Math.sin(angle) * girdleR,
	])
} // Vertices 11 to 20

// 4. Culet (Bottom Point)
tmpVerts.push([0, 1.2, 0])
const culetIndex = tmpVerts.length - 1

const vertData = new Float64Array(tmpVerts.flat())

// Build faces into flat Uint8Array
const tmpFaces: Face[] = []
for (let i = 0; i < segments; i++) {
	const currentTable = i + 1
	const nextTable = ((i + 1) % segments) + 1
	const currentGirdle = i + 1 + segments
	const nextGirdle = ((i + 1) % segments) + 1 + segments

	tmpFaces.push([0, currentTable, nextTable])
	tmpFaces.push([currentTable, currentGirdle, nextGirdle])
	tmpFaces.push([currentTable, nextGirdle, nextTable])
	tmpFaces.push([culetIndex, nextGirdle, currentGirdle])
}

const faceData = new Uint8Array(tmpFaces.flat())

// Pre-multiplied face indices → projected buffer offsets (avoid ×3 per face per frame)
const faceOffsets = new Uint8Array(FACE_COUNT * 3)
for (let i = 0; i < faceOffsets.length; i++) {
	const idx = faceData[i]
	if (idx === undefined) continue
	faceOffsets[i] = idx * 3
}

// Pre-allocated projection buffer — reused every frame, zero allocations
const projected = new Float64Array(VERTEX_COUNT * 3)

const FOCAL_LENGTH = 800
const Z_MIN = -300
const Z_MAX = 300

interface Diamond {
	x: number
	y: number
	z: number
	size: number
	opacity: number
	vx: number
	vy: number
	vz: number
	speedRotX: number
	speedRotY: number
	speedRotZ: number
	rotX: number
	rotY: number
	rotZ: number
}

const DIAMOND_COUNT = 8

function rand(min: number, max: number): number {
	return min + Math.random() * (max - min)
}

const diamonds: Diamond[] = Array.from({ length: DIAMOND_COUNT }, (_, i) => ({
	x: Math.random() * 1000,
	y: 200 + i * 600,
	z: rand(Z_MIN, Z_MAX),
	size: rand(80, 280),
	opacity: rand(0.04, 0.07),
	vx: rand(0.04, 0.15) * (i % 2 === 0 ? 1 : -1),
	vy: rand(0.04, 0.12) * (Math.random() < 0.25 ? -1 : 1),
	vz: rand(0.02, 0.08) * (Math.random() < 0.5 ? -1 : 1),
	speedRotX: rand(0.00005, 0.0001),
	speedRotY: rand(0.002, 0.004),
	speedRotZ: rand(0.00005, 0.0001),
	rotX: Math.random() * Math.PI,
	rotY: Math.random() * Math.PI,
	rotZ: Math.random() * Math.PI,
}))

let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null
let lastFrameTime = 0
let resizeObserver: ResizeObserver | null = null
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
const frameInterval = isMobile ? 1000 / 30 : 0

const draw = (now: number = 0) => {
	if (!canvas.value || !ctx) return
	const c = ctx

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

	c.clearRect(0, 0, canvasW, canvasH)

	for (const d of diamonds) {
		// Drift movement
		d.x += d.vx
		d.y += d.vy
		d.z += d.vz

		// Bounce logic
		if (d.x < -d.size) d.vx = Math.abs(d.vx)
		if (d.x > canvasW + d.size) d.vx = -Math.abs(d.vx)
		if (d.y < 0) d.vy = Math.abs(d.vy)
		if (d.y > canvasH) d.vy = -Math.abs(d.vy)
		if (d.z < Z_MIN) d.vz = Math.abs(d.vz)
		if (d.z > Z_MAX) d.vz = -Math.abs(d.vz)

		// Skip off-screen diamonds
		if (d.y + d.size * 1.5 < viewTop || d.y - d.size * 1.5 > viewBottom)
			continue

		// Ultra-slow rotation with wrapping to prevent unbounded float growth
		d.rotX = (d.rotX + d.speedRotX) % TWO_PI
		d.rotY = (d.rotY + d.speedRotY) % TWO_PI
		d.rotZ = (d.rotZ + d.speedRotZ) % TWO_PI

		const cx = Math.cos(d.rotX),
			sx = Math.sin(d.rotX)
		const cy = Math.cos(d.rotY),
			sy = Math.sin(d.rotY)
		const cz = Math.cos(d.rotZ),
			sz = Math.sin(d.rotZ)

		// Combined rotation matrix R = Rx·Rz·Ry
		// Y spin applied first (local space, around the point axis), then X/Z tilt
		const r00 = cz * cy
		const r01 = -sz
		const r02 = cz * sy
		const r10 = cx * sz * cy + sx * sy
		const r11 = cx * cz
		const r12 = cx * sz * sy - sx * cy
		const r20 = sx * sz * cy - cx * sy
		const r21 = sx * cz
		const r22 = sx * sz * sy + cx * cy

		const scale = FOCAL_LENGTH / (FOCAL_LENGTH + d.z)
		const size = d.size * scale
		const dx = d.x
		const dy = d.y

		// Project all vertices into pre-allocated buffer — zero allocations
		for (let vi = 0; vi < VERTEX_COUNT; vi++) {
			const off = vi * 3
			const vx = vertData[off]
			const vy = vertData[off + 1]
			const vz = vertData[off + 2]
			if (vx === undefined || vy === undefined || vz === undefined)
				continue
			projected[off] = (r00 * vx + r01 * vy + r02 * vz) * size + dx
			projected[off + 1] = (r10 * vx + r11 * vy + r12 * vz) * size + dy
			projected[off + 2] = r20 * vx + r21 * vy + r22 * vz
		}

		c.globalAlpha = d.opacity * scale

		// Batch all front-facing triangles into one compound path per diamond
		// 3 draw calls per diamond instead of 3 × N per face (~20x fewer draw calls)
		c.beginPath()
		for (let fi = 0; fi < FACE_COUNT; fi++) {
			const foff = fi * 3
			const i0 = faceOffsets[foff]
			const i1 = faceOffsets[foff + 1]
			const i2 = faceOffsets[foff + 2]
			if (i0 === undefined || i1 === undefined || i2 === undefined)
				continue

			const v0x = projected[i0]
			const v0y = projected[i0 + 1]
			const v1x = projected[i1]
			const v1y = projected[i1 + 1]
			const v2x = projected[i2]
			const v2y = projected[i2 + 1]
			if (
				v0x === undefined ||
				v0y === undefined ||
				v1x === undefined ||
				v1y === undefined ||
				v2x === undefined ||
				v2y === undefined
			)
				continue

			const cpz = (v1x - v0x) * (v2y - v0y) - (v1y - v0y) * (v2x - v0x)

			if (cpz > 0) {
				c.moveTo(v0x, v0y)
				c.lineTo(v1x, v1y)
				c.lineTo(v2x, v2y)
				c.closePath()
			}
		}
		c.fillStyle = FILL_STYLE
		c.fill()
		c.lineWidth = 3
		c.strokeStyle = STROKE_GLOW
		c.stroke()
		c.lineWidth = 1.2
		c.strokeStyle = STROKE_CRISP
		c.stroke()
	}

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
	if (ctx) {
		ctx.lineJoin = 'round'
	}
	window.addEventListener('resize', updateSize)
	resizeObserver = new ResizeObserver(() => updateSize())
	resizeObserver.observe(document.body)
	updateSize()
	animationFrame = requestAnimationFrame(draw)
})

onUnmounted(() => {
	cancelAnimationFrame(animationFrame)
	window.removeEventListener('resize', updateSize)
	resizeObserver?.disconnect()
	resizeObserver = null
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
