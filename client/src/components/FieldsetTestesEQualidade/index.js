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
                value={passouPorTestes} 
                onChange={setPassouPorTestes}
            />

            {passouPorTestes === "sim" && 
                <SelectTestes
                    selectedTests={quaisTestes}
                    setSelectedTests={setQuaisTestes}
                />
            }
        </fieldset>
    )
}

export default FieldsetTestesEQualidade