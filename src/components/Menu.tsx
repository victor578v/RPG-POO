import './Menu.css';
import { Arma, Armadura, espadaGrande, halfPlacas, machadoGrande, malho, placas, studded } from '../classes/equipamentos';

interface MenuProps {
  atualizarPersonagem: (novaArma?: Arma, novaArmadura?: Armadura) => void;
}

function menu({ atualizarPersonagem }: MenuProps) {

  const escolherArma = (novaArma: Arma) => {
    atualizarPersonagem(novaArma, undefined);
  };

  const escolherArmadura = (novaArmadura: Armadura) => {
    atualizarPersonagem(undefined, novaArmadura);
  };


    return (
    <div className='menu'>
        <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
        <div className='botao'><p>Entrar na Dungeon</p></div>
        <div className='botao'><p>Criar Personagem</p></div>
        <div className='botao'><p>Abrir Personagem</p></div>
        <div className='botao'><p>Tutorial</p></div>
        <div className='botao' onClick={() => escolherArmadura(placas)}><p>Placas</p></div>
        <div className='botao' onClick={() => escolherArmadura(studded)}><p>Couro Batido</p></div>
        <div className='botao' onClick={() => escolherArmadura(halfPlacas)}><p>Meia Armadura</p></div>
        <div className='botao' onClick={() => escolherArma(espadaGrande)}><p>Espada</p></div>
        <div className='botao' onClick={() => escolherArma(machadoGrande)}><p>Machado</p></div>
        <div className='botao' onClick={() => escolherArma(malho)}><p>Malho</p></div>
    </div>
    )
  }

  export default menu;