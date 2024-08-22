import React from "react"

type SkillNameListProps = {
  skillNameList: string[]
}

const SkillNameList: React.FC<SkillNameListProps> = ({ skillNameList }) => {
  return (
    <div>{skillNameList.length > 0 ? <p>Skill Name: {skillNameList.join(" -> ")}</p> : <p>No skills found</p>}</div>
  )
}

export default SkillNameList
