import React, { useState } from 'react';
import { Personagem } from '../classes/personagem';
import Modal from 'react-responsive-modal';
import * as Equipamentos from '../classes/equipamentos';
import { Magia, SpellBuff, escudo } from '../classes/magias';


interface spelProps {
    personagem: Personagem;
    onSelectMagia: (magia: Magia) => void;
}

const SpelList: React.FC<spelProps> = ({ personagem, onSelectMagia }) => {
    const [spel, setSpel] = useState(false);

    function selecionarMagia(magia: Magia) {
        if (personagem.magiasConhecidas[0] instanceof Magia) {
            console.log(personagem.magiasConhecidas)
        }
        onSelectMagia(magia);
        setSpel(false)
      }

    return (
        <>
            <p className='botaoInv' onClick={() => setSpel(true)}>Lista de Magias</p>
            <Modal open={spel} onClose={() => setSpel(false)} center classNames={{ overlay: 'customOverlay', modal: 'lootInvModal' }} >
                <div>
                    <p>Lista de Magias:</p>
                    <p>
                        {personagem.magiasConhecidas.map((magia) => (
                            <li key={magia.nome}>{magia.nome} <p className='botaoDebug' onClick={() => selecionarMagia(magia)}>Selecionar</p></li>
                        ))}
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default SpelList;