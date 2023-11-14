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
            this.finalizarCombate(personagem);
        } else {
            console.log("Nenhum combate encontrado!")
        }
    }

    iniciarCombate() {
        if (this.participantes.length > 0) {
            console.log('Combate iniciado!');
            this.rodada = 1;
            console.log(`Iniciando rodada ${this.rodada}`);
        } else {
            console.log("Nao há com quem lutar!")
        }
    }
    finalizarCombate(personagem: Personagem = {} as Personagem) {
        if (this.participantes.length === 0) {
            console.log('Todos os inimigos foram derrotados. O combate foi vencido!');
            this.participantes = [];
            this.rodada = 0;
        } else if ((personagem.pontosVida || 0) <= 0) {
            console.log('Seus pontos de vida zeraram. Game Over!');
            this.participantes = [];
            this.rodada = 0;
        }
    }
    ataque(atacante: Personagem, alvo: Personagem) {
        if (this.rodada == 0) {
            console.log("Inicie o combate primeiro!")
        } else {
            console.log(`${atacante.nome} ataca ${alvo.nome} com ${atacante.arma.nome}`);

            // Lógica de ataque do combate
            if (atacante.ataque(alvo)) {
                const dano = atacante.dano();
                alvo.pontosVida -= dano;
                console.log(`${alvo.nome} sofre ${dano} pontos de dano. ${alvo.pontosVida}/${alvo.pontosVidaMaximos} pontos de vida restantes.`);
            }

            // Verifica se o alvo foi derrotado
            if (alvo.pontosVida <= 0) {
                console.log(`${alvo.nome} foi derrotado!`);
                // Remova o alvo do array de participantes, se desejar
                const index = this.participantes.indexOf(alvo);
                if (index !== -1) {
                    this.participantes.splice(index, 1);
                }
            }
        }
    }
    ataqueInimigos(personagem: Personagem) {
        console.log("-".repeat(10))
        console.log('Turno dos inimigos!');
        console.log("-".repeat(10))
        this.participantes.forEach((inimigo) => {
            this.ataque(inimigo, personagem);
        });
    }
}
export const combate = new Combate();