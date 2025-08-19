import { motion } from "framer-motion";

export default function Candidate({ name, votes, onVote }) {
  const confirmVote = () => {
    if (window.confirm(`Are you sure you want to vote for ${name}?`)) {
      onVote();
    }
  };

  return (
    <motion.div
      className="candidate-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2>{name}</h2>
      <p>Votes: {votes}</p>
      <button onClick={confirmVote}>Vote</button>
    </motion.div>
  );
}
