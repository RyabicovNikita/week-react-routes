import styles from './Input.module.css';
export const Input = ({ text, onChange, id, disabled }) => {
	return (
		<div className={styles['input-container']}>
			<label className={styles['input-container__label']} htmlFor={id}>
				{text}
			</label>
			<input
				className={styles['input-container__input']}
				id={id}
				type="text"
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	);
};
