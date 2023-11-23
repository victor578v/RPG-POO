import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import * as Equipamentos from '../classes/equipamentos';
import './geral.css';
import { Personagem } from '../classes/personagem';
import { combate } from '../classes/combate';
import { criarNovoDragaoVermelhoAdulto, criarNovoGoblin } from '../classes/criaturas';
import { danoExtra } from '../classes/propriedades';


interface MenuDebugProps {
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
        novoEquip?: Equipamentos.EquipSecundario
    ) => void;
}

const MenuDebug: React.FC<MenuDebugProps> = ({ personagem, atualizarPersonagem }) => {
    const [open, setOpen] = useState(false);
    const [att, setAtt] = useState(0);

    const escolherArma = (novaArma: Equipamentos.Arma) => {
        atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, novaArma, undefined, undefined);
        if (novaArma.nome == 'Vazia' && personagem.arma.nome == 'Vazia') {
            console.log(`Nao há o que desequipar!`)
        } else if (novaArma.nome == 'Vazia') {
            console.log(`${personagem.arma.nome} foi Desequipado!`)
        } else if (novaArma.nome == personagem.arma.nome) {
            console.log(`${novaArma.nome} já está equipado!`)
        } else if (novaArma.propriedades.includes(danoExtra)) {
            console.log(`${novaArma.nome} foi Equipado! (Dano: ${novaArma.dadosDano}d${novaArma.dadoTipo} ${novaArma.tipoDano} + ${novaArma.dadosDanoExtra}d${novaArma.dadoTipoExtra} ${novaArma.tipoDanoExtra})`)
        } else {
            console.log(`${novaArma.nome} foi Equipado! (Dano: ${novaArma.dadosDano}d${novaArma.dadoTipo} ${novaArma.tipoDano})`)
        }
    };

    const escolherArmadura = (novaArmadura: Equipamentos.Armadura) => {
        atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, novaArmadura, undefined);
        if (novaArmadura.tipo == 'nenhuma' && personagem.armadura.tipo == 'nenhuma') {
            console.log(`Nao há o que desequipar!`)
        } else if (novaArmadura.nome == personagem.armadura.nome) {
            console.log(`${novaArmadura.nome} já está equipado!`)
        } else if (novaArmadura.tipo == 'leve') {
            console.log(`${novaArmadura.nome} foi Equipado! (CA ${novaArmadura.bonusCA + 10} + Destreza)`)
        } else if (novaArmadura.tipo == 'media') {
            console.log(`${novaArmadura.nome} foi Equipado! (CA ${novaArmadura.bonusCA + 10} + Destreza(MAX +2))`)
        } else if (novaArmadura.tipo == 'pesada') {
            console.log(`${novaArmadura.nome} foi Equipado! (CA ${novaArmadura.bonusCA + 10})`)
        } else if (novaArmadura.tipo == 'nenhuma') {
            console.log(`${personagem.armadura.nome} foi Desequipado!`)
        }
    };

    const escolherEquip = (novoEquip: Equipamentos.EquipSecundario) => {
        atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, novoEquip);
        if (novoEquip.nome == 'Vazia' && personagem.equipSecundario.nome == 'Vazia') {
            console.log(`Nao há o que desequipar!`)
        } else if (novoEquip.nome == personagem.equipSecundario.nome) {
            console.log(`${novoEquip.nome} já está equipado!`)
        } else if (novoEquip.nome == 'Vazia') {
            console.log(`${personagem.equipSecundario.nome} foi Desequipado!`)
        } else if (novoEquip.bonusCA > 0) {
            console.log(`${novoEquip.nome} foi Equipado! (+${novoEquip.bonusCA} CA)`)
        } else {
            console.log(`${novoEquip.nome} foi Equipado!`)
        }
    };

    const [alvoSelecionado, setAlvoSelecionado] = useState<Personagem | null>(null);

    const selecionarAlvo = (alvo: Personagem) => {
        setAlvoSelecionado(alvo);
        console.log(`${alvo.nome} Selecionado!`)
    };

    function getNumAcao(personagem: Personagem) {
        console.log(personagem.numeroAcoes);
    }

    return (
        <>
            <div className='botao' onClick={() => setOpen(true)}><p>Debug</p></div>
            <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                <div className='debug'>
                    <div>
                        <div className='textDebug'><p>Armaduras</p></div>
                        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.placas)}><p>{Equipamentos.placas.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.studded)}><p>{Equipamentos.studded.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.halfPlacas)}><p>{Equipamentos.halfPlacas.nome}</p></div>
                        <div className='textDebug'><p>Armas</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espadaGrande)}><p>{Equipamentos.espadaGrande.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.espada)}><p>{Equipamentos.espada.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.machadoGrande)}><p>{Equipamentos.machadoGrande.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.malho)}><p>{Equipamentos.malho.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.shoushaBlade)}><p>{Equipamentos.shoushaBlade.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.shoushaBladeCorrupted)}><p>{Equipamentos.shoushaBladeCorrupted.nome}</p></div>
                        <div className='textDebug'><p>Equipamento Secundario</p></div>
                        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.escudo)}><p>{Equipamentos.escudo.nome}</p></div>
                        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.tocha)}><p>{Equipamentos.tocha.nome}</p></div>
                    </div>
                    <div>
                        <div className='textDebug'><p>Debug de Acoes</p></div>
                        <div className='botaoDebug' onClick={() => escolherArma(Equipamentos.vazioArma)}><p>Largar Arma</p></div>
                        <div className='botaoDebug' onClick={() => escolherArmadura(Equipamentos.vazioArmadura)}><p>Desequipar Armadura</p></div>
                        <div className='botaoDebug' onClick={() => escolherEquip(Equipamentos.vazioArma)}><p>Largar Equip Secundario</p></div>
                        <div className='botaoDebug' onClick={() => { combate.iniciarCombate(personagem); setAtt(att + 1); }}><p>Entrar em combate</p></div>
                        <div className='botaoDebug' onClick={() => { personagem.descanso() }}><p>Descansar e recuperar pontos de vida</p></div>
                        <div className='botaoDebug' onClick={() => { combate.iniciarRodada(personagem); setAtt(att + 1); }}><p>Passar Turno</p></div>
                        <div className='botaoDebug' onClick={() => { combate.ataque(personagem, alvoSelecionado); setAtt(att + 1); }}><p>Atacar</p></div>
                        <div className='botaoDebug' onClick={() => { getNumAcao(personagem)}}><p>Receber numero de Acoes</p></div>
                    </div>
                    <div>
                        <div className='textDebug'><p>Debug de Criaturas</p></div>
                        <div className='botaoDebug' onClick={() => { combate.adicionarParticipante(criarNovoGoblin()); setAtt(att + 1); }}><p>Adicionar 1 Goblin</p></div>
                        <div className='botaoDebug' onClick={() => { combate.adicionarParticipante(criarNovoDragaoVermelhoAdulto()); setAtt(att + 1); }}><p>Adicionar Dragao Vermelho Adulto</p></div>
                        <div className='textDebug'><p>Selecione um alvo:</p></div>
                        {combate.participantes.map((participante, index) => (<div key={index} className='botaoDebug' onClick={() => selecionarAlvo(participante)}><p>Selecionar {participante.nome}</p></div>))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MenuDebug;