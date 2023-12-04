import { Personagem } from "./personagem";
import { TipoDano } from "./util";

export abstract class Magia {
    nome: string;
    custoMana: number;
    descricao: string;
    duracaoRodadas: number;
    tipoEfeito: string;
    tempoCast: string;

    constructor(
        nome: string,
        custoMana: number,
        descricao: string,
        duracaoRodadas: number,
        tipoEfeito: string,
        tempoCast: string,
    ) {
        this.nome = nome;
        this.custoMana = custoMana;
        this.descricao = descricao;
        this.duracaoRodadas = duracaoRodadas;
        this.tipoEfeito = tipoEfeito;
        this.tempoCast = tempoCast;
    }

    abstract conjurar(personagem: Personagem): void;
    static reconstruir(obj: any): Magia {
        switch (obj.tipoEfeito) {
            case 'CA':
                return new SpellBuff(obj.nome, obj.custoMana, obj.descricao, obj.duracaoRodadas, obj.tipoEfeito, obj.bonusCA, obj.tempoCast);
            // Adicione casos para outros tipos, se necessário
            default:
                throw new Error(`Tipo de magia desconhecido: ${obj.tipoEfeito}`);
        }
    }
}

export class SpellDano extends Magia {
    conjurar(): void {
        // Implementação específica para a magia de dano
    }
}

export class SpellBuff extends Magia {
    bonusCA: number;

    constructor(
        nome: string,
        custoMana: number,
        descricao: string,
        duracaoRodadas: number,
        tipoEfeito: string,
        bonusCA: number,
        tempoCast: string,
    ) {
        super(nome, custoMana, descricao, duracaoRodadas, tipoEfeito, tempoCast);
        this.bonusCA = bonusCA;
    }

    conjurar(personagem: Personagem): void {
        personagem.calcularEfeitos(this);
    }
}

export const escudo = new SpellBuff("Escudo Magico", 1, "Aumenta a CA em +2", 2, "CA", 2, "Acao");