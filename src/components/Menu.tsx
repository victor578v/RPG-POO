import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import './geral.css';
import { Personagem } from '../classes/personagem';
import * as Equipamentos from '../classes/equipamentos';
import MenuDebug from './menuDebug';
import Tutorial from './Tutorial';
import CriarPersonagem from './criacaoPersonagem';
import FichaMenu from './fichaMenu';
import Dungeon from './dungeon';

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
    novaArma?: Equipamentos.Arma,
    novaArmadura?: Equipamentos.Armadura,
    novoEquip?: Equipamentos.EquipSecundario
  ) => void;
}

const Menu: React.FC<MenuProps> = ({ personagem, atualizarPersonagem }) => {
  const [mostrarDungeon, setMostrarDungeon] = useState(false);

  return (
    <>
      {mostrarDungeon ? (
        <Dungeon personagem={personagem} voltarParaMenu={() => setMostrarDungeon(false)} />
      ) : (
        <>
          <div className='menu'>
            <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
            <div className='botao' onClick={() => setMostrarDungeon(true)}><p>Entrar na Dungeon</p></div>
            <CriarPersonagem personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
            <FichaMenu personagem={personagem} />
            <Tutorial />
            <MenuDebug personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
          </div>
        </>
      )}
    </>
  );
}

export default Menu;