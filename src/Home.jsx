import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';
import './App.css';

export default function Home() {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    fetchFichas();
  }, []);

  async function fetchFichas() {
    const { data } = await supabase.from('fichas').select('*');
    setFichas(data || []);
  }

  async function criarNovaFicha() {
    const nome = prompt("Nome do Forasteiro:");
    if (!nome) return;

    const { data, error } = await supabase
      .from('fichas')
      .insert([{ nome: nome, dados: { nome: nome, nivel: 1, atributos: {} } }])
      .select();

    if (!error) fetchFichas();
  }

  return (
    <div className="wood-background">
      <div className="container" style={{textAlign: 'center'}}>
        <h1 className="western-title">Saloon</h1>
        <button className="btn-western" onClick={criarNovaFicha}>+ Novo Cartaz</button>
        
        <div className="grid-2-col" style={{marginTop: '30px'}}>
          {fichas.map(ficha => (
            <Link key={ficha.id} to={`/ficha/${ficha.id}`} style={{textDecoration: 'none'}}>
              <div className="paper-frame western-box" style={{cursor: 'pointer', position: 'relative'}}>
                {/* MUDANÇA AQUI: Nova classe para a etiqueta */}
                <h2 className="character-label">{ficha.nome}</h2>
                <small style={{color: '#3e2723', display: 'block', marginTop: '10px'}}>ID: {ficha.id}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}