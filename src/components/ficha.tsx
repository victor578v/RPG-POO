import './geral.css';
import { Personagem } from '../classes/personagem';
import Inventario from './inventario';
import { Arma, Armadura, EquipSecundario, Item, vazioArma, vazioArmadura } from '../classes/equipamentos';
import { useState } from 'react';
import Modal from 'react-responsive-modal';
import { danoExtra } from '../classes/propriedades';

interface FichaProps {
    personagem: Personagem;
    atualizarPersonagem: (
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Arma,
        novaArmadura?: Armadura,
        novoEquip?: EquipSecundario,
        novaRaca?: string,
        novaClasse?: string,
    ) => void;
}

const Ficha: React.FC<FichaProps> = ({ personagem, atualizarPersonagem }) => {
    const [att, setAtt] = useState(0);
    const [verItem, setVerItem] = useState<Arma | EquipSecundario | Armadura | null>(null);

    function desequiparItem(item: Item | Arma | Armadura | EquipSecundario) {
        if (item instanceof Arma) {
            if (item.nome == 'Vazia') {
                alert(`Nao há o que desequipar!`);
            } else {
                alert(`${personagem.arma.nome} foi Desequipado!`);
                personagem.inventario.push(personagem.arma)
            }
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, vazioArma, undefined, undefined);
            setVerItem(null)
        } else if (item instanceof Armadura) {
            if (item.tipo == 'nenhuma') {
                alert(`Nao há o que desequipar!`);
            } else {
                alert(`${personagem.armadura.nome} foi Desequipado!`);
                personagem.inventario.push(personagem.armadura)
            }
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, vazioArmadura, undefined);
            setVerItem(null)
        } else if (item instanceof EquipSecundario) {
            if (item.nome == 'Vazia') {
                alert(`Nao há o que desequipar!`);
            } else {
                alert(`${personagem.equipSecundario.nome} foi Desequipado!`);
                personagem.inventario.push(personagem.equipSecundario)
            }
            atualizarPersonagem(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, vazioArma);
            setAtt(att + 1);
            setVerItem(null)
        }
    }


    return (
        <>
            <div className='basicos'>
                <p>Básicos</p>
                <p>Nome: {personagem.nome}</p>
                <p>Classe: {personagem.classePersonagem} Nivel {personagem.nivel} (Prof +{personagem.atributos.bonusProficiencia})</p>
                <p>Raca: {personagem.racaPersonagem}</p>
                <p>Pontos de vida: {personagem.pontosVida}/{personagem.pontosVidaMaximos}</p>
                <p>Classe de Armadura: {personagem.classeArmadura}</p>
                <p>Percepcao passiva: {personagem.percepcaoPassiva}</p>
                <p>{personagem.nome}</p>
                <div><img src={`${personagem.imagem}`} width={10} height={10} alt="Personagem" /></div>
            </div>
            <div className='atributos'>
                <p>Atributos</p>
                <div id='forca'>
                    <p>Forca</p>
                    <h1>{personagem.atributos.forca} ({personagem.atributos.forcaBonus})</h1>
                </div>
                <div id='destreza'>
                    <p>Destreza</p>
                    <h1>{personagem.atributos.destreza} ({personagem.atributos.destrezaBonus})</h1>
                </div>
                <div id='constituicao'>
                    <p>Constituição</p>
                    <h1>{personagem.atributos.constituicao} ({personagem.atributos.constituicaoBonus})</h1>
                </div>
                <div id='inteligencia'>
                    <p>Inteligencia</p>
                    <h1>{personagem.atributos.inteligencia} ({personagem.atributos.inteligenciaBonus})</h1>
                </div>
                <div id='sabedoria'>
                    <p>Sabedoria</p>
                    <h1>{personagem.atributos.sabedoria} ({personagem.atributos.sabedoriaBonus})</h1>
                </div>
                <div id='carisma'>
                    <p>Carisma</p>
                    <h1>{personagem.atributos.carisma} ({personagem.atributos.carismaBonus})</h1>
                </div>
            </div>
            <div className='proficiencias'>
                <p>Proficiencias</p>
                <p>Armas:</p>
                <p>Equipamentos:</p>
                <p>Testes de Resistencia:</p>
                <p>Habilidades:</p>
            </div>
            <div className='equipamentos'>
                <p>Equipamentos</p>
                <p onClick={() => setVerItem(personagem.arma)}>Mao Primaria: {personagem.arma.nome} </p>
                <p onClick={() => setVerItem(personagem.equipSecundario)}>Mao Secundaria: {personagem.equipSecundario.nome} </p>
                <p onClick={() => setVerItem(personagem.armadura)}>Armadura: {personagem.armadura.nome} </p>
                <p>Acessorio 1: </p>
                <p>Acessorio 2: </p>
                <p>Acessorio 3: </p>
                <Inventario personagem={personagem} atualizarPersonagem={atualizarPersonagem} />
            </div>
            <div className='habilidades'>
                <p>Habilidades e Magias</p>
                <p>Ver Magias</p>
                <p>Ver Habilidades</p>
                <p>Mana: 0/0</p>
            </div>

            <Modal open={verItem !== null} onClose={() => setVerItem(null)} center classNames={{ overlay: 'customOverlay', modal: 'itemInfoModal' }} >
                {verItem && (
                    <div>
                        <p>Nome: {verItem.nome}</p>
                        <p>Descrição: {verItem.descricao}</p>
                        {verItem instanceof Armadura &&
                            <>
                                <p>CA: {+verItem.bonusCA + 10}</p>
                                <p>Tipo: {verItem.tipo}</p>
                            </>
                        }

                        {verItem instanceof Arma && (<>
                            <p>Dano: {verItem.dadosDano}d{verItem.dadoTipo} {verItem.tipoDano}</p>
                        </>
                        )}

                        {verItem instanceof Arma && verItem.propriedades.includes(danoExtra) && (
                            <p>Dano Adicional: {verItem.dadosDanoExtra}d{verItem.dadoTipoExtra} {verItem.tipoDanoExtra}</p>
                        )}
                        <button onClick={() => desequiparItem(verItem)}>Desequipar</button>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default Ficha;