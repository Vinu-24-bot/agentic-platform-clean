// client/src/lib/semantic.ts
// Simple TF-IDF based "semantic-ish" search (no external deps).
// items: { id: string, title?: string, content: string }

type Item = { id: string; title?: string; content: string };

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function buildIndex(items: Item[]) {
  // vocabulary and doc-term counts
  const docsTokens = items.map((it) => tokenize(it.title ? it.title + " " + it.content : it.content));
  const vocab = new Map<string, number>();
  docsTokens.forEach((tokens) => {
    const seen = new Set<string>();
    tokens.forEach((t) => {
      if (!vocab.has(t)) vocab.set(t, vocab.size);
      seen.add(t);
    });
  });

  const V = vocab.size;
  const idf = new Float32Array(V).fill(0);
  // compute doc frequencies
  docsTokens.forEach((tokens) => {
    const seen = new Set(tokens);
    seen.forEach((t) => {
      const i = vocab.get(t)!;
      idf[i] += 1;
    });
  });
  // convert to idf
  for (let i = 0; i < V; i++) {
    idf[i] = Math.log((items.length + 1) / (1 + idf[i])) + 1;
  }

  // compute TF-IDF vectors
  const vectors = docsTokens.map((tokens) => {
    const vec = new Float32Array(V).fill(0);
    tokens.forEach((t) => {
      const idx = vocab.get(t);
      if (idx !== undefined) vec[idx] += 1;
    });
    // normalize TF
    let max = 0;
    for (let i = 0; i < V; i++) if (vec[i] > max) max = vec[i];
    if (max > 0) for (let i = 0; i < V; i++) vec[i] = (vec[i] / max) * idf[i];
    return vec;
  });

  // normalize vectors (L2)
  vectors.forEach((v) => {
    let sum = 0;
    for (let i = 0; i < v.length; i++) sum += v[i] * v[i];
    const norm = Math.sqrt(sum) || 1;
    for (let i = 0; i < v.length; i++) v[i] = v[i] / norm;
  });

  return { items, vocab, idf, vectors };
}

function textToVector(q: string, vocab: Map<string, number>, idf: Float32Array) {
  const tokens = tokenize(q);
  const V = vocab.size;
  const vec = new Float32Array(V).fill(0);
  tokens.forEach((t) => {
    const idx = vocab.get(t);
    if (idx !== undefined) vec[idx] += 1;
  });
  let max = 0;
  for (let i = 0; i < V; i++) if (vec[i] > max) max = vec[i];
  if (max > 0) for (let i = 0; i < V; i++) vec[i] = (vec[i] / max) * idf[i];
  // normalize
  let sum = 0;
  for (let i = 0; i < V; i++) sum += vec[i] * vec[i];
  const norm = Math.sqrt(sum) || 1;
  for (let i = 0; i < V; i++) vec[i] = vec[i] / norm;
  return vec;
}

function cosine(a: Float32Array, b: Float32Array) {
  let s = 0;
  for (let i = 0; i < a.length && i < b.length; i++) s += a[i] * b[i];
  return s;
}

export function queryIndex(index: ReturnType<typeof buildIndex>, q: string, topK = 6) {
  if (!q.trim()) return [];
  const qv = textToVector(q, index.vocab, index.idf);
  const scores = index.vectors.map((v, i) => ({ score: cosine(qv, v), item: index.items[i] }));
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, topK).map((s) => ({ score: s.score, item: s.item }));
}
