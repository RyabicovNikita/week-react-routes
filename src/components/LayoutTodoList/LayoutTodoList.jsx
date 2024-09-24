import { NavLink } from 'react-router-dom';
import './TodoList.scss';
import { useEffect, useState } from 'react';
import { getTodoList, updateTodo } from '../../services';
import { CardLoading } from '../CardLoading/CardLoading';
export const LayoutTodoList = ({ userSearch, setUpdateList, updateList }) => {
	const [todoList, setTodoList] = useState();
	const [isLoading, setIsLoading] = useState(true);

	function onCheckedClick({ target }) {
		const el = target.closest('.todoList__todo');
		const id = Number(el?.dataset?.id);
		if (isNaN(id)) return;
		const todo = todoList.find((t) => Number(t.id) === id);
		updateTodo(id, { completed: !todo.completed });
		setUpdateList((prevState) => !prevState);
	}

	useEffect(() => {
		getTodoList(setTodoList, userSearch, setIsLoading);
	}, [updateList, userSearch]);
	console.log(isLoading);
	return (
		<>
			<div className="container__scrollable">
				<ul className="scrollable__todoList">
					{isLoading && <CardLoading />}
					{!isLoading &&
						todoList?.map((todo) => (
							<div className="todoList__todo" key={todo.id} data-id={todo.id}>
								<input
									className="todo__completed-checkbox hidden"
									id="todoCompleted"
									type="checkbox"
									checked={todo.completed === true ? true : false}
								/>
								<label
									className="todo__completed"
									htmlFor="todoCompleted"
									onClick={onCheckedClick}
								></label>
								<NavLink className="todo_link" to={`/task/${todo.id}`}>
									<p className="todo__description">{todo.title}</p>
								</NavLink>
							</div>
						))}
				</ul>
			</div>
		</>
	);
};
