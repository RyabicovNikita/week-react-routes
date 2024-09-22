import { useMatch } from 'react-router-dom';
import { debounce } from '../../services';
import { Buttons } from '../Buttons/Buttons';
import { Input } from '../Input/Input';

import styles from './Navigation.module.css';

export const Navigation = ({ setNameTodo, onAddClick, onSelectChange }) => {
	const isTodoOpen = useMatch('/task/:id');
	const is404 = useMatch('/404');
	return (
		<div className={styles.navigation}>
			<Input
				text="Input description task"
				id="userInput"
				disabled={is404 !== null}
				onChange={({ target }) => setNameTodo(target.value)}
			/>
			<Input
				text="Input words for search"
				id="search"
				onChange={(event) => debounce(() => onSelectChange(event), 1000)}
				disabled={isTodoOpen !== null || is404 !== null}
			/>
			<div className={styles.navigation__buttons}>
				<Buttons onClick={onAddClick} value="Add new task" className="add" disabled={is404 !== null} />
			</div>
		</div>
	);
};
