// client/src/components/SemanticSearch.tsx

import React, { useMemo, useState } from "react";
import { buildIndex, queryIndex } from "../lib/semantic";

const SAMPLE: { id: string; title?: string; content: string }[] = [
  { id: "1", title: "Agent: SalesBot", content: "Automates email outreach and lead scoring." },
  { id: "2", title: "Agent: SupportAgent", content: "Handles common customer support queries." },
  { id: "3", title: "Docs: Onboarding", content: "Steps to onboard a new customer including data migration." },
  { id: "4", title: "Feature: Live Collaboration", content: "Realtime cursors and presence for editing flows." },
];

export default function SemanticSearch() {
  const [q, setQ] = useState("");
  const index = useMemo(() => buildIndex(SAMPLE), []);
  const results = q ? queryIndex(index, q, 6) : [];

  return (
    <div className="w-full rounded-xl bg-neutral-900 border border-neutral-800 shadow-xl p-5 text-neutral-200">
      <h3 className="text-xl font-semibold mb-3 text-neutral-100">
        Semantic Search
      </h3>

      {/* Search Input */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search agents, docs, workflows..."
        className="
          w-full px-4 py-2 rounded-lg mb-4
          bg-neutral-800 border border-neutral-700
          text-neutral-100 placeholder-neutral-500
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {/* Results */}
      <div>
        {results.length === 0 && q && (
          <div className="text-sm text-neutral-500">No results found</div>
        )}

        {results.map((r) => (
          <div
            key={r.item.id}
            className="
              p-3 rounded-lg mb-2 cursor-pointer
              bg-neutral-800 border border-neutral-700
              hover:bg-neutral-750 hover:border-neutral-600
              transition-all duration-150
            "
          >
            <div className="text-sm font-medium text-neutral-100">
              {r.item.title ?? "(no title)"}
            </div>

            <div className="text-xs mt-1 text-neutral-400">
              {r.item.content}
            </div>

            <div className="text-[10px] mt-1 text-neutral-500">
              score: {r.score.toFixed(3)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
