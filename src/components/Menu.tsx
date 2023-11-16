/* eslint-disable react-hooks/rules-of-hooks */
import 'react-responsive-modal/styles.css';
import './Menu.css';
import { Personagem } from '../classes/personagem';
import * as Equipamentos from "../classes/equipamentos";
import { useEffect } from 'react';
import MenuDebug from './menuDebug';
import Ficha from './ficha';

interface MenuProps {
  personagem: Personagem;
  atualizarPersonagem: (
      novaArma?: Equipamentos.Arma,
      novaArmadura?: Equipamentos.Armadura,
      novoEquip?: Equipamentos.EquipSecundario
  ) => void;
}

const Menu: React.FC<MenuProps> = ( {personagem, atualizarPersonagem }) => {

  return (
    <div className='menu'>
      <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
      <div className='botao'><p>Entrar na Dungeon</p></div>
      <div className='botao'><p>Criar Personagem</p></div>
      <Ficha personagem={personagem} />
      <div className='botao'><p>Tutorial</p></div>
      <MenuDebug personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
    </div>
  )
}

export default Menu;