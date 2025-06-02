import { useState } from "react";
import { createContext, useContext } from "react";

const GroupsContext = createContext();

function useGroups() {
  return useContext(GroupsContext);
}

function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  function updateGroup(groupID, updateFields) {
    setGroups((prev) =>
      prev.map((g) => (g.groupID === groupID ? { ...g, ...updateFields } : g))
    );
  }
  return (
    <GroupsContext.Provider value={{ groups, setGroups, updateGroup }}>
      {children}
    </GroupsContext.Provider>
  );
}
export { GroupProvider, useGroups };
