import { useEffect, useState } from 'react';
import { addNewTodo, deleteTodo, getTodoByID, getTodoList, updateTodo } from '../../services';
import { LayoutTodoList } from '../LayoutTodoList/LayoutTodoList';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { CardTodo } from '../CardTodo/CardTodo';
import { NotFound } from '../NotFound/NotFound';

export const ContainerTodoList = () => {
	const [newNameTodo, setNewNameTodo] = useState('');
	const [userSearch, setUserSearch] = useState('');
	const [updateList, setUpdateList] = useState(false);
	function onAddTodoClick() {
		addNewTodo(setUpdateList, { title: newNameTodo, completed: false });
	}

	function onSelectChange({ target }) {
		setUserSearch(`?q=${target.value}`);
	}

	return (
		<div className="container">
			<Navigation setNameTodo={setNewNameTodo} onAddClick={onAddTodoClick} onSelectChange={onSelectChange} />
			<Routes>
				<Route
					path="/"
					element={
						<LayoutTodoList userSearch={userSearch} updateList={updateList} setUpdateList={setUpdateList} />
					}
				/>
				<Route path="/task/:id" element={<CardTodo />} />
				<Route path="*" element={<Navigate to="/404" />} />
				<Route path="/404" element={<NotFound />} />
			</Routes>
		</div>
	);
};
