import { PDFDocument, PDFFont, StandardFonts, rgb } from "pdf-lib";

export type PdfPageContent = {
  heading: string;
  paragraphs: string[];
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, fontSize) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function renderDocumentPdf(title: string, pages: PdfPageContent[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  pages.forEach((pageContent, index) => {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN;

    page.drawText(title.toUpperCase(), {
      x: MARGIN,
      y,
      size: 8,
      font: regular,
      color: rgb(0.55, 0.55, 0.55),
    });
    y -= 22;

    const headingLines = wrapText(pageContent.heading, bold, 15, CONTENT_WIDTH);
    for (const line of headingLines) {
      page.drawText(line, { x: MARGIN, y, size: 15, font: bold, color: rgb(0.09, 0.09, 0.12) });
      y -= 20;
    }
    y -= 6;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
    y -= 20;

    for (const paragraph of pageContent.paragraphs) {
      const paraLines = paragraph.split("\n");
      for (const rawLine of paraLines) {
        const lines = wrapText(rawLine, regular, 10.5, CONTENT_WIDTH);
        for (const line of lines) {
          if (y < MARGIN + 20) break;
          page.drawText(line, { x: MARGIN, y, size: 10.5, font: regular, color: rgb(0.2, 0.2, 0.24) });
          y -= 15.5;
        }
      }
      y -= 8;
    }

    page.drawText(`Page ${index + 1} of ${pages.length}`, {
      x: PAGE_WIDTH / 2 - 24,
      y: MARGIN / 2,
      size: 8.5,
      font: regular,
      color: rgb(0.6, 0.6, 0.6),
    });
  });

  return doc.save();
}
