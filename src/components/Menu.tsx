import './Menu.css';
function menu() {
    return (
    <div className='menu'>
        <div><img src="./logo.png" alt="logo" height={450} width={300} /></div>
        <div className='botao'><p>Entrar na Dungeon</p></div>
        <div className='botao'><p>Criar Personagem</p></div>
        <div className='botao'><p>Abrir Personagem</p></div>
        <div className='botao'><p>Tutorial</p></div>
    </div>
    )
  }

export default menu