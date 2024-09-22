import { mergeClasses } from '../../services';
import styles from './Buttons.module.css';
export const Buttons = ({ value, onClick, className, disabled }) => (
	<input className={styles.button} type="button" value={value} onClick={onClick} disabled={disabled} />
);
