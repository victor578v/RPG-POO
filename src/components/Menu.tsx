import './Menu.css';
import * as Equipamentos from '../classes/equipamentos';


interface MenuProps {
  atualizarPersonagem: (novaArma?: Equipamentos.Arma, novaArmadura?: Equipamentos.Armadura) => void;
}

function menu({ atualizarPersonagem }: MenuProps) {

  const escolherArma = (novaArma: Equipamentos.Arma) => {
    atualizarPersonagem(novaArma, undefined);
  };

  const escolherArmadura = (novaArmadura: Equipamentos.Armadura) => {
    atualizarPersonagem(undefined, novaArmadura);
  };


    return (
    <div className='menu'>
        <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
        <div className='botao'><p>Entrar na Dungeon</p></div>
        <div className='botao'><p>Criar Personagem</p></div>
        <div className='botao'><p>Abrir Personagem</p></div>
        <div className='botao'><p>Tutorial</p></div>
        <div className='botao' onClick={() => escolherArmadura(Equipamentos.placas)}><p>Placas</p></div>
        <div className='botao' onClick={() => escolherArma(Equipamentos.espadaGrande)}><p>Espada Grande</p></div>
        <div className='botao' onClick={() => escolherArma(Equipamentos.espada)}><p>Espada</p></div>
        <div className='botao' onClick={() => escolherArma(Equipamentos.vazioArma)}><p>Desequipar Arma</p></div>
        <div className='botao' onClick={() => escolherArmadura(Equipamentos.vazioArmadura)}><p>Desequipar Armadura</p></div>
    </div>
    )
  }

  export default menu;