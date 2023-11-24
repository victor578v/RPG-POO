import { useState } from "react";
import * as Equipamentos from "./equipamentos";
import { acuidade, danoExtra, duasMaos } from "./propriedades";
import { _1d20, RolarDado, TipoDano } from "./util";
import { Combate } from "./combate";

interface LogCallback {
    (message: string): void;
}

export class Atributos {
    // Valores base dos Atributos
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;

    // Bônus dos Atributos
    forcaBonus: number;
    destrezaBonus: number;
    constituicaoBonus: number;
    inteligenciaBonus: number;
    sabedoriaBonus: number;
    carismaBonus: number;

    // Proficiências em Testes de Resistência
    testeForca: boolean;
    testeDestreza: boolean;
    testeConstituicao: boolean;
    testeInteligencia: boolean;
    testeSabedoria: boolean;
    testeCarisma: boolean;

    // Proficiencias em Perícias
    atletismo: boolean;
    sobrevivencia: boolean;
    maoHabil: boolean;
    furtividade: boolean;
    acrobacias: boolean;
    arcanismo: boolean;
    natureza: boolean;
    medicina: boolean;
    percepcao: boolean;
    historia: boolean;
    intuicao: boolean;
    persuasao: boolean;
    enganacao: boolean;
    intimidacao: boolean;

    // Bônus de Proficiência
    bonusProficiencia: number;

    constructor(
        forca: number,
        destreza: number,
        constituicao: number,
        inteligencia: number,
        sabedoria: number,
        carisma: number,
    ) {
        // Inicializa os atributos
        this.forca = forca;
        this.destreza = destreza;
        this.constituicao = constituicao;
        this.inteligencia = inteligencia;
        this.sabedoria = sabedoria;
        this.carisma = carisma;

        // Inicializa o bonus dos atributos
        this.forcaBonus = Number(Math.floor((this.forca - 10) / 2));
        this.destrezaBonus = Number(Math.floor((this.destreza - 10) / 2));
        this.constituicaoBonus = Number(Math.floor((this.constituicao - 10) / 2));
        this.inteligenciaBonus = Number(Math.floor((this.inteligencia - 10) / 2));
        this.sabedoriaBonus = Number(Math.floor((this.sabedoria - 10) / 2));
        this.carismaBonus = Number(Math.floor((this.carisma - 10) / 2));

        // Inicializa as proficiências em testes de resistência
        this.testeForca = false;
        this.testeDestreza = false;
        this.testeConstituicao = false;
        this.testeInteligencia = false;
        this.testeSabedoria = false;
        this.testeCarisma = false;
        // Inicializa as proficiencias em pericias
        this.atletismo = false;
        this.sobrevivencia = false;
        this.maoHabil = false;
        this.furtividade = false;
        this.acrobacias = false;
        this.arcanismo = false;
        this.natureza = false;
        this.medicina = false;
        this.percepcao = false;
        this.historia = false;
        this.intuicao = false;
        this.persuasao = false;
        this.enganacao = false;
        this.intimidacao = false;

        // Inicializa o bônus de proficiência
        this.bonusProficiencia = 2; // TODO: Bonus de proficiencia baseado em nivel do personagem
    }
}

export class Personagem {
    nome: string;
    pontosVida: number;
    pontosVidaMaximos: number;
    atributos: Atributos;
    arma: Equipamentos.Arma;
    armadura: Equipamentos.Armadura;
    equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
    percepcaoPassiva: number;
    numeroAcoes?: number;
    numeroAcoesBonus?: number;
    nivel?: number;
    classePersonagem?: string;
    racaPersonagem?: string;
    classeArmadura?: number;
    imagem?: string;
    tamanho?: "Pequeno" | "Medio" | "Grande";

