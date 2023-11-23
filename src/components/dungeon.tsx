import React from 'react';
import './geral.css';
import { Personagem } from '../classes/personagem';

interface DungeonProps {
  personagem: Personagem;
  voltarParaMenu: () => void;
}

const Dungeon: React.FC<DungeonProps> = ({ personagem, voltarParaMenu }) => {


    return (
        <>
            <p>TESTESTESTE {personagem.nome}</p>
            <div className='botao' onClick={voltarParaMenu}><p>Voltar para o Menu</p></div>
        </>
    )
}

export default Dungeon;