import { useState } from "react";
import { createContext, useContext } from "react";

const GroupsContext = createContext();

function useGroups() {
  return useContext(GroupsContext);
}

function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  return (
    <GroupsContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupsContext.Provider>
  );
}
export { GroupProvider, useGroups };
