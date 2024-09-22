import { useEffect, useState } from 'react';
import { addNewTodo, deleteTodo, getTodoList, updateTodo } from '../../services';
import { LayoutTodoList } from '../LayoutTodoList/LayoutTodoList';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { CardTodo } from '../CardTodo/CardTodo';
import { NotFound } from '../NotFound/NotFound';

export const ContainerTodoList = () => {
	const [refreshData, setRefreshData] = useState(false);
	const [todoList, setTodoList] = useState();
	const [nameTodo, setNameTodo] = useState('');
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [userSearch, setUserSearch] = useState('');
	function onAddTodoClick() {
		addNewTodo(setRefreshData, { title: nameTodo, completed: false });
	}
	function onCheckedClick({ target }) {
		const el = target.closest('.todoList__todo');
		const todo = todoList.find((t) => t.id === Number(el?.dataset?.id));
		todo.completed = !todo.completed;
		updateTodo(setRefreshData, el?.dataset?.id, todo);
	}

	function onSelectChange({ target }) {
		setUserSearch(`?q=${target.value}`);
	}

	useEffect(() => {
		getTodoList(setTodoList, userSearch);
	}, [refreshData, userSearch]);
	return (
		<div className="container">
			<Navigation setNameTodo={setNameTodo} onAddClick={onAddTodoClick} onSelectChange={onSelectChange} />
			<Routes>
				<Route path="/" element={<LayoutTodoList todoList={todoList} onCheckedClick={onCheckedClick} />} />
				<Route
					path="/task/:id"
					element={<CardTodo setRefreshData={setRefreshData} nameTodo={nameTodo} todoList={todoList} />}
				/>
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
		</div>
	);
};
