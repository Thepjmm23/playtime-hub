"use client";
import './globals.css';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    // ANTI-INSPECT ELEMENT 
    const blockInspect = (e) => {
      if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I', 'J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        e.preventDefault(); return false;
      }
    };
    const blockClick = (e) => e.preventDefault();

    document.addEventListener('keydown', blockInspect);
    document.addEventListener('contextmenu', blockClick);

    return () => {
      document.removeEventListener('keydown', blockInspect);
      document.removeEventListener('contextmenu', blockClick);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#0d0f12] text-[#f1f5f9] min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
