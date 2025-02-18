import styles from "./FieldsetTestesEQualidade.module.css"
import { PassouPorTestes, SelectTestes } from '../SelectTestes'

const FieldsetTestesEQualidade = ({
    quaisTestes,
    setQuaisTestes,
    passouPorTestes,
    setPassouPorTestes
}) => {
    return (
        <fieldset className={styles.containerFieldsetTestesEQualidade}>
            <legend>Testes e qualidade</legend>
            <PassouPorTestes 
                passouPorTestes={passouPorTestes} 
                setPassouPorTestes={setPassouPorTestes}
            />

            {passouPorTestes === "sim" && 
                // As props estão sendo passadas como selectedTests mas o componente espera quaisTestes
                <SelectTestes
                    quaisTestes={quaisTestes}        // Corrigido
                    setQuaisTestes={setQuaisTestes}  // Corrigido
                />
            }
        </fieldset>
    )
}

export default FieldsetTestesEQualidade