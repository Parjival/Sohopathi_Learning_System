import React from 'react';

export default function Layout({children}){
  const handleLogout = () => { localStorage.removeItem('token'); window.location.href = '/login'; }
  return (
    <div>
      <header className="container header">
        <h1>Sohopathi</h1>
        <div>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main className="container" style={{paddingBottom:80}}>{children}</main>
    </div>
  )
}
