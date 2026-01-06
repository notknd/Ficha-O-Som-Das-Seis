# Ficha Digital O Som Das Seis

> Um sistema digital, interativo e temático para gerenciamento de fichas do sistema O Som Das Seis.

![Status do Projeto](https://img.shields.io/badge/Status-Finalizado-success)
![React](https://img.shields.io/badge/React-v18-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## Sobre o Projeto

O projeto se trata de uma Single Page Application (SPA) desenvolvida para digitalizar a ficha do sistema de RPG: O Som Das Seis. O projeto substitui as fichas de papel tradicionais por uma interface web responsiva, persistente e estilizada.

O objetivo principal foi criar uma ferramenta que permitisse aos jogadores focarem na narrativa, automatizando cálculos e garantindo que o progresso (itens, xp, status) fosse salvo automaticamente na nuvem.

---

## Funcionalidades Principais

* **Gerenciamento de Personagens:** Criação e visualização de múltiplas fichas de personagens.

* **Persistência de Dados em Tempo Real:** Integração com **Supabase** para salvar automaticamente qualquer alteração feita na ficha (sistema de *auto-save* com debouncing).

* **Interface Temática:** Design imersivo utilizando CSS puro (sem frameworks de UI) para criar texturas de madeira, papel envelhecido, couro e efeitos de "papel rasgado".

* **Sistema de Atributos Interativo:** Controle de atributos e perícias através de inputs visuais customizados (bolinhas/losangos) em vez de campos numéricos simples.

* **Cálculos Automatizados:** Vida, Defesa, Iniciativa e Dano são calculados automaticamente com base nos atributos do personagem.

* **Rolador de Dados Integrado:** Widget flutuante (`Floating Action Button`) que expande para uma bandeja de dados, permitindo rolagens rápidas (D4, D6, D8, D10, D12, D20) sem sair da tela.

* **Seção de Montaria:** Área dedicada ao gerenciamento do cavalo, incluindo atributos próprios e sistema de progressão via *checkboxes*.

* **Responsividade:** Layout fluido que se adapta a desktops (grid complexo) e dispositivos móveis (coluna única).

---

## Tecnologias Utilizadas

### Front-end
* **React.js (Vite):** Biblioteca principal para construção da interface e gerenciamento de estado.

* **React Router Dom:** Para navegação entre a listagem de personagens e a ficha individual.

* **CSS3 Moderno:** Uso extensivo de:
    * `CSS Variables` para theming.
    * `Grid` e `Flexbox` para layouts complexos.
    * `Clip-path` e `Drop-shadow` para efeitos visuais avançados (ex: etiquetas rasgadas).
    * Animações CSS (`keyframes`) para interações de UI.

### Back-end / BaaS
* **Supabase:** Utilizado como banco de dados PostgreSQL para armazenar os objetos JSON das fichas.

---

## Destaques de UI/UX

O projeto foca fortemente na imersão:
1.  **Estética:** Fontes estilizadas para remeter a cartazes de procurado e documentos datilografados.

2.  **Feedback Visual:** Elementos interativos reagem ao mouse (hover, transformações).

3.  **Organização:** A ficha é dividida logicamente em:
    * *Esquerda:* Combate e Atributos.
    * *Direita:* Roleplay, Inventário e Imagem.
    * *Inferior:* Montaria.

---

## Como rodar o projeto localmente

Pré-requisitos: Node.js instalado.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/notknd/Ficha-O-Som-Das-Seis.git
   cd Ficha-O-Som-Das-Seis```

2. **Instalar dependências**
    ```bash
    npm install```

3. **Configurar Variáveis de Ambiente**

    Crie um arquivo.env na raiz do projeto e adicione suas credenciais do Supabase

    ```bash
    VITE_SUPABASE_URL=sua_url_do_supabase
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima```


4. **Rodar o projeto**
    ```bash
    npm run dev```
O projeto estará disponível em  http://localhost:5173

---

## Deploy (Vercel)
Para colocar o projeto online gratuitamente na Vercel:

1. Crie um arquivo vercel.json na raiz do projeto com o seguinte conteúdo para configurar as rotas do SPA:
    ```json
    {
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }```

2. Suba o código para o seu GitHub

3. Crie uma conta na Vercel e importe o repositório

4. Nas configurações do projeto na Vercel, adicione as mesmas Variáveis de Ambiente do passo anterior.

5. Clique em Deploy

### Estrutura de Pastas
```
src/
├── assets/           # Imagens e ícones
├── App.css           # Estilos globais e componentes visuais (CSS Puro)
├── App.jsx           # Configuração de Rotas
├── Ficha.jsx         # Componente Principal: Lógica da ficha, cálculos e UI
├── Home.jsx          # Dashboard: Seleção e criação de personagens
├── main.jsx          # Ponto de entrada React
└── supabaseClient.js # Configuração da conexão com o banco de dados
```

--- 

## Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar como inspiração para suas próprias campanhas de RPG.

<p align="center"> Desenvolvido por Kendy H.</p>