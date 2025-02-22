import { useState, useEffect } from "react";
import styles from './Notification.module.css';

const Notification = ({message, type = 'info', duration = 3000, onclose})=>{
    const [isVisible, setIsVisible] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsVisible(false);
            onclose && onclose();

        }, duration);

        return ()=> clearTimeout(timer);
    }, [duration, onclose])

    return isVisible ? (
        <div className={`${styles.notification} ${styles[type]}`}>
            <p>{message}</p>
            <button onClick={()=>setIsVisible(false)} className={styles.closeButton}>
                X
            </button>
        </div>
    ) :null; 
};

export default Notification;