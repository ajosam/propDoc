import type { ChatThread, ChatThreadType } from "@/lib/types";

const WELCOME_MESSAGE: Record<ChatThreadType, string> = {
  GENERAL: "This thread is ready. Ask me anything about the project, unit, or developer once you've explored the document.",
  FINANCIAL: "Ask me about the payment plan, service charges, or projected net yield for this unit.",
  LEGAL: "Ask me about specific SPA clauses once a Sale & Purchase Agreement is uploaded for this property.",
  LOCATION: "Ask me about the neighbourhood, connectivity, or comparable projects nearby.",
};

const THREAD_TYPES: ChatThreadType[] = ["GENERAL", "FINANCIAL", "LEGAL", "LOCATION"];

/** Builds the four chat threads with a single welcome message, for a newly added property with no chat history yet. */
export function buildWelcomeChatThreads(idPrefix: string): ChatThread[] {
  return THREAD_TYPES.map((type) => ({
    type,
    messages: [
      {
        id: `${idPrefix}-${type.toLowerCase()}-0`,
        role: "ASSISTANT",
        content: WELCOME_MESSAGE[type],
        citations: [],
      },
    ],
  }));
}
