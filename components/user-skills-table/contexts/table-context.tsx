"use client";

import { UserSkill } from "@prisma/client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ActionType } from "../action-type";

type TableCtx = {
  userSkills: UserSkill[];
  action: ActionType;
  setAction: Dispatch<SetStateAction<ActionType>>;
};

const tableContext = createContext<TableCtx>({
  userSkills: [],
  action: ActionType.NONE,
  setAction: () => {},
});

export const useTable = () => {
  const context = useContext(tableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};

export const TableProvider = ({
  children,
  userSkills,
}: {
  children: ReactNode;
  userSkills: UserSkill[];
}) => {
  const [action, setAction] = useState<ActionType>(ActionType.NONE);

  return (
    <tableContext.Provider value={{ userSkills, action, setAction }}>
      {children}
    </tableContext.Provider>
  );
};
