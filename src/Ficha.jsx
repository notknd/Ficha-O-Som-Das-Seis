import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';

function Ficha() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DO ROLADOR DE DADOS ---
  const [showDiceTray, setShowDiceTray] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Novo: controla a tela de histórico
  const [diceResult, setDiceResult] = useState(null);
  const [lastRollType, setLastRollType] = useState('');
  const [diceHistory, setDiceHistory] = useState([]); // Novo: array de histórico

  const initialState = {
    imagemUrl: '',
    nome: '',
    nivel: 1,
    recompensa: 0,
    reputacao: 0,
    tormento: '',
    atributos: { fisico: 0, agilidade: 0, intelecto: 0, coragem: 0 },
    status: { vidaAtual: 10, vidaMax: 10, defesa: 0, iniciativa: 0, acoes: 1 },
    antecedentes: { combate: 0, negocios: 0, montaria: 0, tradicao: 0, labuta: 0, exploracao: 0, roubo: 0, medicina: 0 },
    
    // ATUALIZADO: Cavalo com vidaAtual e vidaMax
    cavalo: { 
        nome: '', 
        fidelidade: 0, 
        vigor: 0, 
        potencia: 0, 
        vidaAtual: 10, // Default para novos
        vidaMax: 10,   // Default para novos
        itens: '', 
        progresso: [false, false, false, false] 
    },

    habilidades: '',
    equipamento: ''
  };

  const [ficha, setFicha] = useState(initialState);

  useEffect(() => {
    async function carregarFicha() {
      const { data, error } = await supabase
        .from('fichas').select('dados').eq('id', id).single();

      if (data && data.dados) {
        const dadosCarregados = { ...initialState, ...data.dados };
        
        // MIGRATION: Garante campos do cavalo para fichas antigas
        if (!dadosCarregados.cavalo.progresso) dadosCarregados.cavalo.progresso = [false, false, false, false];
        
        // Se a ficha antiga não tinha vida do cavalo, define um padrão (ex: cálculo base)
        if (dadosCarregados.cavalo.vidaAtual === undefined) {
            const vigorBase = Number(dadosCarregados.cavalo.vigor || 0);
            dadosCarregados.cavalo.vidaAtual = 6 + vigorBase; // Exemplo de valor inicial
            dadosCarregados.cavalo.vidaMax = 6 + vigorBase;
        }

        if (!dadosCarregados.atributos || Object.keys(dadosCarregados.atributos).length === 0) dadosCarregados.atributos = initialState.atributos;
        
        setFicha(dadosCarregados);
      }
      setLoading(false);
    }
    carregarFicha();
  }, [id]);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(async () => {
      await supabase.from('fichas').update({ nome: ficha.nome, dados: ficha }).eq('id', id);
      console.log("Progresso salvo!");
    }, 1000);
    return () => clearTimeout(timer);
  }, [ficha, id, loading]);

  const handleChange = (e) => { const { name, value } = e.target; setFicha(prev => ({ ...prev, [name]: value })); };
  const handleNestedChange = (category, field, value) => { setFicha(prev => ({ ...prev, [category]: { ...prev[category], [field]: Number(value) } })); };
  
  // Atualizado para funcionar com qualquer campo do cavalo (texto ou numero)
  const handleCavaloChange = (field, value) => { 
      setFicha(prev => ({ 
          ...prev, 
          cavalo: { ...prev.cavalo, [field]: value } 
      })); 
  };
  
  const handleHorseProgressChange = (index) => {
    setFicha(prev => {
      const novoProgresso = [...prev.cavalo.progresso];
      novoProgresso[index] = !novoProgresso[index];
      return { ...prev, cavalo: { ...prev.cavalo, progresso: novoProgresso } };
    });
  };

  // --- FUNÇÃO DE ROLAR DADOS COM HISTÓRICO ---
  const rollDice = (sides) => {
    const result = Math.floor(Math.random() * sides) + 1;
    const type = `D${sides}`;
    
    setDiceResult(result);
    setLastRollType(type);
    
    // Adiciona ao início da lista de histórico
    setDiceHistory(prev => [{ id: Date.now(), type, result }, ...prev]);
  };

  if (loading) return <div className="wood-background"><h1 className="western-title">Carregando...</h1></div>;

  const ordemAtributos = ['fisico', 'agilidade', 'intelecto', 'coragem'];
  const ordemAntecedentes = ['combate', 'negocios', 'montaria', 'tradicao', 'labuta', 'exploracao', 'roubo', 'medicina'];

  return (
    <div className="wood-background">
      <div className="container">
        
        <header className="header">
          <div className="header-content">
            <Link to="/" className="btn-western">← Voltar</Link>
            <h1 className="western-title">A Sombra do Chapéu</h1>
            <button className="btn-western" onClick={() => { if(confirm('Limpar ficha?')) setFicha(initialState) }}>Resetar</button>
          </div>
        </header>

        {/* --- GRID SUPERIOR --- */}
        <div className="top-grid">
          
          <main className="ficha-card paper-frame">
            <section className="section-basic grid-3-header">
              <div className="input-group rustic-input">
                <label>Nome</label>
                <input type="text" name="nome" value={ficha.nome} onChange={handleChange} className="handwritten huge-text"/>
              </div>
              <div className="input-group rustic-input short">
                <label>Nível</label>
                <input type="number" name="nivel" value={ficha.nivel} onChange={handleChange} />
              </div>
              <div className="input-group rustic-input">
                <label>Recompensa ($)</label>
                <input type="number" name="recompensa" value={ficha.recompensa} onChange={handleChange} />
              </div>
            </section>

            <div className="divider-rope"></div>

            <div className="grid-2-col">
              <div>
                <div className="som-das-seis-card">
                  <h3 className="western-subtitle inverted">Atributos</h3>
                  <div className="attributes-list">
                    {ordemAtributos.map((attr) => (
                      <div key={attr} className="stat-row">
                        <span className="stat-label">{attr}</span>
                        <div className="dots-wrapper">
                          {[1, 2, 3, 4, 5].map((valor) => (
                            <div key={valor} className={`stat-dot ${ficha.atributos[attr] >= valor ? 'filled' : ''}`}
                              onClick={() => handleNestedChange('atributos', attr, valor)}>
                              {ficha.atributos[attr] >= valor && '♦'}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="western-subtitle">Status</h3>
                <div className="status-grid">
                   <div className="status-box">
                      <label>VIDA</label>
                      <div style={{display:'flex', gap:'5px', justifyContent:'center'}}>
                        <input type="number" value={ficha.status.vidaAtual} onChange={(e) => handleNestedChange('status', 'vidaAtual', e.target.value)} />
                        <span style={{alignSelf:'center'}}>/</span>
                        <input type="number" value={ficha.status.vidaMax} onChange={(e) => handleNestedChange('status', 'vidaMax', e.target.value)} />
                      </div>
                   </div>
                   <div className="status-box"><label>DEFESA</label><input type="number" value={ficha.status.defesa} onChange={(e) => handleNestedChange('status', 'defesa', e.target.value)} /></div>
                   <div className="status-box"><label>INICIATIVA</label><input type="number" value={ficha.status.iniciativa} onChange={(e) => handleNestedChange('status', 'iniciativa', e.target.value)} /></div>
                   <div className="status-box"><label>AÇÕES</label><input type="number" value={ficha.status.acoes} onChange={(e) => handleNestedChange('status', 'acoes', e.target.value)} /></div>
                </div>

                <div className="paper-frame-dark mt-20" style={{borderWidth:'2px', padding:'10px'}}>
                    <div className="input-group rustic-input dark-mode">
                        <label style={{textAlign:'center', width:'100%'}}>Tormento (Vício/Defeito)</label>
                        <textarea name="tormento" value={ficha.tormento} onChange={handleChange} rows="2" className="handwritten" style={{textAlign:'center'}}></textarea>
                    </div>
                </div>
              </div>
            </div>
          </main>

          <aside className="sidebar">
            <div className="paper-frame wanted-poster">
              {ficha.imagemUrl ? (
                <img src={ficha.imagemUrl} alt="Retrato" className="char-image" />
              ) : (
                <div className="image-placeholder"><span>PROCURADO</span></div>
              )}
            </div>
            <div className="rustic-input mt-10">
              <input type="text" name="imagemUrl" value={ficha.imagemUrl} onChange={handleChange} 
                placeholder="URL da Imagem..." style={{fontSize: '0.8rem', textAlign: 'center'}} />
            </div>
          </aside>
        </div>

        {/* --- GRID DO MEIO --- */}
        <div className="middle-grid">
            <div className="paper-frame">
                <h3 className="western-subtitle">Antecedentes</h3>
                <section className="antecedentes-grid">
                  {ordemAntecedentes.map((ant) => (
                    <div key={ant} className="antecedente-row">
                      <span className="label-text">{ant}</span>
                      <div className="dots-container">
                         <input type="number" value={ficha.antecedentes[ant]} 
                            onChange={(e) => handleNestedChange('antecedentes', ant, e.target.value)}
                            className="small-input" />
                      </div>
                    </div>
                  ))}
                </section>
            </div>

            <div className="paper-frame">
                <h3 className="western-subtitle">Habilidades & Talentos</h3>
                <div className="input-group rustic-input">
                    <textarea name="habilidades" value={ficha.habilidades} onChange={handleChange}
                      rows="12"
                      className="handwritten area-texture"
                      placeholder="Ex: Light My Fire (+1 revólver)..."
                    ></textarea>
                </div>
            </div>
        </div>

        <div className="paper-frame mb-20" style={{marginBottom: '30px'}}>
            <h3 className="western-subtitle">Equipamento & Inventário</h3>
            <div className="input-group rustic-input">
                <textarea name="equipamento" value={ficha.equipamento} onChange={handleChange}
                  rows="6"
                  className="handwritten area-texture"
                  placeholder="Seus pertences, armas e munição..."
                ></textarea>
            </div>
        </div>

        {/* --- CAVALO --- */}
        <section className="paper-frame horse-section mt-20">
            <h2 className="western-title" style={{textAlign:'center', fontSize:'2em'}}>Seu Cavalo</h2>
            <div className="grid-2-col mt-20">
              <div className="input-group rustic-input"><label>Nome</label><input type="text" value={ficha.cavalo.nome} onChange={(e) => handleCavaloChange('nome', e.target.value)} className="handwritten huge-text"/></div>
              <div className="input-group rustic-input short" style={{justifySelf:'end'}}><label>Fidelidade</label><input type="number" value={ficha.cavalo.fidelidade} onChange={(e) => handleCavaloChange('fidelidade', e.target.value)}/></div>
            </div>
            <div className="divider-rope" style={{margin:'15px 0', opacity:0.4}}></div>
            <div className="horse-grid-3">
                <div className="horse-stats-col">
                    <div className="stat-row horse-stat-row">
                      <span className="stat-label">Potência</span>
                      <div className="dots-wrapper">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <div key={valor} className={`stat-dot ${ficha.cavalo.potencia >= valor ? 'filled' : ''}`}
                            onClick={() => handleCavaloChange('potencia', valor)}>
                            {ficha.cavalo.potencia >= valor && '♦'}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="stat-row horse-stat-row mt-10">
                      <span className="stat-label">Vigor</span>
                      <div className="dots-wrapper">
                        {[1, 2, 3, 4, 5].map((valor) => (
                          <div key={valor} className={`stat-dot ${ficha.cavalo.vigor >= valor ? 'filled' : ''}`}
                            onClick={() => handleCavaloChange('vigor', valor)}>
                            {ficha.cavalo.vigor >= valor && '♦'}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
                
                {/* VIDA DO CAVALO (AGORA EDITÁVEL) */}
                <div className="horse-calculated-col western-box">
                    <div className="calc-item">
                        <label>VIDA</label>
                        <div className="horse-life-inputs">
                            <input type="number" value={ficha.cavalo.vidaAtual} onChange={(e) => handleCavaloChange('vidaAtual', e.target.value)} />
                            <span>/</span>
                            <input type="number" value={ficha.cavalo.vidaMax} onChange={(e) => handleCavaloChange('vidaMax', e.target.value)} />
                        </div>
                    </div>
                    <div className="calc-item"><label>DEFESA</label><span className="huge-text">{5 + Number(ficha.cavalo.vigor || 0)}</span></div>
                    <div className="calc-item"><label>DANO</label><span className="huge-text">{6 + Number(ficha.cavalo.potencia || 0)}</span></div>
                </div>

                <div className="horse-items-col">
                    <h3 className="western-subtitle" style={{margin:0}}>Itens no Cavalo</h3>
                     <textarea value={ficha.cavalo.itens} onChange={(e) => handleCavaloChange('itens', e.target.value)} rows="8" className="handwritten area-texture"></textarea>
                </div>
            </div>
             <div className="divider-rope" style={{margin:'15px 0', opacity:0.4}}></div>
            <div className="horse-progression-list">
                {[
                    "Antes de mais nada, dê um nome a seu animal. Agora sabe quando você está falando com ele.",
                    "O Cavalo corre mais rápido e pode saltar mais longe. Adicione +1 à sua Potência.",
                    "O Cavalo vai até você com um assovio, e não permite que outras pessoas o montem.",
                    "Seu Cavalo está mais esbelto e forte. Adicione +2 à sua potência."
                ].map((text, idx) => (
                    <div key={idx} className="progression-item">
                        <div className={`big-checkbox ${ficha.cavalo.progresso[idx] ? 'checked' : ''}`}
                          onClick={() => handleHorseProgressChange(idx)}>
                           {ficha.cavalo.progresso[idx] && '✓'}
                        </div>
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- ROLADOR DE DADOS (FLUTUANTE) --- */}
        <div className="dice-fab" onClick={() => setShowDiceTray(!showDiceTray)}>
          <svg className="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M7 7.5C7 8.33 6.33 9 5.5 9S4 8.33 4 7.5 4.67 6 5.5 6 7 6.67 7 7.5M7 16.5C7 17.33 6.33 18 5.5 18S4 17.33 4 16.5 4.67 15 5.5 15 7 15.67 7 16.5M12 7.5C12 8.33 11.33 9 10.5 9S9 8.33 9 7.5 9.67 6 10.5 6 12 6.67 12 7.5M12 16.5C12 17.33 11.33 18 10.5 18S9 17.33 9 16.5 9.67 15 10.5 15 12 15.67 12 16.5M17 7.5C17 8.33 16.33 9 15.5 9S14 8.33 14 7.5 14.67 6 15.5 6 17 6.67 17 7.5M17 16.5C17 17.33 16.33 18 15.5 18S14 17.33 14 16.5 14.67 15 15.5 15 17 15.67 17 16.5Z" />
          </svg>
        </div>

        {showDiceTray && (
          <div className="dice-tray">
            <div className="dice-header-row">
                <h4 className="dice-title">Rolagem</h4>
                {/* Botão para alternar visualização (Histórico) */}
                <button className="btn-history" onClick={() => setShowHistory(!showHistory)} title="Ver Histórico">
                    {showHistory ? '🎲' : '📜'}
                </button>
            </div>

            {/* Alterna entre Botões e Histórico */}
            {!showHistory ? (
                <>
                    <div className="dice-result-display">
                    {diceResult !== null ? diceResult : '-'}
                    </div>
                    <div className="dice-history">
                    {lastRollType && `Último: ${lastRollType}`}
                    </div>
                    <div className="dice-grid">
                        <button className="dice-btn d6" onClick={() => rollDice(6)}>D6</button>
                        <button className="dice-btn" onClick={() => rollDice(4)}>D4</button>
                        <button className="dice-btn" onClick={() => rollDice(8)}>D8</button>
                        <button className="dice-btn" onClick={() => rollDice(10)}>D10</button>
                        <button className="dice-btn" onClick={() => rollDice(12)}>D12</button>
                        <button className="dice-btn" onClick={() => rollDice(20)}>D20</button>
                    </div>
                </>
            ) : (
                <div className="history-list">
                    {diceHistory.length === 0 ? (
                        <p style={{textAlign:'center', opacity:0.6, fontSize:'0.8em'}}>Nenhum dado rolado ainda.</p>
                    ) : (
                        diceHistory.map((roll) => (
                            <div key={roll.id} className="history-item">
                                <span>{roll.type}</span>
                                <span className="history-val">{roll.result}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Ficha;