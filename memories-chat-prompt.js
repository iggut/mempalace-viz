/**
 * System prompt and message assembly for grounded memory chat.
 */

export const MEMORIES_CHAT_SYSTEM = `You are the MemPalace memory guide. Your job is to help the user understand what is stored in their memory palace.

Rules:
- Base every factual claim on the "Retrieved memories" section in the user message. If that section is empty or too thin, say you did not find enough in stored memories and suggest how to refine the question.
- Do not invent drawer contents, file paths, or facts not present in the retrieved text.
- If you must reason beyond the text, prefix with "Inference:" and keep it brief.
- Cite locations naturally (wing / room) when they appear in the evidence.
- Be concise and useful — this is a memory browser assistant, not a general chatbot.`;

/**
 * @param {Array<{ role: string, content: string }>} thread — full UI thread; must end with the latest user turn (plain question).
 * @param {string} evidenceBlock — from formatRetrievalContextForPrompt
 * @param {{ maxPriorPairs?: number }} [opts]
 * @returns {Array<{ role: string, content: string }>}
 */
export function buildOpenAiMessagesFromThread(thread, evidenceBlock, opts = {}) {
  const maxPairs = opts.maxPriorPairs ?? 6;
  /** @type {Array<{ role: string, content: string }>} */
  const msgs = [{ role: 'system', content: MEMORIES_CHAT_SYSTEM }];

  if (!Array.isArray(thread) || thread.length < 1) {
    msgs.push({
      role: 'user',
      content: wrapEvidenceAndQuestion(evidenceBlock, ''),
    });
    return msgs;
  }

  const last = thread[thread.length - 1];
  const lastQuestion =
    last?.role === 'user' && typeof last.content === 'string' ? last.content : '';

  const prior = last?.role === 'user' ? thread.slice(0, -1) : thread.slice();
  /** @type {Array<{ role: 'user'|'assistant', content: string }>} */
  const pairs = [];
  for (const m of prior) {
    if (m.role === 'user' && typeof m.content === 'string' && m.content.trim()) {
      pairs.push({ role: 'user', content: m.content });
    } else if (
      m.role === 'assistant' &&
      typeof m.content === 'string' &&
      m.content.trim() &&
      !m.error
    ) {
      pairs.push({ role: 'assistant', content: m.content });
    }
  }
  const trimmed =
    pairs.length > maxPairs * 2 ? pairs.slice(pairs.length - maxPairs * 2) : pairs;

  for (const p of trimmed) {
    msgs.push({ role: p.role, content: p.content });
  }

  msgs.push({
    role: 'user',
    content: wrapEvidenceAndQuestion(evidenceBlock, lastQuestion),
  });
  return msgs;
}

/**
 * @param {string} evidenceBlock
 * @param {string} question
 */
function wrapEvidenceAndQuestion(evidenceBlock, question) {
  const ev = evidenceBlock || '(No retrieved memories matched this query.)';
  return `### Retrieved memories (evidence — answer from this only)\n${ev}\n\n### Question\n${question.trim()}`;
}
