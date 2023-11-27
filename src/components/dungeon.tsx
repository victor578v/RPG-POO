import React, { useState, useEffect, useRef } from 'react';
import './dungeon.css';
import { Personagem } from '../classes/personagem';
import { combate } from '../classes/combate';
import { criarNovoDragaoVermelhoAdulto, criarNovoEsqueleto, criarNovoGoblin } from '../classes/criaturas';
import * as Equipamentos from '../classes/equipamentos';
import Modal from 'react-responsive-modal';
import Ficha from './ficha';
import Espolios from './espolios';

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
    const [alvoSelecionado, setAlvoSelecionado] = useState<Personagem | null>(null);

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

    const adicionarCriaturaAleatoria = () => {
combate.lootPool = []

        // Verifica se já existem participantes no combate
        if (combate.participantes.length === 0) {
            const criaturasDisponiveis = [
                "Goblin",
                "Goblin",
                "Goblin",
                "Esqueleto",
                "Esqueleto",
                "Dragao Vermelho Adulto"
            ];
            // Determina aleatoriamente o número de criaturas a serem adicionadas (entre 1 e 5)
            const numeroCriaturas = Math.ceil(Math.random() * 5);

            let criaturasAdicionadas = 0;
            let podeAdicionarGrande = true;
            let podeAdicionarPequeno = true;
            const criaturas = []

            console.log(numeroCriaturas)


            while (criaturasAdicionadas < numeroCriaturas) {
                const criaturaAleatoria = criaturasDisponiveis[Math.floor(Math.random() * criaturasDisponiveis.length)];
                let criaturaEscolhida;

                console.log(criaturaAleatoria)

                if (criaturaAleatoria === "Goblin") {
                    criaturaEscolhida = criarNovoGoblin();
                } else if (criaturaAleatoria === "Esqueleto") {
                    criaturaEscolhida = criarNovoEsqueleto();
                } else if (criaturaAleatoria === "Dragao Vermelho Adulto") {
                    criaturaEscolhida = criarNovoDragaoVermelhoAdulto();
                }

                // Verifica o tamanho da criatura
                if (criaturaEscolhida && criaturaEscolhida.tamanho === "Pequeno" && podeAdicionarPequeno) {
                    combate.adicionarParticipante(criaturaEscolhida);
                    criaturas.push(criaturaEscolhida.nome)
                    criaturasAdicionadas++;
                    podeAdicionarGrande = false;
                } else if (criaturaEscolhida && criaturaEscolhida.tamanho === "Grande" && podeAdicionarGrande) {
                    combate.adicionarParticipante(criaturaEscolhida);
                    criaturas.push(criaturaEscolhida.nome)
                    criaturasAdicionadas++;
                    podeAdicionarGrande = false;
                    podeAdicionarPequeno = false;
                } else {// Caso contrário, nenhuma adicionada e o contador se encherá até o fim
                    criaturasAdicionadas++;
                }
            }
            addToBuffer(`Você encontrou ${criaturas}!`);
            combate.iniciarCombate(personagem, (message) => { addToBuffer(message); })
        } else {
            addToBuffer("Voce já possui inimigos!")
        }
    };

    return (
        <>
            <div className='MenuDungeon'>
                <p>{personagem.nome}</p>
                <div><img src={`${personagem.imagem}`} width={10} height={10} alt="Personagem" /></div>
                <div className='botaoMenuDungeon' onClick={voltarParaMenu}><p>Voltar para o Menu</p></div>
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
                            <div onClick={() => { combate.iniciarRodada(personagem, (message) => { addToBuffer(message); }) }}>
                                <p>Passar Turno</p>
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

                            {/* Renderiza o botão "Espólios" apenas se houver itens na lootPool */}
                            {combate.lootPool.length > 0 && (
                                <div>
                                    <Espolios personagem={personagem}/>
                                </div>
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