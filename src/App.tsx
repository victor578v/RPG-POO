import './App.css'
import { Atributos, Personagem, usePersonagem } from './classes/personagem';
import Menu from './components/Menu.tsx';

function App() {
    const { personagem, atualizarPersonagem } = usePersonagem();

  return (
    <div>
      <Menu atualizarPersonagem={atualizarPersonagem} />
    </div>
  )
}

export default App
