import { Navigation } from '../Navigation/Navigation';
import './TodoList.scss';
export const LayoutTodoList = ({
	todoList,
	onAddClick,
	onDescriptionUpdateClick,
	onDeleteClick,
	setNameTodo,
	onCheckedClick,
	onTodoClick,
	onSelectChange,
}) => {
	return (
		<div className="container">
			<div className="container__scrollable">
				<Navigation
					setNameTodo={setNameTodo}
					onAddClick={onAddClick}
					onDeleteClick={onDeleteClick}
					onDescriptionUpdateClick={onDescriptionUpdateClick}
					todoList={todoList}
					onSelectChange={onSelectChange}
				/>
				<ul className="scrollable__todoList">
					{todoList?.map((todo) => (
						<li
							className="todoList__todo"
							onClick={onTodoClick}
							key={todo.id}
							data-id={todo.id}
							data-selected={todo.selected}
						>
							<input
								className="todo__completed-checkbox hidden"
								id="todoCompleted"
								type="checkbox"
								checked={todo.completed === true ? true : false}
							/>
							<label className="todo__completed" htmlFor="todoCompleted" onClick={onCheckedClick}></label>
							<span className="todo__description">{todo.title}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
