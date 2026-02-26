#!/usr/bin/env bun
/**
 * Generate Twitter/X profile picture and banner images for @realbaktz.
 *
 * Profile picture: 400×400 PNG — bākꜩ logo centered on dark slate background
 * Banner: 1500×500 PNG — wireframe 3D diamond field on dark slate background
 *
 * Prerequisites: rsvg-convert (already used by generate-logos.ts)
 */

import { copyFile, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const IMAGES_DIR = join(import.meta.dir, "..", "app", "assets", "images");
const BG_COLOR = "#0f172a";

async function spawnChecked(cmd: string[]): Promise<void> {
	console.log(`  $ ${cmd.join(" ")}`);
	const proc = Bun.spawn(cmd, { stdout: "inherit", stderr: "inherit" });
	const code = await proc.exited;
	if (code !== 0) {
		throw new Error(`Command failed (exit ${code}): ${cmd[0]}`);
	}
}

// ---------------------------------------------------------------------------
// Diamond geometry — extracted from DiamondBackground.vue
// ---------------------------------------------------------------------------

const segments = 10;
const vertices: number[][] = [];
const faces: number[][] = [];

// Table center
const tableY = -0.6;
vertices.push([0, tableY, 0]);

// Table ring
const tableR = 0.55;
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * Math.PI * 2;
	vertices.push([Math.cos(angle) * tableR, tableY, Math.sin(angle) * tableR]);
}

// Girdle ring
const girdleY = -0.2;
const girdleR = 1.0;
for (let i = 0; i < segments; i++) {
	const angle = (i / segments) * Math.PI * 2;
	vertices.push([
		Math.cos(angle) * girdleR,
		girdleY,
		Math.sin(angle) * girdleR,
	]);
}

// Culet
vertices.push([0, 1.2, 0]);
const culetIndex = vertices.length - 1;

// Build faces
for (let i = 0; i < segments; i++) {
	const currentTable = i + 1;
	const nextTable = ((i + 1) % segments) + 1;
	const currentGirdle = i + 1 + segments;
	const nextGirdle = ((i + 1) % segments) + 1 + segments;

	faces.push([0, currentTable, nextTable]);
	faces.push([currentTable, currentGirdle, nextGirdle]);
	faces.push([currentTable, nextGirdle, nextTable]);
	faces.push([culetIndex, nextGirdle, currentGirdle]);
}

// ---------------------------------------------------------------------------
// 3D rotation — extracted from DiamondBackground.vue:232-254
// ---------------------------------------------------------------------------

function rotate3d(
	v: number[],
	rotX: number,
	rotY: number,
	rotZ: number,
): [number, number, number] {
	let x = v[0],
		y = v[1],
		z = v[2];

	// X rotation
	const cx = Math.cos(rotX),
		sx = Math.sin(rotX);
	let ny = y * cx - z * sx;
	let nz = y * sx + z * cx;
	y = ny;
	z = nz;

	// Y rotation
	const cy = Math.cos(rotY),
		sy = Math.sin(rotY);
	let nx = x * cy + z * sy;
	nz = -x * sy + z * cy;
	x = nx;
	z = nz;

	// Z rotation
	const cz = Math.cos(rotZ),
		sz = Math.sin(rotZ);
	nx = x * cz - y * sz;
	ny = x * sz + y * cz;
	x = nx;
	y = ny;

	return [x, y, z];
}

// ---------------------------------------------------------------------------
// Profile picture SVG — logo on dark background
// ---------------------------------------------------------------------------

