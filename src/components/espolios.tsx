import React, { useState } from 'react';
import { Personagem } from '../classes/personagem';
import Modal from 'react-responsive-modal';
import * as Equipamentos from '../classes/equipamentos';
import { combate } from '../classes/combate';


interface lootProps {
    personagem: Personagem;
}

const Espolios: React.FC<lootProps> = ({ personagem }) => {
    const [att, setAtt] = useState(0);
    const [loot, setLoot] = useState(false);

    function addItem(item: Equipamentos.Item) {
        personagem.inventario.push(item);
        const indexOfItem = combate.lootPool.findIndex(lootItem => lootItem === item);
        if (indexOfItem !== -1) {
            combate.lootPool.splice(indexOfItem, 1);
        }
        setAtt(att + 1);
    }


    return (
        <>
            <p onClick={() => setLoot(true)}>Espólios</p>
            <Modal open={loot} onClose={() => setLoot(false)} center classNames={{ overlay: 'customOverlay', modal: 'lootInvModal' }} >
                <div>
                    <p>Espólios:</p>
                    <div>
                        <p>
                            {combate.lootPool.map((item, index) => (
                                <li key={index}>{item.nome} <p className='botaoDebug' onClick={() => addItem(item)}>Pegar</p></li>
                            ))}
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Espolios;