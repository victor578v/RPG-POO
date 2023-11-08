import './App.css'
import * as Equipamentos from './classes/equipamentos';
import { Atributos, Personagem } from './classes/personagem';
import { useState } from 'react';
import { duasMaos } from './classes/propriedades';
import Menu from './components/Menu';

function App() {
  const atributos = new Atributos(12, 16, 14, 10, 13, 15);
  atributos.percepcao = true
  const [personagem, setPersonagem] = useState(new Personagem("Joaozinho Guerreiro", 30, 30, atributos))

  const atualizarPersonagem = (novaArma: Equipamentos.Arma) => {

    if (novaArma.propriedades.includes(duasMaos)) {
      setPersonagem((prevPersonagem) => ({
        ...prevPersonagem,
        arma: novaArma,
        equipSecundario: novaArma,
      }));
    } else {
      setPersonagem((prevPersonagem) => ({
        ...prevPersonagem,
        arma: novaArma,
      }));
    }
  };

  console.log("Nome:", personagem.nome);
  console.log("Mao Principal:", personagem.arma);
  console.log("Mao Secundaria:", personagem.equipSecundario)
  console.log("Classe de Armadura:", personagem.classeArmadura);


  return (
    <div>
      <Menu atualizarPersonagem={atualizarPersonagem} />
    </div>
  )
}

export default App
