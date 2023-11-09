import './App.css'
import { usePersonagem } from './classes/personagem';
import Menu from './components/Menu.tsx';

function App() {
    const { atualizarPersonagem } = usePersonagem();

  return (
    <div>
      <Menu atualizarPersonagem={atualizarPersonagem} />
    </div>
  )
}

export default App
