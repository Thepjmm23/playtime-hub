"use client";
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const loginWithDiscord = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'discord' });
  };

  return (
    <nav className="bg-gray-900 border-b-2 border-red-800 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-500">
          🎮 Playtime<span className="text-blue-500">Hub</span>
        </h1>
        <div className="flex gap-6 font-semibold text-lg items-center">
          <Link href="/" className="text-white hover:text-red-500">Speedruns</Link>
          <Link href="/wiki" className="text-white hover:text-red-500">Steam Wiki</Link>
          <Link href="/admin" className="text-gray-400 hover:text-blue-400">Admin Panel</Link>
          <button onClick={loginWithDiscord} className="bg-[#5865F2] hover:bg-blue-600 px-4 py-2 text-white font-bold rounded">
            Discord Login
          </button>
        </div>
      </div>
    </nav>
  );
}