import LogoGovPE from '../../assets/LogoGovPE.png'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'
import youtube from '../../assets/youtube.png'

import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.containerFooter}>
            <img src={LogoGovPE} alt="Logo do Governo do Estado de Pernambuco" />
            <ul>
                <li>
                    <a href="https://www.facebook.com/governope" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Logo do Governo do Estado de Pernambuco" /></a>
                </li>
                <li>
                    <a href="https://www.instagram.com/governope" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Logo do Governo do Estado de Pernambuco" /></a>
                </li>
                <li>
                    <a href="https://x.com/governope?mx=2" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Logo do Governo do Estado de Pernambuco" /></a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@governodepernambuco7867" target="_blank" rel="noopener noreferrer"><img src={youtube} alt="Logo do Governo do Estado de Pernambuco"/></a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer