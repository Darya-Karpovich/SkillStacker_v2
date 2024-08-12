"use client";

import { Combobox } from "./combobox";
import { useState } from "react";
type AddSkillFormProps = {
  skillsOptions: { value: string; label: string }[];
};
export const AddSkillForm = ({ skillsOptions }: AddSkillFormProps) => {
  const [selectedSkill, setSelectedSkill] = useState("");

  return (
    <div>
      <Combobox
        options={skillsOptions}
        value={selectedSkill}
        onChange={setSelectedSkill}
        placeholder="Select a skill"
        emptyMessage="No skills found"
      />
    </div>
  );
};
