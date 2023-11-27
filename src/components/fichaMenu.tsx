import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import './geral.css';
import { Personagem } from '../classes/personagem';
import Ficha from './ficha';
import { Arma, Armadura, EquipSecundario } from '../classes/equipamentos';


interface FichaProps {
    personagem: Personagem;
    atualizarPersonagem: (
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Arma,
        novaArmadura?: Armadura,
        novoEquip?: EquipSecundario,
        novaRaca?: string,
        novaClasse?: string,
      ) => void;
}

const FichaMenu: React.FC<FichaProps> = ({ personagem, atualizarPersonagem }) => {
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
                <Ficha personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
            </Modal>
        </>
    )
}

export default FichaMenu;