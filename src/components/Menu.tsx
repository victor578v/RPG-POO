import './Menu.css';
import * as Equipamentos from '../classes/equipamentos';
import { useState } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


interface MenuProps {
  atualizarPersonagem: (novaArma?: Equipamentos.Arma, novaArmadura?: Equipamentos.Armadura, novoEquip?: Equipamentos.EquipSecundario) => void;
}

function menu({ atualizarPersonagem }: MenuProps) {

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const escolherArma = (novaArma: Equipamentos.Arma) => {
    atualizarPersonagem(novaArma, undefined, undefined);
  };

  const escolherArmadura = (novaArmadura: Equipamentos.Armadura) => {
    atualizarPersonagem(undefined, novaArmadura, undefined);
  };

  const escolherEquip = (novoEquip: Equipamentos.EquipSecundario) => {
    atualizarPersonagem(undefined, undefined, novoEquip);
  };

  return (
    <div className='menu'>
      <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
      <div className='botao'><p>Entrar na Dungeon</p></div>
      <div className='botao'><p>Criar Personagem</p></div>
      <div className='botao'><p>Abrir Personagem</p></div>
      <div className='botao'><p>Tutorial</p></div>
      <div className='botao' onClick={onOpenModal}><p>Debug</p></div>
      <Modal open={open} onClose={onCloseModal} center closeIcon={<span className='closeButton'>&times;</span>}>
        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.placas)}><p>Placas</p></div>
        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espadaGrande)}><p>Espada Grande</p></div>
        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espada)}><p>Espada</p></div>
        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.escudo)}><p>Escudo</p></div>
        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.tocha)}><p>Tocha</p></div>
        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.vazioArma)}><p>Largar Arma</p></div>
        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.vazioArmadura)}><p>Desequipar Armadura</p></div>
        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.vazioEquip)}><p>Largar Equip Secundario</p></div>
      </Modal>
    </div>
  )
}

export default menu;