# 🤠 Saloon - Gerenciador de Fichas de RPG

> Um sistema digital, interativo e temático para gerenciamento de fichas de personagens de RPG de mesa com temática "Old West".

![Status do Projeto](https://img.shields.io/badge/Status-Finalizado-success)
![React](https://img.shields.io/badge/React-v18-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)

## 📖 Sobre o Projeto

O **Saloon** é uma Single Page Application (SPA) desenvolvida para digitalizar a experiência de jogar um RPG de Velho Oeste. O projeto substitui as fichas de papel tradicionais por uma interface web responsiva, persistente e altamente estilizada.

O objetivo principal foi criar uma ferramenta que permitisse aos jogadores focarem na narrativa, automatizando cálculos e garantindo que o progresso (itens, xp, status) fosse salvo automaticamente na nuvem.

---

## 🚀 Funcionalidades Principais

* **Gerenciamento de Personagens:** Criação e visualização de múltiplas fichas de personagens.
* **Persistência de Dados em Tempo Real:** Integração com **Supabase** para salvar automaticamente qualquer alteração feita na ficha (sistema de *auto-save* com debouncing).
* **Interface Temática:** Design imersivo utilizando CSS puro (sem frameworks de UI) para criar texturas de madeira, papel envelhecido, couro e efeitos de "papel rasgado".
* **Sistema de Atributos Interativo:** Controle de atributos e perícias através de inputs visuais customizados (bolinhas/losangos) em vez de campos numéricos simples.
* **Cálculos Automatizados:** Vida, Defesa, Iniciativa e Dano são calculados automaticamente com base nos atributos do personagem.
* **Rolador de Dados Integrado:** Widget flutuante (`Floating Action Button`) que expande para uma bandeja de dados, permitindo rolagens rápidas (D4, D6, D8, D10, D12, D20) sem sair da tela.
* **Seção de Montaria:** Área dedicada ao gerenciamento do cavalo, incluindo atributos próprios e sistema de progressão via *checkboxes*.
* **Responsividade:** Layout fluido que se adapta a desktops (grid complexo) e dispositivos móveis (coluna única).

---

## 🛠️ Tecnologias Utilizadas

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

## 🎨 Destaques de UI/UX

O projeto foca fortemente na "Diegese" (imersão):
1.  **Estética:** Fontes *Rye* e *Courier Prime* para remeter a cartazes de procurado e documentos datilografados.
2.  **Feedback Visual:** Elementos interativos reagem ao mouse (hover, transformações).
3.  **Organização:** A ficha é dividida logicamente em:
    * *Esquerda:* Combate e Atributos.
    * *Direita:* Roleplay, Inventário e Imagem.
    * *Inferior:* Montaria.

---

## 🔧 Como rodar o projeto localmente

Pré-requisitos: Node.js instalado.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/nome-do-repo.git](https://github.com/SEU-USUARIO/nome-do-repo.git)
   cd nome-do-repo