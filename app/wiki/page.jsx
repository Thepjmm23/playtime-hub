export default function Wiki() {
  return (
    <div className="bg-gray-800 rounded p-6 shadow-xl border border-blue-900/50 mt-6">
      <h2 className="text-4xl font-black text-red-500 mb-6">📖 Playtime Co. Archive Hub</h2>
      <p className="mb-4 text-gray-300">All Database Information sourced directly from Official Documentation & SteamDB APIs.</p>

      <div className="mb-6 bg-gray-900 p-4 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-bold text-blue-400 border-b border-blue-900 pb-2 mb-2">📦 Steam Versions / DLC Directory</h3>
        <ul className="space-y-3">
          <li className="flex justify-between p-2 hover:bg-gray-800 rounded"><span>Base Game: Chapter 1</span> <span className="font-mono text-gray-500">AppID: 1721470</span></li>
          <li className="flex justify-between p-2 hover:bg-gray-800 rounded"><span>DLC: Chapter 2 (Fly in a Web)</span> <span className="font-mono text-gray-500">AppID: 1721471</span></li>
          <li className="flex justify-between p-2 hover:bg-gray-800 rounded"><span>DLC: Chapter 3 (Deep Sleep)</span> <span className="font-mono text-gray-500">AppID: 1721472</span></li>
        </ul>
      </div>

      <a href="https://store.steampowered.com/app/1721470/Poppy_Playtime/" target="_blank" className="inline-block bg-[#1a3f7a] text-white p-3 rounded font-bold hover:bg-blue-800 shadow">
        View Official Store Page
      </a>
    </div>
  );
}