    // Construtor que aceita um objeto com propriedades nomeadas
    constructor(options: {
        nome: string;
        pontosVida: number;
        pontosVidaMaximos: number;
        atributos: Atributos;
        arma: Equipamentos.Arma;
        armadura: Equipamentos.Armadura;
        equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
        numeroAcoes?: number;
        numeroAcoesBonus?: number;
        nivel?: number;
        classePersonagem?: string;
        racaPersonagem?: string;
        classeArmadura?: number;
        imagem?: string;
        tamanho?: "Pequeno" | "Medio" | "Grande";
    });
    // Construtor que aceita parâmetros individuais
    constructor(
        nome: string,
        pontosVida: number,
        pontosVidaMaximos: number,
        atributos: Atributos,
        arma: Equipamentos.Arma,
        armadura: Equipamentos.Armadura,
        equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario,
        numeroAcoes?: number,
        numeroAcoesBonus?: number,
        nivel?: number,
        classePersonagem?: string,
        racaPersonagem?: string,
        classeArmadura?: number,
        imagem?: string,
        tamanho?: "Pequeno" | "Medio" | "Grande",
    );
    // Assinatura combinada do construtor usando sobrecarga de método (arg = argumento)
    constructor(
        // Primeiro parâmetro: Pode ser uma string (para 'nome') ou um objeto com propriedades nomeadas
        arg1: string | {
            nome: string;
            pontosVida: number;
            pontosVidaMaximos: number;
            atributos: Atributos;
            arma: Equipamentos.Arma;
            armadura: Equipamentos.Armadura;
            equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
            numeroAcoes?: number;
            numeroAcoesBonus?: number;
            nivel?: number;
            classePersonagem?: string;
            racaPersonagem?: string;
            classeArmadura?: number;
            imagem?: string;
            tamanho?: "Pequeno" | "Medio" | "Grande";
        },
        // Parâmetros individuais opcionais para o restante das propriedades 
        arg2?: number,
        arg3?: number,
        arg4?: Atributos,
        arg5?: Equipamentos.Arma,
        arg6?: Equipamentos.Armadura,
        arg7?: Equipamentos.Arma | Equipamentos.EquipSecundario,
        arg8?: number,
        arg9?: number,
        arg10?: number,
        arg11?: string,
        arg12?: string,
        arg13?: number,
        arg14?: string,
        arg15?: "Pequeno" | "Medio" | "Grande",
    ) {
        if (typeof arg1 === 'string') {
            // Usa parametros individuais
            this.nome = arg1;
            this.pontosVida = arg2!;
            this.pontosVidaMaximos = arg3!;
            this.atributos = arg4!;
            this.arma = arg5!;
            this.armadura = arg6!;
            this.equipSecundario = arg7!;
            this.numeroAcoes = arg8 !== undefined ? arg8 : 1;
            this.numeroAcoesBonus = arg9 !== undefined ? arg9 : 1;
            this.nivel = arg10 !== undefined ? arg10 : 1;
            this.classePersonagem = arg11;
            this.racaPersonagem = arg12;
            this.classeArmadura = arg13;
            this.imagem = arg14;
            this.tamanho = arg15;
        } else {
            // Usa os parametros de um objeto
            this.nome = arg1.nome;
            this.pontosVida = arg1.pontosVida;
            this.pontosVidaMaximos = arg1.pontosVidaMaximos;
            this.atributos = arg1.atributos;
            this.arma = arg1.arma;
            this.armadura = arg1.armadura;
            this.equipSecundario = arg1.equipSecundario;
            this.numeroAcoes = arg1.numeroAcoes;
            this.numeroAcoesBonus = arg1.numeroAcoesBonus;
            this.nivel = arg1.nivel;
            this.classePersonagem = arg1.classePersonagem;
            this.racaPersonagem = arg1.racaPersonagem;
            this.classeArmadura = arg1.classeArmadura;
            this.imagem = arg1.imagem;
            this.tamanho = arg1.tamanho;
        }

        // Calcula a Percepcao Passiva (PP)
        this.percepcaoPassiva = 10 + (this.atributos.sabedoriaBonus || 0);
        if (this.atributos.percepcao) {
            this.percepcaoPassiva += this.atributos.bonusProficiencia;
        }
    }
    // Calcula os bonus de habilidade
    calcularBonus() {
        this.atributos.forcaBonus = Number(Math.floor((this.atributos.forca - 10) / 2));
        this.atributos.destrezaBonus = Number(Math.floor((this.atributos.destreza - 10) / 2));
        this.atributos.constituicaoBonus = Number(Math.floor((this.atributos.constituicao - 10) / 2));
        this.atributos.inteligenciaBonus = Number(Math.floor((this.atributos.inteligencia - 10) / 2));
        this.atributos.sabedoriaBonus = Number(Math.floor((this.atributos.sabedoria - 10) / 2));
        this.atributos.carismaBonus = Number(Math.floor((this.atributos.carisma - 10) / 2));
    }
    // Calcula a Classe de Armadura (CA)
    calcularClasseArmadura() {
        if (this.armadura) {
            this.classeArmadura = 10 + this.armadura.bonusCA;
            if (this.armadura.tipo === "leve" || this.armadura.tipo === "nenhuma") {
                this.classeArmadura += this.atributos.destrezaBonus;
            } else if (this.armadura.tipo === "media") {
                this.classeArmadura += Math.min(2, this.atributos.destrezaBonus);
            }
        } else {
            this.classeArmadura = 10 + this.atributos.destrezaBonus;
        }
        if (this.equipSecundario) {
            this.classeArmadura += this.equipSecundario.bonusCA;
        }
    }
    // Atualiza o personagem, usado mais adiante
    atualizarPersonagem(
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
        novaImagem?: string,
    ) {

        if (novaForca) {
            this.atributos.forca = novaForca
        }

        if (novaDestreza) {
            this.atributos.destreza = novaDestreza;
        }

        if (novaConstituicao) {
            this.atributos.constituicao = novaConstituicao;
        }

        if (novaInteligencia) {
            this.atributos.inteligencia = novaInteligencia;
        }

        if (novaSabedoria) {
            this.atributos.sabedoria = novaSabedoria;
        }

        if (novaCarisma) {
            this.atributos.carisma = novaCarisma;
        }

        if (novoNome) {
            this.nome = novoNome;
        }

        if (novaImagem) {
            this.imagem = novaImagem;
        }

        if (novaArma) {
            if (novaArma.propriedades.includes(duasMaos)) {
                this.arma = novaArma
                this.equipSecundario = novaArma;
            } else if (this.equipSecundario === this.arma) {
                this.arma = novaArma
                this.equipSecundario = Equipamentos.vazioArma;
            } else {
                this.arma = novaArma
            }
        }

        if (novaArmadura) {
            this.armadura = novaArmadura
        }

        if (novoEquip) {
            if (this.arma.propriedades.includes(duasMaos)) {
                this.arma = Equipamentos.vazioArma;
                this.equipSecundario = novoEquip;
            } else {
                this.equipSecundario = novoEquip;
            }
        }
        this.calcularClasseArmadura();
    }
    // Logica para ataques.
    ataque(alvo: Personagem, logCallback?: LogCallback) {
        _1d20.rolarVezes();

        if (logCallback) {
            if (acuidade.acuidadeCheck(this)) { // Ataque com Destreza
                logCallback(`1d20 + ${this.atributos.destrezaBonus + this.atributos.bonusProficiencia} = ${+_1d20.resultados + this.atributos.destrezaBonus + this.atributos.bonusProficiencia} (${_1d20.resultados} + ${this.atributos.destrezaBonus + this.atributos.bonusProficiencia})`);
                if (+_1d20.resultados == 20) {
                    logCallback("Acerto Crítico!");
                    return true;
                } else if (+_1d20.resultados + this.atributos.destrezaBonus + this.atributos.bonusProficiencia >= (alvo.classeArmadura ?? 0)) {
                    logCallback("Acerto!");
                    return true;
                } else {
                    logCallback("Erro!");
                    return false;
                }
            } else { // Ataque com Força
                logCallback(`1d20 + ${this.atributos.forcaBonus + this.atributos.bonusProficiencia} = ${+_1d20.resultados + this.atributos.forcaBonus + this.atributos.bonusProficiencia} (${_1d20.resultados} + ${this.atributos.forcaBonus + this.atributos.bonusProficiencia})`);
                if (+_1d20.resultados == 20) {
                    logCallback("Acerto Crítico!");
                    return true;
                } else if (+_1d20.resultados + this.atributos.forcaBonus + this.atributos.bonusProficiencia >= (alvo.classeArmadura ?? 0)) {
                    logCallback("Acerto!");
                    return true;
                } else {
                    logCallback("Erro!");
                    return false;
                }
            }
        }
    }
    // Logica para dano.
    dano(logCallback?: LogCallback) {
        let dano;
        let extra;
        if (logCallback) {
            if (this.arma.nome == "Vazia") { // Dano desarmado
                dano = 1 + this.atributos.forcaBonus;
                logCallback(`1 + ${this.atributos.forcaBonus} = ${1 + this.atributos.forcaBonus} (1 + ${this.atributos.forcaBonus}) ${this.arma.tipoDano}`);
            } else {
                let multiplicadorDados = 1;
                if (+_1d20.resultados == 20) {
                    multiplicadorDados = 2;
                }

                if (this.arma.propriedades.includes(acuidade) &&
                    this.arma.propriedades.includes(danoExtra) &&
                    this.arma.dadoTipoExtra &&
                    this.arma.dadosDanoExtra &&
                    this.arma.dadoTipoExtra) { // Dano com Destreza + Dano extra da arma
                    dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                    extra = new RolarDado(this.arma.dadoTipoExtra, (this.arma.dadosDanoExtra * multiplicadorDados));
                    dano.rolarVezes();
                    extra.rolarVezes();
                    logCallback(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.destrezaBonus} = ${+dano.total + this.atributos.destrezaBonus} (${dano.resultados} + ${this.atributos.destrezaBonus}) ${this.arma.tipoDano} E ${this.arma.dadosDanoExtra * multiplicadorDados}d${this.arma.dadoTipoExtra} = ${extra.total} (${extra.resultados}) ${this.arma.tipoDanoExtra}`);
                    dano = (dano.total + this.atributos.destrezaBonus);
                    extra = (extra.total);
                } else if (this.arma.propriedades.includes(danoExtra) &&
                    this.arma.dadoTipoExtra &&
                    this.arma.dadosDanoExtra &&
                    this.arma.dadoTipoExtra) { // Dano com Forca + Dano extra da arma
                    dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                    extra = new RolarDado(this.arma.dadoTipoExtra, (this.arma.dadosDanoExtra * multiplicadorDados));
                    dano.rolarVezes();
                    extra.rolarVezes();
                    logCallback(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.forcaBonus} = ${+dano.total + this.atributos.forcaBonus} (${dano.resultados} + ${this.atributos.forcaBonus}) ${this.arma.tipoDano} E ${this.arma.dadosDanoExtra * multiplicadorDados}d${this.arma.dadoTipoExtra} = ${extra.total} (${extra.resultados}) ${this.arma.tipoDanoExtra}`);
                    dano = (dano.total + this.atributos.forcaBonus);
                    extra = (extra.total);
                } else if (acuidade.acuidadeCheck(this)) { // Dano com Destreza
                    dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                    dano.rolarVezes();
                    logCallback(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.destrezaBonus} = ${+dano.total + this.atributos.destrezaBonus} (${dano.resultados} + ${this.atributos.destrezaBonus}) ${this.arma.tipoDano}`);
                    dano = (dano.total + this.atributos.destrezaBonus);
                } else { // Dano com Forca
                    dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                    dano.rolarVezes();
                    logCallback(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.forcaBonus} = ${+dano.total + this.atributos.forcaBonus} (${dano.resultados} + ${this.atributos.forcaBonus}) ${this.arma.tipoDano}`);
                    dano = (dano.total + this.atributos.forcaBonus);
                }
            }
        }
        return { dano, extra };
    }
    // Descanso longo
    descanso(combate: Combate, logCallback?: LogCallback) {
        if (logCallback) {
            if (combate.rodada > 0) {
                logCallback(`Voce nao pode descansar agora! ${combate.rodada}`)
            } else {
                this.pontosVida = this.pontosVidaMaximos
                logCallback("Pontos de vida recuperados!")
            }
        }
    }
}

