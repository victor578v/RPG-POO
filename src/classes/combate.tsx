import { Item } from './equipamentos';
import { Monstro, Personagem } from './personagem';
import { RolarDado } from './util';

interface LogCallback {
    (message: string): void;
}

export class Combate {
    rodada: number;
    participantes: Personagem[];
    lootPool: Item[];

    constructor() {
        this.rodada = 0;
        this.participantes = [];
        this.lootPool = [];
    }

    adicionarParticipante(participante: Personagem) {
        this.participantes.push(participante);
        return participante;
    }

    iniciarRodada(personagem: Personagem, logCallback?: LogCallback) {
        if (logCallback) {
            if (this.rodada > 0) {
                this.rodada++;
                logCallback(`Iniciando rodada ${this.rodada}`);
                this.ataqueInimigos(personagem, logCallback);
                if (personagem.pontosVida > 0) {
                    logCallback("-".repeat(10))
                    logCallback('Turno do Jogador');
                    logCallback("-".repeat(10))
                    personagem.numeroAcoes = 1;
                }
            } else {
                logCallback("Nenhum combate encontrado!")
            }
        }
    }

    iniciarCombate(personagem: Personagem, logCallback?: LogCallback) {
        if (logCallback) {
            if (personagem.pontosVida <= 0) {
                logCallback(`${personagem.nome} está muito machucado para lutar!`)
            } else if (this.participantes.length > 0 && this.rodada == 0) {
                logCallback('Combate iniciado!');
                logCallback("-".repeat(10))
                logCallback('Turno do Jogador');
                logCallback("-".repeat(10))
                this.rodada = 1;
                logCallback(`Iniciando rodada ${this.rodada}`);
            } else if (this.rodada >= 1) {
                logCallback("Voce ja está em um combate!")
            } else {
                logCallback("Nao há com quem lutar!")
            }
        }
    }
    finalizarCombate(personagem: Personagem, logCallback?: LogCallback) {
        if (logCallback) {
            if (this.participantes.length === 0) {
                logCallback('Combate finalizado, todos inimigos eliminados!');
                this.participantes = [];
                this.rodada = 0;
                personagem.numeroAcoes = 1;
            } else if (personagem.pontosVida <= 0) {
                logCallback('Game Over, seus pontos de vida zeraram. :(');
                this.participantes = [];
                this.rodada = 0;
                personagem.numeroAcoes = 1;
            }
        }
    }
    ataque(atacante: Personagem, alvo: Personagem | null, logCallback?: LogCallback) {
        if (logCallback) {
            if (this.rodada === 0) {
                logCallback("Inicie um combate primeiro!");
            } else if (alvo === null) {
                logCallback("Selecione um Alvo Primeiro!");
            } else if (alvo.pontosVida <= 0) {
                // nada acontece feijoada
            } else if ((atacante.numeroAcoes || 0) <= 0) {
                logCallback("Sem ações restantes para atacar!");
            } else {
                logCallback(`${atacante.nome} ataca ${alvo.nome} com ${atacante.arma.nome}`);
                atacante.numeroAcoes = (atacante.numeroAcoes || 0) - 1;

                // Lógica de ataque do combate
                if (atacante.ataque(alvo, logCallback)) {
                    const { dano, extra } = atacante.dano(logCallback);
                    if (dano) {
                        alvo.pontosVida -= dano + (extra || 0);
                        logCallback(`${alvo.nome} sofre ${dano + (extra || 0)} pontos de dano. ${alvo.pontosVida}/${alvo.pontosVidaMaximos} pontos de vida restantes.`);
                    }
                }

                // Verifica se o alvo foi derrotado
                if (alvo.pontosVida <= 0) {
                    logCallback(`${alvo.nome} foi derrotado!`);
                    alvo.inventario.forEach(item => {
                        this.lootPool.push(item);
                    });
                    const index = this.participantes.indexOf(alvo);
                    if (index !== -1) {
                        this.participantes.splice(index, 1);
                    }
                }
                this.finalizarCombate(atacante, logCallback);
            }
        }
    }
    ataqueInimigo(atacante: Personagem, alvo: Personagem, logCallback?: LogCallback) {
        if (logCallback) {
            if (alvo.pontosVida <= 0) {
                // Nada acontece feijoada
            } else {
                if (atacante instanceof Monstro && atacante.ataqueEspecial && (Math.random() * 100) < atacante.ataqueEspecial.chance) {
                    logCallback(atacante.ataqueEspecial.descricao)
                    if (atacante.ataqueEspecial.dadosTipo && atacante.ataqueEspecial.dadosDano) {
                        let dano = new RolarDado(atacante.ataqueEspecial.dadosTipo, atacante.ataqueEspecial.dadosDano)
                        dano.rolarVezes()
                        logCallback(`${atacante.ataqueEspecial.dadosDano}d${atacante.ataqueEspecial.dadosTipo} = ${dano.total} (${dano.resultados})`)
                        logCallback(`${alvo.nome} sofre ${dano.total} pontos de dano ${atacante.ataqueEspecial.danoTipo}`)
                        alvo.pontosVida -= +dano.total
                    }
                    atacante.numeroAcoes = 0;
                } else {
                    logCallback(`${atacante.nome} ataca ${alvo.nome} com ${atacante.arma.nome}`);
                    // Lógica de ataque do combate
                    if (atacante.ataque(alvo, logCallback)) {
                        const { dano, extra } = atacante.dano(logCallback);
                        if (dano) {
                            alvo.pontosVida -= dano + (extra || 0);
                            logCallback(`${alvo.nome} sofre ${dano + (extra || 0)} pontos de dano. ${alvo.pontosVida}/${alvo.pontosVidaMaximos} pontos de vida restantes.`);
                        }
                        atacante.numeroAcoes = 0;
                    }

                    // Verifica se o alvo foi derrotado
                    if (alvo.pontosVida <= 0) {
                        logCallback(`${alvo.nome} foi derrotado!`);
                    }
                    this.finalizarCombate(alvo, logCallback)
                }
            }
        }
    }
    ataqueInimigos(personagem: Personagem, logCallback?: LogCallback) {
        if (logCallback) {
            logCallback("-".repeat(10))
            logCallback('Turno dos inimigos!');
            logCallback("-".repeat(10))
            this.participantes.forEach((inimigo) => {
                this.ataqueInimigo(inimigo, personagem, logCallback);
            });

            this.participantes.forEach((inimigo) => {
                inimigo.numeroAcoes = 1; // recupera a acao dos inimigos apos atacarem
            });
        }
    }
}
export const combate = new Combate();