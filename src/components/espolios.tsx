import React, { useState } from 'react';
import { Personagem } from '../classes/personagem';
import Modal from 'react-responsive-modal';
import * as Equipamentos from '../classes/equipamentos';
import { combate } from '../classes/combate';


interface lootProps {
    personagem: Personagem;
}

const Espolios: React.FC<lootProps> = ({ personagem}) => {
    const [att, setAtt] = useState(0);
    const [loot, setLoot] = useState(false);

    function addItem(item: Equipamentos.Item) {
        // Adiciona o item ao inventário do personagem
        personagem.inventario.push(item);
    
        // Encontra o índice da primeira ocorrência do item na lootPool
        const indexOfItem = combate.lootPool.findIndex(lootItem => lootItem === item);
    
        // Remove o item da lootPool (apenas a primeira ocorrência)
        if (indexOfItem !== -1) {
            combate.lootPool.splice(indexOfItem, 1);
        }
    
        // Atualiza o estado para re-renderizar o componente
        setAtt(att + 1);
    }
    

    return (
        <>
            <p onClick={() => setLoot(true)}>Espólios</p>
            <Modal open={loot} onClose={() => setLoot(false)} center classNames={{ overlay: 'customOverlay', modal: 'lootInvModal' }} >
                <div>
                    <p>Inventário:</p>
                    <p>
                        {combate.lootPool.map((item, index) => (
                            <li key={index}>{item.nome} <p onClick={() => addItem(item)}>Pegar</p></li>
                        ))}
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default Espolios;