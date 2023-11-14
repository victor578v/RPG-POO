import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useEffect, useState } from 'react';
import * as Equipamentos from '../classes/equipamentos';
import './Menu.css';
import { Personagem } from '../classes/personagem';
import { combate } from '../classes/combate';
import { goblin1 } from '../classes/criaturas';



interface MenuProps {
  personagem: Personagem;
  atualizarPersonagem: (novaArma?: Equipamentos.Arma, novaArmadura?: Equipamentos.Armadura, novoEquip?: Equipamentos.EquipSecundario) => void;
}



function menu({ personagem, atualizarPersonagem }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [att, setAtt] = useState(0);

  const escolherArma = (novaArma: Equipamentos.Arma) => {
    atualizarPersonagem(novaArma, undefined, undefined);
  };

  const escolherArmadura = (novaArmadura: Equipamentos.Armadura) => {
    atualizarPersonagem(undefined, novaArmadura, undefined);
  };

  const escolherEquip = (novoEquip: Equipamentos.EquipSecundario) => {
    atualizarPersonagem(undefined, undefined, novoEquip);
  };

  const [alvoSelecionado, setAlvoSelecionado] = useState<Personagem | null>(null);

  const selecionarAlvo = (alvo: Personagem) => {
    setAlvoSelecionado(alvo);
  };

  return (
    <div className='menu'>
      <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
      <div className='botao'><p>Entrar na Dungeon</p></div>
      <div className='botao'><p>Criar Personagem</p></div>
      <div className='botao'><p>Abrir Personagem</p></div>
      <div className='botao'><p>Tutorial</p></div>
      <div className='botao' onClick={() => setOpen(true)}><p>Debug</p></div>
      <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
        <div className='debug'>
          <div>
            <div className='textDebug'><p>Armaduras</p></div>
            <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.placas)}><p>{Equipamentos.placas.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.studded)}><p>{Equipamentos.studded.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.halfPlacas)}><p>{Equipamentos.halfPlacas.nome}</p></div>
            <div className='textDebug'><p>Armas</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espadaGrande)}><p>{Equipamentos.espadaGrande.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espada)}><p>{Equipamentos.espada.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.machadoGrande)}><p>{Equipamentos.machadoGrande.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.malho)}><p>{Equipamentos.malho.nome}</p></div>
            <div className='textDebug'><p>Equipamento Secundario</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.escudo)}><p>{Equipamentos.escudo.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.tocha)}><p>{Equipamentos.tocha.nome}</p></div>
          </div>
          <div>
            <div className='textDebug'><p>Debug de Acoes</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.vazioArma)}><p>Largar Arma</p></div>
            <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.vazioArmadura)}><p>Desequipar Armadura</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.vazioArma)}><p>Largar Equip Secundario</p></div>
            <div className='botaoDebug' onClick={() => { alvoSelecionado && combate.ataque(personagem, alvoSelecionado); setAtt(att + 1);}}><p>Atacar</p></div>
            <div className='textDebug'><p>Selecione um alvo:</p></div>
            {combate.participantes.map((participante, index) => (<div key={index} className='botaoDebug' onClick={() => selecionarAlvo(participante)}><p>Selecionar {participante.nome}</p></div>))}
          </div>
          <div>
            <div className='textDebug'><p>Debug de Criaturas</p></div>
            <div className='botaoDebug' onClick={() => { combate.adicionarParticipante(goblin1); setAtt(att + 1);}}><p>Adicionar 1 Goblin</p></div>
            <div className='botaoDebug' onClick={() => { combate.iniciarCombate(); setAtt(att + 1);}}><p>Entrar em combate</p></div>
            <div className='botaoDebug' onClick={() => { combate.iniciarRodada(); setAtt(att + 1); }}><p>Passar Turno</p></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default menu;