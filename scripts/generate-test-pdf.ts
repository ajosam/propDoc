import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { renderDocumentPdf, type PdfPageContent } from "@/lib/pdf-gen";

const PAGE_COUNT = 300;

const FILLER_SENTENCES = [
  "This unit is located within a master-planned community with access to retail, dining, and green space.",
  "The Purchaser acknowledges that finishes shown in marketing material are indicative and subject to change.",
  "Service charges are reviewed annually by the Owners Association and may vary based on actual costs incurred.",
  "Handover is anticipated subject to construction milestones being met as set out in the payment schedule.",
  "This page exists purely to pad out the document for PDF viewer load-testing purposes.",
  "Comparable transactions in the area over the past twelve months support the pricing assumptions used here.",
  "The Developer reserves the right to make minor variations to the layout without notice to the Purchaser.",
  "Investors should independently verify all figures with their own financial and legal advisors before proceeding.",
];

function pageContent(index: number): PdfPageContent {
  const section = Math.floor(index / 20) + 1;
  return {
    heading: `Section ${section} — Reference Page ${index + 1}`,
    paragraphs: [
      `Lorem ipsum test content, page ${index + 1} of ${PAGE_COUNT}. Generated to stress-test the PDF viewer's pagination, scrolling, and zoom controls with a large document.`,
      FILLER_SENTENCES[index % FILLER_SENTENCES.length],
      FILLER_SENTENCES[(index * 3 + 1) % FILLER_SENTENCES.length],
      `Cross-reference: see page ${Math.max(1, index)} and page ${Math.min(PAGE_COUNT, index + 2)} for related clauses.`,
    ],
  };
}

async function main() {
  const pages: PdfPageContent[] = Array.from({ length: PAGE_COUNT }, (_, i) => pageContent(i));
  const pdfBytes = await renderDocumentPdf("Large Test Document", pages);

  const dir = path.join(process.cwd(), "public", "test");
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, "large-test-document.pdf");
  await writeFile(filePath, pdfBytes);

  console.log(`Generated ${PAGE_COUNT}-page test PDF at ${filePath}`);
  console.log(`Serve locally at: /test/large-test-document.pdf`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
