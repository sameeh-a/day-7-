import { useVote } from "../context/VoteContext";
import Candidate from "../components/Candidate";
import { useState } from "react";

export default function VotingPage() {
  const { voterName, setVoterName, addVote } = useVote();
  const [message, setMessage] = useState("");

  const handleVote = (candidate) => {
    const result = addVote(candidate);
    setMessage(result.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">🗳️ Voting Booth</h1>

      {/* Voter Name Input */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Enter your name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />
      </div>

      {/* Candidates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Candidate name="Future Vision" onVote={handleVote} />
        <Candidate name="Green Nation" onVote={handleVote} />
        <Candidate name="Youth Republics" onVote={handleVote} />
      </div>

      {/* Message */}
      {message && (
        <p className="text-center mt-6 text-yellow-300 font-semibold">{message}</p>
      )}
    </div>
  );
}
