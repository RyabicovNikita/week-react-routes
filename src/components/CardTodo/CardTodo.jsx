import { useNavigate, useParams } from 'react-router-dom';
import { Buttons } from '../Buttons/Buttons';
import { deleteTodo, getTodoByID, updateTodo } from '../../services';
import styles from './CardTodo.module.css';
import { useEffect, useState } from 'react';
import { CardLoading } from '../CardLoading/CardLoading';

export const CardTodo = () => {
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();
	const onBackClick = () => {
		navigate(-1);
	};
	function onDescriptionUpdateClick() {
		// updateTodo(id, {
		// 	title: nameTodo,
		// });
	}
	function onDeleteTodoClick() {
		deleteTodo(id);
		navigate(-1);
	}

	useEffect(() => {
		setIsLoading(true);
		getTodoByID(id).then((res) => {
			setTodo(res);
			setIsLoading(false);
		});
	}, [id]);

	return (
		<>
			{isLoading && <CardLoading />}
			{!isLoading && (
				<div>
					<h1 className={styles.header}>Task {todo?.id}</h1>
					<div className={styles.description}>{todo?.title}</div>
					<div className={styles['buttons-container']}>
						<Buttons onClick={onDescriptionUpdateClick} value="Update task" className="update" />
						<Buttons onClick={onDeleteTodoClick} value="Delete task" className="delete" />
						<Buttons onClick={onBackClick} value="Go back" />
					</div>
				</div>
			)}
		</>
	);
};
