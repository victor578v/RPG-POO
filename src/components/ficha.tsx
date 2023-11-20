import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import './Menu.css';
import { Personagem } from '../classes/personagem';

interface FichaProps {
    personagem: Personagem;
}

const Ficha: React.FC<FichaProps> = ({ personagem }) => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                <div className='basicos'>
                    <p className='separador'>Básicos</p>
                    <p>Nome do Personagem: {personagem.nome}</p>
                    <p>Raca:</p>
                    <p>Classe: placeholder Nivel placeholder nivel</p>
                    <p>Pontos de vida: {personagem.pontosVida}/{personagem.pontosVidaMaximos}</p>
                    <p>Classe de Armadura: {personagem.classeArmadura}</p>
                </div>
                <div className='atributos'>
                    <p className='separador'>Atributos</p>
                    <p>Forca: {personagem.atributos.forca} ({personagem.atributos.forcaBonus})</p>
                    <p>Destreza: {personagem.atributos.destreza} ({personagem.atributos.destrezaBonus})</p>
                    <p>Constituiçâo: {personagem.atributos.constituicao} ({personagem.atributos.constituicaoBonus})</p>
                    <p>Inteligencia: {personagem.atributos.inteligencia} ({personagem.atributos.inteligenciaBonus})</p>
                    <p>Sabedoria: {personagem.atributos.sabedoria} ({personagem.atributos.sabedoriaBonus})</p>
                    <p>Carisma: {personagem.atributos.carisma} ({personagem.atributos.carismaBonus})</p>
                </div>
                <div className='Proficiencias'>
                    <p className='separador'>Proficiencias</p>
                    <p>Armas:</p>
                    <p>Equipamentos:</p>
                    <p>Testes de Resistencia:</p>
                    <p>Inteligencia: {personagem.atributos.inteligencia} ({personagem.atributos.inteligenciaBonus})</p>
                    <p>Sabedoria: {personagem.atributos.sabedoria} ({personagem.atributos.sabedoriaBonus})</p>
                    <p>Carisma: {personagem.atributos.carisma} ({personagem.atributos.carismaBonus})</p>
                </div>
                <div className='Equipamentos'>
                    <p className='separador'>Equipamentos</p>
                    <p>Mao Primaria: {personagem.arma.nome}</p>
                    <p>Mao Secundaria: {personagem.equipSecundario.nome}</p>
                    <p>Armadura: {personagem.armadura.nome}</p>
                </div>
                <p></p>
                <p></p>
            </Modal>
        </>
    )
}

export default Ficha;