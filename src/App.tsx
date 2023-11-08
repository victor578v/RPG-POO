import './App.css'
import * as Equipamentos from './classes/equipamentos';
import { Atributos, Personagem } from './classes/personagem';
import { useEffect, useState } from 'react';
import { duasMaos } from './classes/propriedades';
import Menu from './components/Menu';

function App() {
  const atributos = new Atributos(12, 16, 14, 10, 13, 15);
  atributos.percepcao = true
  const [personagem, setPersonagem] = useState(new Personagem("Joaozinho Guerreiro", 30, 30, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioEquip))

  useEffect(() => {
    personagem.calcularClasseArmadura();
    console.log("-".repeat(10));
    console.log("Nome:", personagem.nome);
    console.log("Mao Principal:", personagem.arma.nome);
    console.log("Mao Secundaria:", personagem.equipSecundario.nome)
    console.log("Armadura:", personagem.armadura.nome)
    console.log("Classe de Armadura:", personagem.classeArmadura);
  }, [personagem]);

  const atualizarPersonagem = (
    novaArma?: Equipamentos.Arma,
    novaArmadura?: Equipamentos.Armadura,
    novoEquip?: Equipamentos.EquipSecundario
  ) => {
    setPersonagem((basePersonagem) => {

      const mudarPersonagem: Personagem = {
        ...basePersonagem,
        calcularClasseArmadura: basePersonagem.calcularClasseArmadura,
      };

      if (novaArma) {
        mudarPersonagem.arma = novaArma;
        if (novaArma.propriedades.includes(duasMaos)) {
          mudarPersonagem.equipSecundario = novaArma;
        } else if (basePersonagem.equipSecundario == basePersonagem.arma) {
          mudarPersonagem.equipSecundario = Equipamentos.vazioEquip
        }
      }

      if (novaArmadura) {
        mudarPersonagem.armadura = novaArmadura;
      }

      if (novoEquip) {
        if (basePersonagem.arma.propriedades.includes(duasMaos)) {
          mudarPersonagem.arma = Equipamentos.vazioArma;
          mudarPersonagem.equipSecundario = novoEquip;
        } else {
          mudarPersonagem.equipSecundario = novoEquip;
        }
      }

        // Calcula a CA
        mudarPersonagem.calcularClasseArmadura();

      return mudarPersonagem;
    });
  };


  return (
    <div>
      <Menu atualizarPersonagem={atualizarPersonagem} />
    </div>
  )
}

export default App
