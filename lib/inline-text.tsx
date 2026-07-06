import { Fragment } from "react";

/** Renders `*italic*` segments (used for doc titles in mock chat replies) as <em>. */
export function renderInlineText(text: string) {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic font-medium text-slate-800">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
