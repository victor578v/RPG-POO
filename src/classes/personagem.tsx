import { useEffect, useState } from "react";
import * as Equipamentos from "./equipamentos";
import { acuidade, danoExtra, duasMaos } from "./propriedades";
import { _1d20, RolarDado, TipoDano } from "./util";
import { Combate } from "./combate";
import { Atributos } from "./atributos";
import { Magia, SpellBuff } from "./magias";

interface LogCallback {
    (message: string): void;
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
    inventario: Equipamentos.Item[];
    exp?: number;
    mana?: number;
    manaMaximo?: number;
    magiasConhecidas: Magia[];
    efeitos: {
        bonusCA?: number;
        bonusAtaque?: number;
        bonusDano?: number;
        bonusDanoDadoTipo?: number;
        bonusDanoDadoLados?: number;
        bonusDanoTipo?: number;
    };
    efeitosAtivos: { [key: string]: { rodadasRestantes: number, tipoEfeito: string } } = {};

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
        inventario?: Equipamentos.Item[];
        exp?: number;
        mana?: number;
        manaMaximo?: number;
        magiasConhecidas?: Magia[];
        efeitos?: {};
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
        inventario?: Equipamentos.Item[],
        exp?: number,
        mana?: number,
        manaMaximo?: number,
        magiasConhecidas?: Magia[],
        efeitos?: {}
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
            inventario?: Equipamentos.Item[];
            exp?: number;
            mana?: number;
            manaMaximo?: number;
            magiasConhecidas?: Magia[];
            efeitos?: {};
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
        arg16?: Equipamentos.Item[],
        arg17?: number,
        arg18?: number,
        arg19?: number,
        arg20?: Magia[],
        arg21?: {},
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
            this.inventario = arg16 || [];
            this.exp = arg17 !== undefined ? arg17 : 0;
            this.mana = arg18 !== undefined ? arg18 : 0;
            this.manaMaximo = arg19 !== undefined ? arg19 : 0;
            this.magiasConhecidas = arg20 || [];
            this.efeitos = arg21 || {};
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
            this.inventario = arg1.inventario || [];
            this.exp = arg1.exp;
            this.mana = arg1.mana || 0;
            this.manaMaximo = arg1.manaMaximo || 0;
            this.magiasConhecidas = arg1.magiasConhecidas || [];
            this.efeitos = arg1.efeitos || {};
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
        this.classeArmadura += (this.efeitos.bonusCA || 0)
    }
    
    calcularEfeitos(magia: Magia) {
            if (magia instanceof SpellBuff) {
                this.efeitos.bonusCA = magia.bonusCA
            }
    }
    

    calcularNivel() {
        const xpNecessario = [0, 100, 300, 900, 2700, 6500, 23000, 34000, 48000, 64000];
        const bonusProf = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4];

        if (this.exp && this.nivel) {
            for (let nivel = this.nivel; nivel <= 10; nivel++) {
                if (this.exp >= xpNecessario[nivel]) {
                    this.nivel = nivel + 1;
                    this.atributos.bonusProficiencia = bonusProf[nivel - 1];

                    if (this.classePersonagem == "Guerreiro") {
                        this.pontosVidaMaximos += 7 + this.atributos.constituicaoBonus;
                    } else if (this.classePersonagem == "Ladino") {
                        this.pontosVidaMaximos += 5 + this.atributos.constituicaoBonus;
                    } else if (this.classePersonagem == "Mago") {
                        this.pontosVidaMaximos += 4 + this.atributos.constituicaoBonus;
                        this.manaMaximo = (this.manaMaximo || 0) * (this.nivel || 0)
                    }

                    break;
                }
            }
        }
    }

    // Atualiza o personagem
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
        novaRaca?: string,
        novaClasse?: string,
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

        if (novaRaca) {
            this.racaPersonagem = novaRaca;
            if (this.racaPersonagem == "Humano") {
                this.atributos.forca = +this.atributos.forca + 1
                this.atributos.destreza = +this.atributos.destreza + 1
                this.atributos.constituicao = +this.atributos.constituicao + 1
                this.atributos.inteligencia = +this.atributos.inteligencia + 1
                this.atributos.sabedoria = +this.atributos.sabedoria + 1
                this.atributos.carisma = +this.atributos.carisma + 1
            } else if (this.racaPersonagem == "Elfo") {
                this.atributos.inteligencia = +this.atributos.inteligencia + 2
                this.atributos.carisma = +this.atributos.carisma + 1
            } else if (this.racaPersonagem == "Anao") {
                this.atributos.constituicao = +this.atributos.constituicao + 2
                this.atributos.forca = +this.atributos.forca + 1
            } else if (this.racaPersonagem == "Orc") {
                this.atributos.forca = +this.atributos.forca + 2
                this.atributos.constituicao = +this.atributos.constituicao + 2
                this.atributos.inteligencia = +this.atributos.inteligencia - 2
            }
        }

        if (novaClasse) {
            this.classePersonagem = novaClasse;
            if (this.classePersonagem == "Guerreiro") {
                this.pontosVidaMaximos = 24 + this.atributos.constituicaoBonus
                this.pontosVida = this.pontosVidaMaximos
                this.manaMaximo = 0
                this.mana = 0
            } else if (this.classePersonagem == "Ladino") {
                this.pontosVidaMaximos = 16 + this.atributos.constituicaoBonus
                this.pontosVida = this.pontosVidaMaximos
                this.manaMaximo = 0
                this.mana = 0
            } else if (this.classePersonagem == "Mago") {
                this.pontosVidaMaximos = 12 + this.atributos.constituicaoBonus
                this.pontosVida = this.pontosVidaMaximos
                this.manaMaximo = this.atributos.inteligenciaBonus * (this.nivel || 0)
                this.mana = this.manaMaximo
            }
        }

        this.calcularClasseArmadura();
        this.calcularBonus();
        this.calcularNivel();
    }
    // Logica para ataques.
    ataque(alvo: Personagem, logCallback?: LogCallback) {
        _1d20.rolarVezes();

        let bonusAtaque = 0;

        if (this.arma.propriedades.includes(acuidade) && this.atributos.destreza >= this.atributos.forca) {
            bonusAtaque = this.atributos.destrezaBonus + this.atributos.bonusProficiencia;
        } else {
            bonusAtaque = this.atributos.forcaBonus + this.atributos.bonusProficiencia;
        }

        if (logCallback) {
            const totalAtaque = +_1d20.resultados + bonusAtaque;

            logCallback(`1d20 + ${bonusAtaque} = ${totalAtaque} (${_1d20.resultados} + ${bonusAtaque})`);

            if (+_1d20.resultados == 20) {
                logCallback("Acerto Crítico!");
                return true;
            } else if (totalAtaque >= (alvo.classeArmadura ?? 0)) {
                logCallback("Acerto!");
                return true;
            } else {
                logCallback("Erro!");
                return false;
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

                if ((this.arma.propriedades.includes(acuidade) && this.atributos.destreza >= this.atributos.forca) &&
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
                } else if (this.arma.propriedades.includes(acuidade) && this.atributos.destreza >= this.atributos.forca) { // Dano com Destreza
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

    conjurarMagia(magia: Magia, logCallback?: LogCallback) {
        if (logCallback && this.mana !== undefined) {
            if (this.mana >= magia.custoMana) {
                logCallback(`${this.nome} conjurou ${magia.nome}.`);
                // Verifica se a magia é uma instância de SpellBuff
                if (magia instanceof SpellBuff) {
                    // Verifica se o efeito já está ativo
                    if (this.efeitosAtivos[magia.nome]) {
                        // Se sim, renova a duração
                        this.efeitosAtivos[magia.nome].rodadasRestantes = magia.duracaoRodadas;
                        logCallback(`Duracao de ${magia.nome} renovada.`);
                    } else {
                        // Se não, conjura a magia e adiciona o efeito ativo
                        magia.conjurar(this);
                        this.efeitosAtivos[magia.nome] = { rodadasRestantes: magia.duracaoRodadas, tipoEfeito: magia.tipoEfeito };
                        if (magia.tipoEfeito == "CA") {
                            this.calcularClasseArmadura()
                        }
                    }
                } else {
                    // Se não for uma instância de SpellBuff, apenas conjura a magia
                    magia.conjurar(this);
                }

                // Reduz a mana
                this.mana -= magia.custoMana;
            } else {
                logCallback(`Sem mana suficiente!`);
            }
        }
    }




    // Descanso longo
    descanso(combate: Combate, logCallback?: LogCallback) {
        if (logCallback) {
            if (combate.rodada > 0) {
                logCallback(`Voce nao pode descansar agora! ${combate.rodada}`)
            } else {
                this.pontosVida = this.pontosVidaMaximos
                this.mana = this.manaMaximo
                logCallback("Pontos de vida e mana recuperados!")

            }
        }
    }
}

export function usePersonagem() {

    const atributos = new Atributos(8, 8, 8, 8, 8, 8);
    const initialPersonagem = new Personagem("Sem Nome", 0, 0, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioArma, 1, 1, 1, undefined, undefined, undefined, './placeholder.png', "Medio", [], 0, 0, 0, [], {});
    const [personagem, setPersonagem] = useState(initialPersonagem);
    let storedCharacter = localStorage.getItem("personagem");

    useEffect(() => {
        if (storedCharacter !== null) {
            const parsedCharacter = JSON.parse(storedCharacter);

            // Reconstruir instâncias apropriadas, dependendo dos tipos esperados
            parsedCharacter.magiasConhecidas = parsedCharacter.magiasConhecidas.map((magia: any) => Magia.reconstruir(magia));

            setPersonagem(new Personagem(parsedCharacter));
        }
    }, []);



    personagem.calcularBonus()
    personagem.calcularClasseArmadura()
    personagem.calcularNivel()


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
        novaRaca?: string,
        novaClasse?: string,
    ) => {
        setPersonagem((basePersonagem) => {
            const mudarPersonagem = new Personagem({ ...basePersonagem });
            mudarPersonagem.atualizarPersonagem(novoNome, novaForca, novaDestreza, novaConstituicao, novaInteligencia, novaSabedoria, novaCarisma, novaArma, novaArmadura, novoEquip, novaImagem, novaRaca, novaClasse);
            return mudarPersonagem;
        });
    };

    return { personagem, atualizarPersonagem };
}