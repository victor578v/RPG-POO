import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import * as Equipamentos from '../classes/equipamentos';
import './Menu.css';
import { _1d20 } from '../classes/util';
import { usePersonagem } from '../classes/personagem';



interface MenuProps {
  atualizarPersonagem: (novaArma?: Equipamentos.Arma, novaArmadura?: Equipamentos.Armadura, novoEquip?: Equipamentos.EquipSecundario) => void;
}



function menu({ atualizarPersonagem }: MenuProps) {
  const { personagem } = usePersonagem();
  const [open, setOpen] = useState(false);

  const escolherArma = (novaArma: Equipamentos.Arma) => {
    atualizarPersonagem(novaArma, undefined, undefined);
  };

  const escolherArmadura = (novaArmadura: Equipamentos.Armadura) => {
    atualizarPersonagem(undefined, novaArmadura, undefined);
  };

  const escolherEquip = (novoEquip: Equipamentos.EquipSecundario) => {
    atualizarPersonagem(undefined, undefined, novoEquip);
  };

  function ataque() {
    _1d20.rolarVezes();
    console.log(`${+_1d20.resultados + personagem.atributos.forcaBonus + personagem.atributos.bonusProficiencia} (${_1d20.resultados} + ${personagem.atributos.forcaBonus + personagem.atributos.bonusProficiencia})`);
  }

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
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espada)}><p>{Equipamentos.espada.nome}</p></div>
            <div className='textDebug'><p>Equipamento Secundario</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.escudo)}><p>{Equipamentos.escudo.nome}</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.tocha)}><p>{Equipamentos.tocha.nome}</p></div>
          </div>
          <div>
            <div className='textDebug'><p>Debug de Acoes</p></div>
            <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.vazioArma)}><p>Largar Arma</p></div>
            <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.vazioArmadura)}><p>Desequipar Armadura</p></div>
            <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.vazioArma)}><p>Largar Equip Secundario</p></div>
            <div className='botaoDebug' onClick={() => ataque()}><p>Atacar</p></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default menu;