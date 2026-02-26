#!/usr/bin/env bun
/**
 * Regenerate baktz logo SVGs (with Noto Sans Bold outlines) and rasters.
 *
 * Prerequisites: inkscape, rsvg-convert, cwebp, Noto Sans Bold font installed.
 *
 * Uses Bun.spawn (array-based, no shell) for all subprocess calls — safe from
 * command injection by design.
 */

import { copyFile, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const IMAGES_DIR = join(import.meta.dir, "..", "app", "assets", "images");

interface Variant {
	name: string;
	bakStops: Array<{ offset: string; color: string }>;
	tzStops: Array<{ offset: string; color: string }>;
}

const variants: Variant[] = [
	{
		name: "dark",
		bakStops: [
			{ offset: "0%", color: "#ffffff" },
			{ offset: "30%", color: "#f1f5f9" },
			{ offset: "60%", color: "#cbd5e1" },
			{ offset: "100%", color: "#94a3b8" },
		],
		tzStops: [
			{ offset: "0%", color: "#38bdf8" },
			{ offset: "100%", color: "#6366f1" },
		],
	},
	{
		name: "light",
		bakStops: [
			{ offset: "0%", color: "#0f172a" },
			{ offset: "30%", color: "#1e293b" },
			{ offset: "60%", color: "#334155" },
			{ offset: "100%", color: "#475569" },
		],
		tzStops: [
			{ offset: "0%", color: "#0ea5e9" },
			{ offset: "100%", color: "#4f46e5" },
		],
	},
];

const FONT_SIZE = 80;
const TEXT_X = 20;
const TEXT_Y = 90;

async function spawnChecked(cmd: string[]): Promise<void> {
	console.log(`  $ ${cmd.join(" ")}`);
	const proc = Bun.spawn(cmd, { stdout: "inherit", stderr: "inherit" });
	const code = await proc.exited;
	if (code !== 0) {
		throw new Error(`Command failed (exit ${code}): ${cmd[0]}`);
	}
}

async function spawnCapture(cmd: string[]): Promise<string> {
	const proc = Bun.spawn(cmd, { stdout: "pipe", stderr: "inherit" });
	const text = await new Response(proc.stdout).text();
	const code = await proc.exited;
	if (code !== 0) {
		throw new Error(`Command failed (exit ${code}): ${cmd[0]}`);
	}
	return text.trim();
}

/** Use Inkscape to measure the rendered width of "bāk" at the target font/size. */
async function measureBakWidth(tmpDir: string): Promise<number> {
	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
	<text id="bak" x="${TEXT_X}" y="${TEXT_Y}"
		font-family="Noto Sans" font-weight="700" font-size="${FONT_SIZE}"
		letter-spacing="-0.05em">bāk</text>
</svg>`;
	const path = join(tmpDir, "measure.svg");
	await writeFile(path, svg);

	const raw = await spawnCapture([
		"inkscape",
		path,
		"--query-id=bak",
		"--query-width",
	]);
	const width = parseFloat(raw);
	if (Number.isNaN(width)) {
		throw new Error(`Failed to parse bāk width from Inkscape output: "${raw}"`);
	}
	console.log(`  Measured "bāk" width: ${width.toFixed(2)}px`);
	return width;
}

function buildTemplateSvg(variant: Variant, bakWidth: number): string {
	const tzX = TEXT_X + bakWidth;
	const tzY = TEXT_Y + 0.04 * FONT_SIZE; // 0.04em vertical shift (BaktzLogo.vue:58)

	// 135-degree diagonal gradients (slope ~1:1)
	// Extend ~30% beyond text bounds so visible portion is the mid-range
	const bakGrad = {
		x1: TEXT_X - bakWidth * 0.15,
		y1: TEXT_Y - FONT_SIZE * 0.95,
		x2: TEXT_X + bakWidth * 1.15,
		y2: TEXT_Y + FONT_SIZE * 0.2,
	};
	const tzWidth = FONT_SIZE * 0.65;
	const tzGrad = {
		x1: tzX - tzWidth * 0.2,
		y1: TEXT_Y - FONT_SIZE * 0.9,
		x2: tzX + tzWidth * 1.2,
		y2: TEXT_Y + FONT_SIZE * 0.25,
	};

	const bakStopsXml = variant.bakStops
		.map((s) => `\t\t\t<stop offset="${s.offset}" stop-color="${s.color}"/>`)
		.join("\n");
	const tzStopsXml = variant.tzStops
		.map((s) => `\t\t\t<stop offset="${s.offset}" stop-color="${s.color}"/>`)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bak-gradient" gradientUnits="userSpaceOnUse"
			x1="${bakGrad.x1.toFixed(1)}" y1="${bakGrad.y1.toFixed(1)}"
			x2="${bakGrad.x2.toFixed(1)}" y2="${bakGrad.y2.toFixed(1)}">
${bakStopsXml}
		</linearGradient>
		<linearGradient id="tz-gradient" gradientUnits="userSpaceOnUse"
			x1="${tzGrad.x1.toFixed(1)}" y1="${tzGrad.y1.toFixed(1)}"
			x2="${tzGrad.x2.toFixed(1)}" y2="${tzGrad.y2.toFixed(1)}">
${tzStopsXml}
		</linearGradient>
	</defs>
	<text x="${TEXT_X}" y="${TEXT_Y}" font-family="Noto Sans" font-weight="700"
		font-size="${FONT_SIZE}" letter-spacing="-0.05em"
		fill="url(#bak-gradient)">bāk</text>
	<text x="${tzX.toFixed(2)}" y="${tzY.toFixed(2)}" font-family="Noto Sans" font-weight="700"
		font-size="${FONT_SIZE}" fill="url(#tz-gradient)">ꜩ</text>
</svg>`;
}

async function main() {
	const tmpDir = await mkdtemp(join(tmpdir(), "baktz-logos-"));
	console.log(`Working directory: ${tmpDir}\n`);

	// Measure "bāk" width so we can precisely position the tez character
	const bakWidth = await measureBakWidth(tmpDir);

	for (const variant of variants) {
		const base = `baktz-logo-${variant.name}`;
		console.log(`\n${variant.name} variant:`);

		const templatePath = join(tmpDir, `${base}-template.svg`);
		const outlinedPath = join(tmpDir, `${base}.svg`);

		// 1. Write template SVG with <text> elements
		await writeFile(templatePath, buildTemplateSvg(variant, bakWidth));
		console.log("  Template written");

		// 2. Convert text to paths, fit canvas to content
		await spawnChecked([
			"inkscape",
			templatePath,
			"--batch-process",
			"--actions=select-all;object-to-path;select-all;fit-canvas-to-selection",
			"--export-type=svg",
			"--export-plain-svg",
			`--export-filename=${outlinedPath}`,
		]);

		// 3. Copy SVG to assets
		await copyFile(outlinedPath, join(IMAGES_DIR, `${base}.svg`));
		console.log(`  -> ${base}.svg`);

		// 4. Rasterize to PNG + convert to WebP
		for (const w of [1200, 2400]) {
			const pngPath = join(tmpDir, `${base}-${w}.png`);
			const webpPath = join(tmpDir, `${base}-${w}.webp`);

			await spawnChecked([
				"rsvg-convert",
				"-w",
				String(w),
				outlinedPath,
				"-o",
				pngPath,
			]);
			await spawnChecked(["cwebp", "-q", "90", pngPath, "-o", webpPath]);

			await copyFile(pngPath, join(IMAGES_DIR, `${base}-${w}.png`));
			await copyFile(webpPath, join(IMAGES_DIR, `${base}-${w}.webp`));
			console.log(`  -> ${base}-${w}.png + .webp`);
		}
	}

	console.log("\nAll logos regenerated!");
}

main().catch((err) => {
	console.error("Error:", err);
	process.exit(1);
});
