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
                <SelectTestes
                    quaisTestes={quaisTestes}
                    setQuaisTestes={setQuaisTestes}
                />
            }
        </fieldset>
    )
}

export default FieldsetTestesEQualidade