import React, { useState, useEffect, useRef } from 'react';
import './dungeon.css';
import { Personagem } from '../classes/personagem';
import { combate } from '../classes/combate';
import { criarNovoBau, criarNovoDragaoVermelhoAdulto, criarNovoEsqueleto, criarNovoGoblin } from '../classes/criaturas';
import * as Equipamentos from '../classes/equipamentos';
import Modal from 'react-responsive-modal';
import Ficha from './ficha';
import Espolios from './espolios';
import SpelList from './menuMagias';
import { Magia } from '../classes/magias';

interface DungeonProps {
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
    voltarParaMenu: () => void;
}

const Dungeon: React.FC<DungeonProps> = ({ personagem, voltarParaMenu, atualizarPersonagem }) => {
    const dungeonRef = useRef<HTMLDivElement | null>(null);
    const [textBuffer, setTextBuffer] = useState<string[]>([]);
    const [open, setOpen] = useState(false)
    const [att, setAtt] = useState(0);
    const [alvoSelecionado, setAlvoSelecionado] = useState<Personagem | null>(null);
    const [magiaSelecionada, setMagiaSelecionada] = useState<Magia | undefined>(undefined);

    const selecionarAlvo = (alvo: Personagem) => {
        setAlvoSelecionado(alvo);
        addToBuffer(`${alvo.nome} Selecionado!`)
    };


    useEffect(() => {
        // Function to scroll to the bottom of the dungeonRef
        const scrollToBottom = () => {
            if (dungeonRef.current) {
                dungeonRef.current.scrollTop = dungeonRef.current.scrollHeight;
            }
        };

        // Scroll to the bottom when the component is mounted or when textBuffer changes
        scrollToBottom();

        // Add event listener to scroll to the bottom when new content is added
        const handleScroll = () => {
            if (dungeonRef.current) {
                const { scrollHeight, clientHeight, scrollTop } = dungeonRef.current;
                const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 0;

                if (isNearBottom) {
                    scrollToBottom();
                }
            }
        };

        if (dungeonRef.current) {
            dungeonRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (dungeonRef.current) {
                dungeonRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [textBuffer]);

    const addToBuffer = (text: string) => {
        setTextBuffer((prevBuffer) => [...prevBuffer, text]);
    };

    const clearBuffer = () => {
        setTextBuffer([]);
    };

    const clearCombate = (personagem: Personagem) => {
        if (combate.participantes.length == 0) {
            addToBuffer("Nao há combate para terminar!")
        } else {
            combate.participantes = [];
            combate.rodada = 0;
            personagem.numeroAcoes = 1;
            addToBuffer("Combate Terminado!")
        }
    }

    const handleSelecionarMagia = (magiaSelecionada: Magia) => {
        console.log(`Magia selecionada: ${magiaSelecionada.nome}`);
        setMagiaSelecionada(magiaSelecionada);
    };

    function salvarPersonagem(personagem: Personagem) {
        localStorage.setItem("personagem", JSON.stringify(personagem));
    }

    const adicionarCriaturaAleatoria = () => {
        combate.lootPool = []

        if (combate.participantes.length === 0 && personagem.pontosVida > 0) {
            const criaturasDisponiveis = [
                "Goblin",
                "Esqueleto",
                "Dragao Vermelho Adulto",
                "Bau"
            ];
            const numeroCriaturas = Math.ceil(Math.random() * 5);
            const nivelMaximoCriatura = (personagem.nivel || 0) * 0.5;
            let nivelTotalCriaturas = 0;
            let podeAdicionarGrande = true;
            let podeAdicionarPequeno = true;
            const criaturas = []

            console.log(numeroCriaturas)


            while ((combate.participantes.length == 0 || combate.participantes[0].tamanho != "Grande") && combate.participantes.length < numeroCriaturas) {
                const criaturaAleatoria = criaturasDisponiveis[Math.floor(Math.random() * criaturasDisponiveis.length)];
                let criaturaEscolhida;

                console.log(criaturaAleatoria)

                if (criaturaAleatoria === "Goblin") {
                    criaturaEscolhida = criarNovoGoblin();
                } else if (criaturaAleatoria === "Esqueleto") {
                    criaturaEscolhida = criarNovoEsqueleto();
                } else if (criaturaAleatoria === "Dragao Vermelho Adulto") {
                    criaturaEscolhida = criarNovoDragaoVermelhoAdulto();
                } else if (criaturaAleatoria === "Bau") {
                    criaturaEscolhida = criarNovoBau();
                }

                // Verifica o tamanho da criatura
                if (criaturaEscolhida?.tamanho === "Pequeno" && (nivelTotalCriaturas + (criaturaEscolhida.nivel || 0)) <= nivelMaximoCriatura && podeAdicionarPequeno) {
                    combate.adicionarParticipante(criaturaEscolhida);
                    criaturas.push(criaturaAleatoria)
                    nivelTotalCriaturas = nivelTotalCriaturas + (criaturaEscolhida.nivel || 0)
                    podeAdicionarGrande = false;
                } else if (criaturaEscolhida?.tamanho === "Grande" && (nivelTotalCriaturas + (criaturaEscolhida.nivel || 0)) <= nivelMaximoCriatura && podeAdicionarGrande) {
                    combate.adicionarParticipante(criaturaEscolhida);
                    criaturas.push(criaturaAleatoria)
                    podeAdicionarGrande = false;
                    podeAdicionarPequeno = false;
                } else {
                    if (criaturaEscolhida?.tamanho === "Grande") {
                        continue;
                    } else {
                        break;
                    }
                }
            }
            addToBuffer(`Você encontrou ${criaturas}!`);
            combate.iniciarCombate(personagem, (message) => { addToBuffer(message); })
            personagem.calcularNivel();
        } else if (personagem.pontosVida <= 0) {
            addToBuffer(`${personagem.nome} está muito machucado para lutar!`)
        } else {
            addToBuffer("Voce já possui inimigos!")
        }
        setAtt(att + 1)
    };

    return (
        <>
            <div className='MenuDungeon'>
                <p>{personagem.nome}</p>
                <div><img src={`${personagem.imagem}`} width={150} height={150} alt="Personagem" /></div>
                <p>Pontos de vida: {personagem.pontosVida}/{personagem.pontosVidaMaximos}</p>
                <p>Mana: {personagem.mana}/{personagem.manaMaximo}</p>
                <p>Exp: {personagem.exp}</p>
                <p>Classe de armadura: {personagem.classeArmadura}</p>
                <p>Arma Equipada: {personagem.arma.nome}</p>
                <div className='botaoMenuDungeon' onClick={() => { voltarParaMenu(); salvarPersonagem(personagem); }}><p>Voltar para o Menu e Salvar o Personagem</p></div>
                <div className='botaoMenuDungeon' onClick={() => setOpen(true)}><p>Abrir Personagem</p></div>
                <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                    <Ficha personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
                </Modal>
            </div>
            <div className='dungeonRoom'>
                <div>
                    {combate.participantes.map((participante, index) => (
                        <div key={index} className={`monstros ${participante.tamanho}`} onClick={() => selecionarAlvo(participante)}>
                            <img src={`${participante.imagem}`} alt={`${participante.nome}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div ref={dungeonRef} className='DungeonTexto'>
                {textBuffer.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
                <div className='botoesDungeon'>
                    {combate.rodada > 0 && (
                        <>
                            <div onClick={() => combate.ataque(personagem, alvoSelecionado, (message) => { addToBuffer(message); })}>
                                <p>Atacar</p>
                            </div>
                            <div onClick={() => combate.conjurarMagia(personagem, magiaSelecionada, (message) => { addToBuffer(message); })}>
                                <p>Conjurar Magia</p>
                            </div>
                            <div onClick={() => { combate.iniciarRodada(personagem, (message) => { addToBuffer(message); }) }}>
                                <p>Passar Turno</p>
                            </div>
                            <div>
                                <SpelList personagem={personagem} onSelectMagia={handleSelecionarMagia} />
                            </div>
                        </>
                    )}

                    {combate.rodada === 0 && (
                        <>
                            <div onClick={adicionarCriaturaAleatoria}>
                                <p>Avançar nas masmorras</p>
                            </div>
                            <div onClick={() => { personagem.descanso(combate, (message) => { addToBuffer(message); }) }}>
                                <p>Descansar e recuperar pontos de vida</p>
                            </div>

                            {combate.lootPool.length > 0 && (
                                <Espolios personagem={personagem} />
                            )}
                        </>
                    )}
                </div>
                <div>
                    <button onClick={clearBuffer}>Limpar Buffer</button>
                    <button onClick={() => clearCombate(personagem)}>Limpar Combate</button>
                </div>
            </div>
        </>
    );
}

export default Dungeon;