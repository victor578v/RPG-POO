import './App.css'
import { usePersonagem } from './classes/personagem';
import Menu from './components/Menu.tsx';

function App() {
  const { personagem, atualizarPersonagem } = usePersonagem();
  
  return (
    <>
      <Menu personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
    </>
  )
}

export default App
