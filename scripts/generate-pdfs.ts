import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { renderDocumentPdf } from "@/lib/pdf-gen";
import { PROPERTIES } from "@/scripts/fixtures/data";

type Manifest = Record<
  string,
  Record<
    string,
    {
      fileUrl: string;
      pageCount: number;
      type: string;
      title: string;
      anchors: Record<string, number>;
    }
  >
>;

async function main() {
  const manifest: Manifest = {};
  const publicDir = path.join(process.cwd(), "public", "documents");

  for (const property of PROPERTIES) {
    manifest[property.id] = {};
    const propDir = path.join(publicDir, property.id);
    await mkdir(propDir, { recursive: true });

    for (const doc of property.documents) {
      const anchors: Record<string, number> = {};
      doc.pages.forEach((p, i) => {
        anchors[p.anchorId] = i + 1;
      });

      const pdfBytes = await renderDocumentPdf(
        doc.title,
        doc.pages.map((p) => ({ heading: p.heading, paragraphs: p.paragraphs }))
      );

      const fileName = `${doc.id}.pdf`;
      await writeFile(path.join(propDir, fileName), pdfBytes);

      manifest[property.id][doc.id] = {
        fileUrl: `/documents/${property.id}/${fileName}`,
        pageCount: doc.pages.length,
        type: doc.type,
        title: doc.title,
        anchors,
      };
    }

    console.log(`Generated ${property.documents.length} PDF(s) for ${property.name}`);
  }

  const manifestPath = path.join(process.cwd(), "scripts", "fixtures", "manifest.generated.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
