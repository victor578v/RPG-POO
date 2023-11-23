import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import './geral.css';
import { Personagem } from '../classes/personagem';
import Ficha from './ficha';

interface FichaProps {
    personagem: Personagem;
}

const FichaMenu: React.FC<FichaProps> = ({ personagem }) => {
    const [open, setOpen] = useState(false);

    function checkPersonagem(personagem: Personagem) {
        if (personagem.nome == "Sem Nome") {
            alert("Crie um Personagem primeiro!")
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            <div className='botao' onClick={() => checkPersonagem(personagem)}><p>Abrir Personagem</p></div>
            <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                <Ficha personagem={personagem}/>
            </Modal>
        </>
    )
}

export default FichaMenu;