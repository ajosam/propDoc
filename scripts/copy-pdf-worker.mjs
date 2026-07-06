import { copyFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "..", "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const dest = path.join(__dirname, "..", "public", "pdf.worker.min.mjs");

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log("Copied pdf.worker.min.mjs to public/");
} else {
  console.warn("pdfjs-dist worker not found, skipping copy");
}