export function usePersonagem() {
    const atributos = new Atributos(8, 8, 8, 8, 8, 8);
    const [personagem, setPersonagem] = useState(
        new Personagem("Sem Nome", 1000, 1000, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioArma, 1, 1, 1, undefined, undefined, undefined, '/placeholder.png', "Medio")
    );

    personagem.calcularBonus()
    personagem.calcularClasseArmadura()

    const atualizarPersonagem = (
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
        novaImagem?: string,
    ) => {
        setPersonagem((basePersonagem) => {
            const mudarPersonagem = new Personagem({ ...basePersonagem });
            mudarPersonagem.atualizarPersonagem(novoNome, novaForca, novaDestreza, novaConstituicao, novaInteligencia, novaSabedoria, novaCarisma, novaArma, novaArmadura, novoEquip, novaImagem);
            return mudarPersonagem;
        });
    };

    return { personagem, atualizarPersonagem };
}

export class Especial {
    nome: string;
    descricao: string;
    chance: number;
    dadosDano?: number;
    dadosTipo?: number;
    danoTipo?: TipoDano;
    tipoEfeito?: string;
    tipoTR?: string;
    diffTR?: number;

    constructor(
        nome: string,
        descricao: string,
        chance: number,
        dadosDano?: number,
        dadosTipo?: number,
        danoTipo?: TipoDano,
        tipoEfeito?: string,
        tipoTR?: string,
        diffTR?: number
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.chance = chance;
        this.dadosDano = dadosDano;
        this.dadosTipo = dadosTipo;
        this.danoTipo = danoTipo;
        this.tipoEfeito = tipoEfeito;
        this.tipoTR = tipoTR;
        this.diffTR = diffTR;
    }
}

export class Monstro extends Personagem {
    ataqueEspecial?: Especial;
    

    constructor(
        nome: string,
        pontosVidaMaximos: number,
        pontosVida: number,
        atributos: Atributos,
        arma: Equipamentos.Arma,
        armadura: Equipamentos.Armadura,
        equipSecundario: Equipamentos.EquipSecundario,
        imagem: string,
        tamanho: "Pequeno" | "Medio" | "Grande",
        ataqueEspecial?: Especial
        
    ) {
        super(nome, pontosVidaMaximos, pontosVida, atributos, arma, armadura, equipSecundario, undefined, undefined, undefined, undefined, undefined, undefined, imagem, tamanho) ;
        this.ataqueEspecial = ataqueEspecial;
    }
}