function buildProfileSvg(): string {
	// Path data and gradients from baktz-logo-dark.svg (199.28×83.2 viewBox)
	// Scale 1.405× to fill ~280px width, centered in 400×400
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
	<rect width="400" height="400" fill="${BG_COLOR}"/>
	<g transform="translate(60, 141.55) scale(1.405)">
		<defs>
			<linearGradient id="bak-gradient" gradientUnits="userSpaceOnUse"
				x1="-0.1" y1="14" x2="174.5" y2="106"
				gradientTransform="translate(-26.24,-29.2)">
				<stop offset="0%" stop-color="#ffffff"/>
				<stop offset="30%" stop-color="#f1f5f9"/>
				<stop offset="60%" stop-color="#cbd5e1"/>
				<stop offset="100%" stop-color="#94a3b8"/>
			</linearGradient>
			<linearGradient id="tz-gradient" gradientUnits="userSpaceOnUse"
				x1="143.9" y1="18" x2="216.7" y2="110"
				gradientTransform="translate(-26.24,-29.2)">
				<stop offset="0%" stop-color="#38bdf8"/>
				<stop offset="100%" stop-color="#6366f1"/>
			</linearGradient>
		</defs>
		<path d="m 11.92,14.16 q 0,2.48 -0.16,4.88 -0.16,2.4 -0.32,3.76 h 0.48 q 1.76,-2.72 4.72,-4.56 2.96,-1.92 7.68,-1.92 7.36,0 11.92,5.76 4.56,5.68 4.56,16.8 0,11.2 -4.64,16.96 Q 31.52,61.6 24,61.6 19.2,61.6 16.4,59.92 13.68,58.16 11.92,56 h -0.8 l -2,4.8 H 0 V 0 h 11.92 z m 8.56,11.68 q -4.64,0 -6.56,2.88 -1.84,2.88 -2,8.8 v 1.28 q 0,6.32 1.84,9.76 1.92,3.36 6.88,3.36 3.68,0 5.84,-3.36 2.16,-3.44 2.16,-9.84 0,-6.4 -2.24,-9.6 -2.16,-3.28 -5.92,-3.28 z m 44.079954,-9.6 q 8.8,0 13.439996,3.84 4.72,3.76 4.72,11.6 V 60.8 h -8.32 l -2.319996,-5.92 h -0.32 q -2.8,3.52 -5.92,5.12 -3.12,1.6 -8.56,1.6 -5.84,0 -9.68,-3.36 -3.84,-3.44 -3.84,-10.48 0,-6.96 4.88,-10.24 4.88,-3.36 14.64,-3.68 l 7.6,-0.24 v -1.92 q 0,-3.44 -1.84,-5.04 -1.76,-1.6 -4.96,-1.6 -3.2,0 -6.24,0.96 -3.04,0.88 -6.08,2.24 l -3.92,-8.08 q 3.52,-1.84 7.76,-2.88 4.32,-1.04 8.96,-1.04 z m 1.68,24.48 q -5.76,0.16 -8,2.08 -2.24,1.92 -2.24,5.04 0,2.72 1.6,3.92 1.6,1.12 4.16,1.12 3.84,0 6.48,-2.24 2.64,-2.32 2.64,-6.48 v -3.6 z M 77.83995,4.08 v 8.24 H 51.359954 V 4.08 Z m 25.04001,23.12 q 0,2.48 -0.24,4.96 -0.16,2.4 -0.4,4.88 h 0.16 q 1.2,-1.68 2.48,-3.36 1.28,-1.76 2.72,-3.28 l 12.24,-13.28 h 13.44 l -17.36,18.96 18.4,24.72 h -13.76 l -12.56,-17.68 -5.12,4.08 v 13.6 h -11.92 V 0 h 11.92 z"
			fill="url(#bak-gradient)"/>
		<path d="m 152.72001,55.279997 q 2,0 3.84,-0.4 1.84,-0.4 3.68,-0.96 v 8.88 q -1.92,0.8 -4.8,1.36 -2.8,0.64 -6.16,0.64 -3.92,0 -7.04,-1.28 -3.04,-1.28 -4.88,-4.4 -1.76,-3.2 -1.76,-8.8 v -21.04 h -5.68 v -5.04 l 6.56,-4 3.44,-9.2 h 7.6 v 9.28 h 50 v 7.76 l -17.28,16.16 q 7.04,0.8 11.2,3.6 4.16,2.72 6,6.88 1.84,4.16 1.84,9.2 0,5.44 -2.56,9.840003 -2.56,4.4 -7.84,6.88 -5.28,2.56 -13.44,2.56 -9.84,0 -17.28,-3.12 V 69.839997 q 3.84,1.840003 8.24,2.800003 4.48,0.96 8.16,0.96 4.88,0 7.6,-1.44 2.72,-1.440003 3.84,-3.840003 1.2,-2.32 1.2,-4.96 0,-2.96 -1.36,-5.28 -1.36,-2.4 -4.8,-3.76 -3.36,-1.44 -9.44,-1.44 h -4.64 v -8.48 l 16.08,-15.12 h -35.52 v 21.04 q 0,2.48 1.44,3.76 1.44,1.2 3.76,1.2 z"
			fill="url(#tz-gradient)"/>
	</g>
</svg>`;
}

// ---------------------------------------------------------------------------
// Banner SVG — wireframe diamond field
// ---------------------------------------------------------------------------

interface DiamondSpec {
	x: number;
	y: number;
	size: number;
	opacity: number;
	rotX: number;
	rotY: number;
	rotZ: number;
}

function buildBannerSvg(): string {
	const W = 1500;
	const H = 500;

	const diamonds: DiamondSpec[] = [
		{ x: 100, y: 250, size: 160, opacity: 0.7, rotX: 0.4, rotY: 0.8, rotZ: 0.2 },
		{ x: 350, y: 120, size: 80, opacity: 0.5, rotX: 1.2, rotY: 0.3, rotZ: 0.6 },
		{ x: 580, y: 340, size: 130, opacity: 0.6, rotX: 0.7, rotY: 1.5, rotZ: 0.4 },
		{ x: 800, y: 200, size: 100, opacity: 0.45, rotX: 2.0, rotY: 0.6, rotZ: 1.1 },
		{ x: 1020, y: 370, size: 150, opacity: 0.55, rotX: 0.3, rotY: 1.0, rotZ: 0.8 },
		{ x: 1230, y: 140, size: 90, opacity: 0.5, rotX: 1.5, rotY: 0.4, rotZ: 1.3 },
		{ x: 1420, y: 280, size: 120, opacity: 0.6, rotX: 0.9, rotY: 1.8, rotZ: 0.5 },
	];

	let diamondGroups = "";

	for (const d of diamonds) {
		// Project all vertices to 2D
		const projected = vertices.map((v) => {
			const [rx, ry] = rotate3d(v, d.rotX, d.rotY, d.rotZ);
			return [rx * d.size + d.x, ry * d.size + d.y];
		});

		let paths = "";

		for (const f of faces) {
			const v0 = projected[f[0]];
			const v1 = projected[f[1]];
			const v2 = projected[f[2]];

			// Back-face culling: cross-product z > 0 means front-facing
			const cpz =
				(v1[0] - v0[0]) * (v2[1] - v0[1]) -
				(v1[1] - v0[1]) * (v2[0] - v0[0]);

			if (cpz > 0) {
				const pathD = `M${v0[0].toFixed(1)},${v0[1].toFixed(1)} L${v1[0].toFixed(1)},${v1[1].toFixed(1)} L${v2[0].toFixed(1)},${v2[1].toFixed(1)}Z`;

				// Wide glow stroke underneath
				paths += `\t\t\t<path d="${pathD}" fill="rgba(129,140,248,0.05)" stroke="rgba(129,140,248,0.15)" stroke-width="3" stroke-linejoin="round"/>\n`;
				// Crisp stroke on top
				paths += `\t\t\t<path d="${pathD}" fill="none" stroke="#818cf8" stroke-width="1.2" stroke-linejoin="round"/>\n`;
			}
		}

		diamondGroups += `\t\t<g opacity="${d.opacity}">\n${paths}\t\t</g>\n`;
	}

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
	<rect width="${W}" height="${H}" fill="${BG_COLOR}"/>
	<g>
${diamondGroups}	</g>
</svg>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const tmpDir = await mkdtemp(join(tmpdir(), "baktz-twitter-"));
	console.log(`Working directory: ${tmpDir}\n`);

	// Profile picture
	console.log("Profile picture (400×400):");
	const profileSvg = join(tmpDir, "twitter-profile.svg");
	await writeFile(profileSvg, buildProfileSvg());
	console.log("  SVG written");

	const profilePng = join(tmpDir, "twitter-profile-400.png");
	await spawnChecked([
		"rsvg-convert",
		"-w", "400",
		"-h", "400",
		profileSvg,
		"-o", profilePng,
	]);
	await copyFile(profilePng, join(IMAGES_DIR, "twitter-profile-400.png"));
	console.log("  -> twitter-profile-400.png");

	// Banner
	console.log("\nBanner (1500×500):");
	const bannerSvg = join(tmpDir, "twitter-banner.svg");
	await writeFile(bannerSvg, buildBannerSvg());
	console.log("  SVG written");

	const bannerPng = join(tmpDir, "twitter-banner-1500x500.png");
	await spawnChecked([
		"rsvg-convert",
		"-w", "1500",
		"-h", "500",
		bannerSvg,
		"-o", bannerPng,
	]);
	await copyFile(bannerPng, join(IMAGES_DIR, "twitter-banner-1500x500.png"));
	console.log("  -> twitter-banner-1500x500.png");

	console.log("\nDone! Images saved to app/assets/images/");
}

main().catch((err) => {
	console.error("Error:", err);
	process.exit(1);
});
