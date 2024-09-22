import { useNavigate, useParams } from 'react-router-dom';
import { Buttons } from '../Buttons/Buttons';
import { deleteTodo, updateTodo } from '../../services';
import styles from './CardTodo.module.css';

export const CardTodo = ({ todoList, setRefreshData, nameTodo }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const onBackClick = () => {
		navigate(-1);
	};
	function onDescriptionUpdateClick() {
		updateTodo(setRefreshData, id, {
			title: nameTodo,
		});
	}
	function onDeleteTodoClick() {
		deleteTodo(setRefreshData, id);
		navigate(-1);
	}

	const getCurrentTodo = () => todoList?.find((todo) => Number(todo.id) === Number(id));

	const todo = getCurrentTodo();
	return (
		<>
			<h1 className={styles.header}>Task {todo?.id}</h1>
			<div className={styles.description}>{todo?.title}</div>
			<div className={styles['buttons-container']}>
				<Buttons onClick={onDescriptionUpdateClick} value="Update task" className="update" />
				<Buttons onClick={onDeleteTodoClick} value="Delete task" className="delete" />
				<Buttons onClick={onBackClick} value="Go back" />
			</div>
		</>
	);
};
