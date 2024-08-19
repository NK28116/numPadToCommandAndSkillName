// src/components/SkillNameList.tsx
import React from "react"

type SkillNameListProps = {
  skillNameList: string[]
}

const SkillNameList: React.FC<SkillNameListProps> = ({ skillNameList }) => {
  return (
    <div>
      {skillNameList.length > 0 ? (
        skillNameList.map((skillName, index) => (
          <div key={index}>
            <p>Skill Name: {skillName}</p>
          </div>
        ))
      ) : (
        <p>No skills found</p>
      )}
    </div>
  )
}

export default SkillNameList
