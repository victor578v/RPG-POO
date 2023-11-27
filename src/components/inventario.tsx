import React, { useState } from 'react';
import { Personagem } from '../classes/personagem';
import Modal from 'react-responsive-modal';
import * as Equipamentos from '../classes/equipamentos';
import { danoExtra } from '../classes/propriedades';


interface invProps {
    personagem: Personagem;
    atualizarPersonagem: (
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario,
        novaRaca?: string,
        novaClasse?: string,
    ) => void;
}

const Inventario: React.FC<invProps> = ({ personagem, atualizarPersonagem }) => {
    const [att, setAtt] = useState(0);
    const [inv, setInv] = useState(false);

    const equiparItem = (item: Equipamentos.Arma | Equipamentos.Armadura | Equipamentos.EquipSecundario | Equipamentos.Item) => {
        if (item instanceof Equipamentos.Arma) {
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, item, undefined, undefined);
            if (item.nome == 'Vazia' && personagem.arma.nome == 'Vazia') {
                alert(`Nao há o que desequipar!`);
            } else if (item.nome == 'Vazia') {
                alert(`${personagem.arma.nome} foi Desequipado!`);
            } else if (item.nome == personagem.arma.nome) {
                alert(`${item.nome} já está equipado!`);
            } else if (item.propriedades.includes(danoExtra)) {
                alert(`${item.nome} foi Equipado! (Dano: ${item.dadosDano}d${item.dadoTipo} ${item.tipoDano} + ${item.dadosDanoExtra}d${item.dadoTipoExtra} ${item.tipoDanoExtra})`);
            } else {
                alert(`${item.nome} foi Equipado! (Dano: ${item.dadosDano}d${item.dadoTipo} ${item.tipoDano})`);
            }
        }
    
        if (item instanceof Equipamentos.Armadura) {
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, item, undefined);
            if (item.tipo == 'nenhuma' && personagem.armadura.tipo == 'nenhuma') {
                alert(`Nao há o que desequipar!`);
            } else if (item.nome == personagem.armadura.nome) {
                alert(`${item.nome} já está equipado!`);
            } else if (item.tipo == 'leve') {
                alert(`${item.nome} foi Equipado! (CA ${item.bonusCA + 10} + Destreza)`);
            } else if (item.tipo == 'media') {
                alert(`${item.nome} foi Equipado! (CA ${item.bonusCA + 10} + Destreza(MAX +2))`);
            } else if (item.tipo == 'pesada') {
                alert(`${item.nome} foi Equipado! (CA ${item.bonusCA + 10})`);
            } else if (item.tipo == 'nenhuma') {
                alert(`${personagem.armadura.nome} foi Desequipado!`);
            }
        }
    
        if (item instanceof Equipamentos.EquipSecundario) {
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, item);
            if (item.nome == 'Vazia' && personagem.equipSecundario.nome == 'Vazia') {
                alert(`Nao há o que desequipar!`);
            } else if (item.nome == personagem.equipSecundario.nome) {
                alert(`${item.nome} já está equipado!`);
            } else if (item.nome == 'Vazia') {
                alert(`${personagem.equipSecundario.nome} foi Desequipado!`);
            } else if (item.bonusCA > 0) {
                alert(`${item.nome} foi Equipado! (+${item.bonusCA} CA)`);
            } else {
                alert(`${item.nome} foi Equipado!`);
            }
        }
    };
    
    const largarItem = (item: Equipamentos.Item) => {
        const indexItem = personagem.inventario.findIndex(invItem => invItem === item);
        if (indexItem !== -1) {
            personagem.inventario.splice(indexItem, 1);
        }
        setAtt(att + 1);
    }

    return (
        <>
            <p className='botaoInv' onClick={() => setInv(true)}>Abrir Inventario</p>
            <Modal open={inv} onClose={() => setInv(false)} center classNames={{ overlay: 'customOverlay', modal: 'lootInvModal' }} >
                <div>
                    <p>Inventário:</p>
                    <p>
                        {personagem.inventario.map((item, index) => (
                            <li key={index}>{item.nome} <p onClick={() => equiparItem(item)}>equipar</p><p onClick={() => largarItem(item)}>Largar</p></li>
                        ))}
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default Inventario;