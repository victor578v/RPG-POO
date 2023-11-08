import './Menu.css';
import { Arma, espadaGrande, machadoGrande, malho } from '../classes/equipamentos';

interface MenuProps {
  atualizarPersonagem: (novaArma: Arma) => void;
}

function menu({ atualizarPersonagem }: MenuProps) {

  const escolherArma = (novaArma: Arma) => {
    atualizarPersonagem(novaArma);
  };


    return (
    <div className='menu'>
        <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
        <div className='botao'><p>Entrar na Dungeon</p></div>
        <div className='botao'><p>Criar Personagem</p></div>
        <div className='botao'><p>Abrir Personagem</p></div>
        <div className='botao'><p>Tutorial</p></div>
        <div className='botao' onClick={() => escolherArma(espadaGrande)}><p>Escolher arma: Espada Grande</p></div>
        <div className='botao' onClick={() => escolherArma(malho)}><p>Escolher arma: Malho</p></div>
        <div className='botao' onClick={() => escolherArma(machadoGrande)}><p>Escolher arma: Machado Grande</p></div>
    </div>
    )
  }

  export default menu;