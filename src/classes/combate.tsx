import { reiniciarContadorCriatura } from './criaturas';
import { Personagem } from './personagem';

export class Combate {
    rodada: number;
    participantes: Personagem[];

    constructor() {
        this.rodada = 0;
        this.participantes = [];
    }

    adicionarParticipante(participante: Personagem) {
        this.participantes.push(participante);
    }

    iniciarRodada(personagem: Personagem) {
        if (this.rodada > 0) {
            this.rodada++;
            console.log(`Iniciando rodada ${this.rodada}`);
            this.ataqueInimigos(personagem);
            if (personagem.pontosVida > 0) {
                console.log("-".repeat(10))
                console.log('Turno do Jogador');
                console.log("-".repeat(10))
                personagem.numeroAcoes = 1;
            }

        } else {
            console.log("Nenhum combate encontrado!")
        }
    }

    iniciarCombate(personagem: Personagem) {
        if (personagem.pontosVida <= 0) {
            console.log(`${personagem.nome} está muito machucado para lutar!`)
        } else if (this.participantes.length > 0 && this.rodada == 0) {
            console.log('Combate iniciado!');
            this.rodada = 1;
            console.log(`Iniciando rodada ${this.rodada}`);
        } else if (this.rodada >= 1) {
            console.log("Voce ja está em um combate!")
        } else {
            console.log("Nao há com quem lutar!")
        }
    }
    finalizarCombate(personagem: Personagem) {
        if (this.participantes.length === 0) {
            console.log('Combate finalizado, todos inimigos eliminados!');
            this.participantes = [];
            this.rodada = 0;
            reiniciarContadorCriatura();
            personagem.numeroAcoes = 1;
        } else if (personagem.pontosVida <= 0) {
            console.log('Game Over, seus pontos de vida zeraram. :(');
            this.participantes = [];
            this.rodada = 0;
            reiniciarContadorCriatura();
            personagem.numeroAcoes = 1;
        }
    }
    ataque(atacante: Personagem, alvo: Personagem | null) {
        if (this.rodada === 0) {
            console.log("Inicie um combate primeiro!");
        } else if (alvo === null) {
            console.log("Selecione um Alvo Primeiro!");
        } else if (alvo.pontosVida <= 0) {
            // nada acontece feijoada
        } else if ((atacante.numeroAcoes || 0) <= 0) {
            alert("Sem acoes restantes para atacar!")
        } else {
            console.log(`${atacante.nome} ataca ${alvo.nome} com ${atacante.arma.nome}`);
            atacante.numeroAcoes = (atacante.numeroAcoes || 0) - 1;

            // Lógica de ataque do combate
            if (atacante.ataque(alvo)) {
                const { dano, extra } = atacante.dano();
                alvo.pontosVida -= dano + (extra || 0);
                console.log(`${alvo.nome} sofre ${dano + (extra || 0)} pontos de dano. ${alvo.pontosVida}/${alvo.pontosVidaMaximos} pontos de vida restantes.`);
            }

            // Verifica se o alvo foi derrotado
            if (alvo.pontosVida <= 0) {
                console.log(`${alvo.nome} foi derrotado!`);
                const index = this.participantes.indexOf(alvo);
                if (index !== -1) {
                    this.participantes.splice(index, 1);
                }
            }
            this.finalizarCombate(atacante)
        }
    }
    ataqueInimigo(atacante: Personagem, alvo: Personagem) {
        if (alvo.pontosVida <= 0) {
            // Nada acontece feijoada
        } else {
            console.log(`${atacante.nome} ataca ${alvo.nome} com ${atacante.arma.nome}`);
            // Lógica de ataque do combate
            if (atacante.ataque(alvo)) {
                const { dano, extra } = atacante.dano();
                alvo.pontosVida -= dano + (extra || 0);
                console.log(`${alvo.nome} sofre ${dano + (extra || 0)} pontos de dano. ${alvo.pontosVida}/${alvo.pontosVidaMaximos} pontos de vida restantes.`);
                atacante.numeroAcoes = 0;
            }

            // Verifica se o alvo foi derrotado
            if (alvo.pontosVida <= 0) {
                console.log(`${alvo.nome} foi derrotado!`);
            }
            this.finalizarCombate(alvo)
        }
    }
    ataqueInimigos(personagem: Personagem) {
        console.log("-".repeat(10))
        console.log('Turno dos inimigos!');
        console.log("-".repeat(10))
        this.participantes.forEach((inimigo) => {
            this.ataqueInimigo(inimigo, personagem);
        });

        this.participantes.forEach((inimigo) => {
            inimigo.numeroAcoes = 1; // recupera a acao dos inimigos apos atacarem
        });
    }
}
export const combate = new Combate();