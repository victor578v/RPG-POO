import React, { useState, useEffect, useRef } from 'react';
import './geral.css';
import './dungeon.css';
import { Personagem } from '../classes/personagem';
import FichaMenu from './fichaMenu';
import { combate } from '../classes/combate';
import { criarNovoDragaoVermelhoAdulto, criarNovoGoblin, reiniciarContadorCriatura } from '../classes/criaturas';

interface DungeonProps {
    personagem: Personagem;
    voltarParaMenu: () => void;
}

const Dungeon: React.FC<DungeonProps> = ({ personagem, voltarParaMenu }) => {
    const dungeonRef = useRef<HTMLDivElement | null>(null);
    const [textBuffer, setTextBuffer] = useState<string[]>([]);
    const [alvoSelecionado, setAlvoSelecionado] = useState<Personagem | null>(null);

    const selecionarAlvo = (alvo: Personagem) => {
        setAlvoSelecionado(alvo);
        console.log(`${alvo.nome} Selecionado!`)
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

    useEffect(() => {
        console.log(combate.rodada)
    }, [combate.rodada]);


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
            reiniciarContadorCriatura();
            personagem.numeroAcoes = 1;
            addToBuffer("Combate Terminado!")
        }
    }

    const adicionarCriaturaAleatoria = () => {
        const criaturasDisponiveis = [
            "Goblin",
            "Dragao Vermelho Adulto",
        ];


        const criaturaAleatoria = criaturasDisponiveis[Math.floor(Math.random() * criaturasDisponiveis.length)];
        let criaturaEscolhida

        if (criaturaAleatoria == "Goblin") {
            criaturaEscolhida = criarNovoGoblin()
        } else if (criaturaAleatoria == "Dragao Vermelho Adulto") {
            criaturaEscolhida = criarNovoDragaoVermelhoAdulto()
        } else {
            criaturaEscolhida = criarNovoGoblin()
        }

        combate.adicionarParticipante(criaturaEscolhida)

        addToBuffer(`Você encontrou um ${criaturaEscolhida.nome}!`);
    };

    return (
        <>
            <div className='MenuDungeon'>
                <p>TESTESTESTE {personagem.nome}</p>
                <div className='botaoMenuDungeon' onClick={voltarParaMenu}><p>Voltar para o Menu</p></div>
                <FichaMenu personagem={personagem} />
            </div>
            <div className='dungeonRoom'>
                {/* adicionar formas de aleatorizar salas depois */}
                <div>
                    {combate.participantes.map((participante, index) => (<div key={index} className='monstros' onClick={() => selecionarAlvo(participante)}><p>Selecionar {participante.nome}</p></div>))}
                </div>
            </div>
            <div ref={dungeonRef} className='DungeonTexto'>
                {textBuffer.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
                <div className='botoesDungeon'>
                    <div>
                        <p onClick={adicionarCriaturaAleatoria}>ADD criatura aleatoria</p>
                    </div>
                    <div onClick={() => combate.ataque(personagem, alvoSelecionado, (message) => { addToBuffer(message); })}>
                        <p>Atacar</p>
                    </div>
                    <div onClick={() => { combate.iniciarCombate(personagem, (message) => { addToBuffer(message); }) }}>
                        <p>Entrar em combate</p>
                    </div>
                    <div onClick={() => { combate.iniciarRodada(personagem, (message) => { addToBuffer(message); }) }}>
                        <p>Passar Turno</p>
                    </div>
                    <div onClick={() => { personagem.descanso(combate, (message) => { addToBuffer(message); }) }}>
                        <p>Descansar e recuperar pontos de vida</p>
                    </div>
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