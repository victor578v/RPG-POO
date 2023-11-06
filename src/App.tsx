import './App.css'
import { Atributos, Personagem } from './classes/Personagem.tsx';
import menu from './components/Menu.tsx'

function App() {

  const atributos = new Atributos(12, 16, 14, 10, 13, 15); // Substitua esses valores pelos atributos desejados
  atributos.percepcao = true
  const personagem = new Personagem("Nome do Personagem", 30, 30, atributos);

  console.log("Personagem Criado:");
  console.log("Nome:", personagem.nome);
  console.log("Pontos de Vida:", personagem.pontosVida);
  console.log("Pontos de Vida Máximos:", personagem.pontosVidaMaximos);
  console.log(
    `Forca: ${personagem.atributos.forca} (${personagem.atributos.forcaBonus >= 0 ? '+' : ''}${personagem.atributos.forcaBonus}),
    Destreza: ${personagem.atributos.destreza} (${personagem.atributos.destrezaBonus >= 0 ? '+' : ''}${personagem.atributos.destrezaBonus}),
    Constituicao: ${personagem.atributos.constituicao} (${personagem.atributos.constituicaoBonus >= 0 ? '+' : ''}${personagem.atributos.constituicaoBonus}),
    Inteligencia: ${personagem.atributos.inteligencia} (${personagem.atributos.inteligenciaBonus >= 0 ? '+' : ''}${personagem.atributos.inteligenciaBonus}),
    Sabedoria: ${personagem.atributos.sabedoria} (${personagem.atributos.sabedoriaBonus >= 0 ? '+' : ''}${personagem.atributos.sabedoriaBonus}),
    Carisma: ${personagem.atributos.carisma} (${personagem.atributos.carismaBonus >= 0 ? '+' : ''}${personagem.atributos.carismaBonus})`
  );
  console.log("Percepção Passiva:", personagem.percepcaoPassiva);
  console.log("Classe de Armadura:", personagem.classeArmadura);

  return (
    <div>
      {menu()}
    </div>
  )
}

export default App
