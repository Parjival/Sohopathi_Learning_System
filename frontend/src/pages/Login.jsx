import React, { useState } from 'react';
import client from '../api';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handle = async e=>{
    e.preventDefault();
    try{
      const res = await client.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }catch(err){ alert(err?.response?.data?.message || err.message); }
  }

  return (
    <div className="container" style={{maxWidth:520,marginTop:40}}>
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handle} style={{marginTop:12}}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" style={{marginTop:8}} />
          <div style={{marginTop:12}}><button className="button">Login</button></div>
        </form>
      </div>
    </div>
  )
}
