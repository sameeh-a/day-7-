import { createContext, useContext, useState } from "react";

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState({
    A: 0,
    B: 0,
    C: 0,
  });

  const addVote = (candidate) => {
    setVotes((prev) => ({ ...prev, [candidate]: prev[candidate] + 1 }));
  };

  const resetVotes = () => {
    setVotes({ A: 0, B: 0, C: 0 });
  };

  return (
    <VoteContext.Provider value={{ votes, addVote, resetVotes }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVotes = () => useContext(VoteContext);
