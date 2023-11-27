import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import './geral.css';
import { Personagem } from '../classes/personagem';
import Tutorial from './Tutorial';
import CriarPersonagem from './criacaoPersonagem';
import FichaMenu from './fichaMenu';
import Dungeon from './dungeon';
import { Arma, Armadura, EquipSecundario } from '../classes/equipamentos';

interface MenuProps {
  personagem: Personagem;
  atualizarPersonagem: (
    novoNome?: string,
    novaForca?: number,
    novaDestreza?: number,
    novaConstituicao?: number,
    novaInteligencia?: number,
    novaSabedoria?: number,
    novaCarisma?: number,
    novaArma?: Arma,
    novaArmadura?: Armadura,
    novoEquip?: EquipSecundario,
    novaRaca?: string,
    novaClasse?: string,
  ) => void;
}

const Menu: React.FC<MenuProps> = ({ personagem, atualizarPersonagem }) => {
  const [mostrarDungeon, setMostrarDungeon] = useState(false);

  function checkPersonagem(personagem: Personagem) {
    if (personagem.nome == "Sem Nome") {
        alert("Crie um Personagem primeiro!")
    } else {
        setMostrarDungeon(true)
    }
}

  return (
    <>
      {mostrarDungeon ? (
        <Dungeon personagem={personagem} atualizarPersonagem={atualizarPersonagem} voltarParaMenu={() => setMostrarDungeon(false)} />
      ) : (
        <>
          <div className='menu'>
            <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
            <div className='botao' onClick={() => checkPersonagem(personagem)}><p>Entrar na Dungeon</p></div>
            <CriarPersonagem personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
            <FichaMenu personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
            <Tutorial />
          </div>
        </>
      )}
    </>
  );
}

export default Menu;