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

    iniciarRodada() {
        if (this.participantes) {
            this.rodada++;
            console.log(`Iniciando rodada ${this.rodada}`);
        } else {
            console.log("Nenhum combate rodando!")
        }
    }

    iniciarCombate() {
        if (this.participantes.length > 0) {
            console.log('Combate iniciado!');
            this.iniciarRodada();
        } else {
            console.log("Nao há com quem lutar!")
        }
    }
    finalizarCombate() {
        if (this.participantes.length === 0) {
            console.log('Todos os inimigos foram derrotados. O combate foi vencido!');
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

                // Verifica se todos os inimigos foram derrotados
                this.finalizarCombate();
            }
        }
    }
}
export const combate = new Combate();