"use client";

import { useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { THREAD_ORDER, THREAD_CONFIG } from "@/lib/thread-config";
import { generateMockReply, MOCK_THINKING_DELAY_MS, type CitationPoolEntry } from "@/lib/mock-chat";
import { ChatMessageView, type ChatMessageData } from "@/components/workspace/chat-message";
import type { ChatThreadType } from "@/lib/generated/prisma/client";

export type ThreadInitial = {
  type: ChatThreadType;
  messages: ChatMessageData[];
};

export function ChatPanel({
  threads,
  citationPool,
  onCitationClick,
}: {
  threads: ThreadInitial[];
  citationPool: CitationPoolEntry[];
  onCitationClick: (documentId: string, page: number) => void;
}) {
  const [active, setActive] = useState<ChatThreadType>("GENERAL");
  const [messagesByThread, setMessagesByThread] = useState<Record<ChatThreadType, ChatMessageData[]>>(() => {
    const map = {} as Record<ChatThreadType, ChatMessageData[]>;
    for (const t of threads) map[t.type] = t.messages;
    return map;
  });
  const [thinking, setThinking] = useState<Record<string, boolean>>({});
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const docTitleById = Object.fromEntries(citationPool.map((c) => [c.documentId, c.documentTitle]));

  function scrollToBottom() {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessageData = { id: `local-${Date.now()}`, role: "USER", content: text, citations: [] };
    setMessagesByThread((prev) => ({ ...prev, [active]: [...prev[active], userMsg] }));
    setInput("");
    setThinking((prev) => ({ ...prev, [active]: true }));
    scrollToBottom();

    setTimeout(() => {
      const reply = generateMockReply(active, text, citationPool);
      const assistantMsg: ChatMessageData = {
        id: `local-${Date.now()}-a`,
        role: "ASSISTANT",
        content: reply.content,
        citations: reply.citations.map((c) => ({ ...c, documentTitle: docTitleById[c.documentId] ?? "Document" })),
      };
      setMessagesByThread((prev) => ({ ...prev, [active]: [...prev[active], assistantMsg] }));
      setThinking((prev) => ({ ...prev, [active]: false }));
      scrollToBottom();
    }, MOCK_THINKING_DELAY_MS);
  }

  return (
    <Tabs value={active} onValueChange={(v) => setActive(v as ChatThreadType)} className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-4 py-3">
        <TabsList>
          {THREAD_ORDER.map((type) => {
            const cfg = THREAD_CONFIG[type];
            const Icon = cfg.icon;
            return (
              <TabsTrigger key={type} value={type} className="gap-1.5">
                <Icon className="size-3.5" />
                {cfg.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {THREAD_ORDER.map((type) => {
        const cfg = THREAD_CONFIG[type];
        return (
          <TabsContent key={type} value={type} className="flex flex-1 flex-col overflow-hidden data-[state=inactive]:hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {messagesByThread[type].map((m) => (
                  <ChatMessageView
                    key={m.id}
                    message={m}
                    onCitationClick={onCitationClick}
                    accentSoft={cfg.accentSoft}
                    accentText={cfg.accentText}
                  />
                ))}
                {thinking[type] && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className={cn("flex size-6 items-center justify-center rounded-full", cfg.accentSoft, cfg.accentText)}>
                      <Sparkles className="size-3.5 animate-pulse" />
                    </span>
                    Thinking…
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
            <div className="flex items-end gap-2 border-t border-slate-200 p-3">
              <Textarea
                value={active === type ? input : ""}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={cfg.placeholder}
                className="min-h-10 flex-1"
                rows={1}
              />
              <Button size="icon" variant="primary" onClick={handleSend} disabled={!input.trim()}>
                <Send className="size-4" />
              </Button>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
