"use client";

import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { renderInlineText } from "@/lib/inline-text";
import { CitationChip } from "@/components/workspace/citation-chip";

export type ChatMessageData = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  citations: { documentId: string; documentTitle: string; page: number; snippet: string }[];
};

export function ChatMessageView({
  message,
  onCitationClick,
  accentSoft,
  accentText,
}: {
  message: ChatMessageData;
  onCitationClick: (documentId: string, page: number) => void;
  accentSoft: string;
  accentText: string;
}) {
  const isUser = message.role === "USER";

  return (
    <div className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-slate-200 text-slate-600" : cn(accentSoft, accentText)
        )}
      >
        {isUser ? <User className="size-3.5" /> : <Sparkles className="size-3.5" />}
      </div>
      <div className={cn("flex max-w-[85%] flex-col gap-1.5", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
            isUser ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700"
          )}
        >
          {renderInlineText(message.content)}
        </div>
        {message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.citations.map((c, i) => (
              <CitationChip
                key={i}
                documentTitle={c.documentTitle}
                page={c.page}
                onClick={() => onCitationClick(c.documentId, c.page)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
