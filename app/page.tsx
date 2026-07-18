"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);
  const [runs, setRuns] = useState([]);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
    fetchRuns();
  }, []);

  async function fetchRuns() {
    const { data } = await supabase.from('speedruns').select('*').order('created_at', { ascending: false });
    if (data) setRuns(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return alert("You must sign in first!");

    const payload = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      version: e.target.version.value,
      email: user.email || 'User'
    };

    const res = await fetch('/api/submitRun', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    const result = await res.json();
    if (result.error) alert(result.error); 
    else {
      alert("Submitted!");
      fetchRuns(); 
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-red-500">Speedruns & Discoveries</h2>
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
          {runs.map(run => (
             // You need to setup database connection first to see data!
            <div key={run.id} className="bg-gray-800 p-4 rounded shadow border-l-4 border-blue-500">
              <h3 className="font-bold text-xl">{run.title}</h3>
              <p className="text-sm text-gray-400">Category: {run.category} | V: {run.version}</p>
              <p className="mt-2 text-gray-300 bg-gray-900 p-2 rounded">{run.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 border-2 border-gray-700 rounded-lg h-min">
        <h3 className="text-xl font-bold mb-4">Post a run or hack</h3>
        {!user ? <p className="text-red-500 font-bold mb-2 p-4 bg-red-900/30 rounded border border-red-500 text-center">Please Sign in via Discord in Navbar!</p> : null}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="title" required placeholder="Run / Glitch Title" className="p-3 bg-gray-900 rounded border border-gray-600 text-white" disabled={!user}/>
          <select name="category" className="p-3 bg-gray-900 rounded border border-gray-600 text-white" disabled={!user}>
             <option value="Any%">Any% Speedrun</option>
             <option value="Glitch">Out of Bounds / Glitch</option>
          </select>
          <input name="version" required placeholder="Build/Patch Version (e.g. Steam V1.3)" className="p-3 bg-gray-900 rounded border border-gray-600 text-white" disabled={!user} />
          <textarea name="description" required placeholder="Description..." className="p-3 bg-gray-900 rounded border border-gray-600 h-32 text-white" disabled={!user}></textarea>
          <button className={`p-3 rounded font-bold ${user ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`} disabled={!user}>
            Submit Data Securely
          </button>
        </form>
      </div>
    </div>
  );
}
