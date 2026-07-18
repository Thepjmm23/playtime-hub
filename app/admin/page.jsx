"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    checkRole();
  }, []);

  async function checkRole() {
    const { data: authUser } = await supabase.auth.getUser();
    if(!authUser.user) return setIsAdmin(false);

    // Checks Supabase custom "user_roles" table we made in Step 1
    const { data } = await supabase.from('user_roles').select('role').eq('id', authUser.user.id).single();
    if (data?.role === 'admin') setIsAdmin(true);
  }

  async function deleteTest() {
     // Put real delete logic here linked to database!
     alert("You successfully have admin rights to invoke DELETE.");
  }

  if (!isAdmin) {
    return <div className="p-10 text-center text-3xl font-bold text-red-500 bg-red-950 mt-10 rounded">ERROR 403: ACCESS DENIED. <br/>Admin Only!</div>
  }

  return (
    <div className="bg-red-950/20 border-2 border-red-700 p-8 mt-6 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-6">⚙️ Admin Control Center</h2>
      <p className="text-gray-400 mb-6 border-b border-gray-600 pb-2">Full Database Overrides Authorized.</p>
      
      <div className="grid grid-cols-2 gap-4 text-center">
         <button className="bg-red-700 text-white font-bold py-8 rounded-lg shadow-xl" onClick={deleteTest}>Remove / Wipe Bad User Entries</button>
         <button className="bg-purple-700 text-white font-bold py-8 rounded-lg shadow-xl">Manage API Limits</button>
      </div>
    </div>
  );
}