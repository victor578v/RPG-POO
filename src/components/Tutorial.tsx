import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import './Menu.css';

const Tutorial: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='botao' onClick={() => setOpen(true)}>
                <p>Tutorial</p>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                <div>
                    <p className='separador'>Criacao de Personagem</p>
                    <p>A criacao de personagem é o pilar do RPG. Primeiro, crie um nome para seu personagem. </p>
                    <p>TERMINAR O TUTORIAL POR ULTIMO </p>
                </div>
            </Modal>
        </>
    );
}

export default Tutorial;