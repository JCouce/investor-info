import './App.css'
import InsiderActivityPanel from './components/InsiderActivityPanel'

export default function App() {
  return (
    <main className="bg-black min-h-screen text-white">
      <header className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Actividad de Insiders</h1>
        <p className="text-sm text-zinc-400">Transacciones relevantes de ejecutivos en empresas públicas</p>
      </header>
      
      <section className="p-6">
        <InsiderActivityPanel />
      </section>
    </main>
  );
}
