import React, { useContext, useMemo } from "react";
import { VoteContext } from "../context/VoteContext";
import ProgressBar from "../components/ProgressBar";

export default function ResultsPage() {
  const { candidates } = useContext(VoteContext);

  const totalVotes = useMemo(
    () => candidates.reduce((sum, c) => sum + (c.votes || 0), 0),
    [candidates]
  );

  // Find leader(s)
  const maxVotes = useMemo(() => Math.max(...candidates.map((c) => c.votes || 0)), [candidates]);
  const leaders = useMemo(
    () => candidates.filter((c) => (c.votes || 0) === maxVotes && maxVotes > 0),
    [candidates, maxVotes]
  );

  return (
    <div className="min-h-screen p-8" style={{ background: "linear-gradient(135deg,#021428,#06345a)", color: "#f3f7fb" }}>
      <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>📊 Voting Results</h1>
        <p style={{ marginBottom: 18, color: "#cfe7ff" }}>Live vote counts and percentages (updated automatically).</p>

        <div style={{ display: "grid", gap: 12 }}>
          {candidates.map((c) => (
            <div key={c.id} style={{ background: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{c.symbol} {c.name}</div>
                  <div style={{ color: "#bcd6f6", fontSize: 13 }}>{c.manifesto}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{c.votes || 0}</div>
                  <div style={{ color: "#bcd6f6", fontSize: 12 }}>votes</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <ProgressBar value={c.votes || 0} max={totalVotes || 1} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#cfe7ff", fontSize: 14 }}>Total Votes</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{totalVotes}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            {totalVotes === 0 ? (
              <div style={{ color: "#9fb6d6", fontWeight: 700 }}>No votes yet</div>
            ) : leaders.length === 1 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ background: "linear-gradient(90deg,#ffd54a,#ffcc00)", padding: 10, borderRadius: 10 }}>
                  <span style={{ fontSize: 22, fontWeight: 900 }}>🏆</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: "#ffeaa7" }}>Leading</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{leaders[0].name}</div>
                </div>
              </div>
            ) : (
              <div style={{ color: "#ffd9a6", fontWeight: 800 }}>
                It's a tie between {leaders.map((l) => l.name).join(" & ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
