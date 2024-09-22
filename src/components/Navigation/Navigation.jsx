import { debounce } from '../../services';
import { Buttons } from '../Buttons/Buttons';
import { Input } from '../Input/Input';

import styles from './Navigation.module.css';

export const Navigation = ({
	setNameTodo,
	onAddClick,
	onDescriptionUpdateClick,
	onDeleteClick,
	onSelectChange,
	todoList,
}) => (
	<div className={styles.navigation}>
		<Input text="Input description task" id="userInput" onChange={({ target }) => setNameTodo(target.value)} />
		<Input
			text="Input words for search"
			id="search"
			onChange={(event) => debounce(() => onSelectChange(event), 1000)}
		/>
		<div className={styles.navigation__buttons}>
			<Buttons onClick={onAddClick} value="Add new task" className="add" />
			<Buttons
				onClick={onDescriptionUpdateClick}
				value="Update task"
				className="update"
				disabled={!todoList?.length}
			/>
			<Buttons onClick={onDeleteClick} value="Delete task" className="delete" disabled={!todoList?.length} />
		</div>
	</div>
);
