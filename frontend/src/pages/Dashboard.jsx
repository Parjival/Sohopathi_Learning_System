import React, { useState } from 'react';
import Layout from '../components/Layout';
import SkillCard from '../components/SkillCard';
import StorybookCreator from '../components/StorybookCreator';
import SignLanguagePlayer from '../components/SignLanguagePlayer';
import AudiobookPlayer from '../components/AudiobookPlayer';
import LiveCaption from '../components/LiveCaption';

export default function Dashboard(){
  const [active, setActive] = useState(null);

  const skills = [
    { id:'storybook', title:'Dyslexic Support', desc:'Convert text to easy, illustrated storybooks.' },
    { id:'sign', title:'Deaf Support', desc:'Create sign language videos from text.' },
    { id:'audiobook', title:'Blind Support', desc:'Convert content to audiobooks.' },
    { id:'live_caption', title:'Live Captioning', desc:'Transcribe audio/lectures to captions.' },
    { id:'social_story', title:'Social Stories', desc:'Create social stories for ASD.' },
    { id:'describe_image', title:'Image Description', desc:'Describe images for visually impaired.' },
    { id:'math', title:'Math Support', desc:'Step-by-step math help.' },
    { id:'emotion', title:'Emotion Coaching', desc:'Emotion support and coaching.' },
    { id:'comm_board', title:'Communication Board', desc:'Create AAC communication boards.' },
  ];

  return (
    <Layout>
      <div style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <div className="card">
            <h2>Skills</h2>
            <div className="skill-grid" style={{marginTop:12}}>
              {skills.map(s=> (
                <div key={s.id} onClick={()=>setActive(s.id)}>
                  <SkillCard title={s.title} desc={s.desc} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{width:520}}>
          {active=== 'storybook' && <StorybookCreator />}
          {active=== 'sign' && <SignLanguagePlayer />}
          {active=== 'audiobook' && <AudiobookPlayer />}
          {active=== 'live_caption' && <LiveCaption />}
          {active && !['storybook','sign','audiobook','live_caption'].includes(active) && (
            <div className="card"><h3>Selected: {active}</h3><p>Implement UI for this skill similarly.</p></div>
          )}
        </div>
      </div>
    </Layout>
  )
}
