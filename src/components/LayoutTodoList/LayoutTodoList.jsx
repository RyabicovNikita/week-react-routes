import { NavLink } from 'react-router-dom';
import './TodoList.scss';
export const LayoutTodoList = ({ todoList, onCheckedClick }) => {
	return (
		<div className="container__scrollable">
			<ul className="scrollable__todoList">
				{todoList?.map((todo) => (
					<NavLink to={`/task/${todo.id}`} className="todoList__todo" key={todo.id} data-id={todo.id}>
						<input
							className="todo__completed-checkbox hidden"
							id="todoCompleted"
							type="checkbox"
							checked={todo.completed === true ? true : false}
						/>
						<label className="todo__completed" htmlFor="todoCompleted" onClick={onCheckedClick}></label>
						<p className="todo__description">{todo.title}</p>
					</NavLink>
				))}
			</ul>
		</div>
	);
};
