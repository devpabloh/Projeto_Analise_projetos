
import {useState} from "react"
import styles from './Header.module.css';
import logoATI from "../../assets/logoATI.png"

const Header = () => {

    const [isAnimating, setAnimating] = useState(false);

    const handleMouseEnter = () => {
        setAnimating(true);
    };

    const handleAnimationEnd = () => {
        setAnimating(false);
    };
    return (
        <header className={styles.containerHeader}>
            <img src={logoATI} alt="LogoAti" className={isAnimating ? 'animate' : ''}
                onMouseEnter={handleMouseEnter}
                onAnimationEnd={handleAnimationEnd} />
            <span>[Checklist de qualidade - GTD] - Criação do checklist básico para o controle de qualidade</span>
        </header>
    )
}

export default Header