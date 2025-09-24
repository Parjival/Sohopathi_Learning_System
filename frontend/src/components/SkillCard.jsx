import React from 'react';

export default function SkillCard({title, desc, onClick}){
  return (
    <div className="skill-card card" onClick={onClick} role="button" tabIndex={0}>
      <h3>{title}</h3>
      <p style={{marginTop:8}}>{desc}</p>
    </div>
  )
}
