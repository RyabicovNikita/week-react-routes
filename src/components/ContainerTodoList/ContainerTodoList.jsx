import { useEffect, useState } from 'react';
import { addNewTodo, deleteTodo, getTodoList, updateTodo } from '../../services';
import { LayoutTodoList } from '../LayoutTodoList/LayoutTodoList';

export const ContainerTodoList = () => {
	const [refreshData, setRefreshData] = useState(false);
	const [todoList, setTodoList] = useState();
	const [nameTodo, setNameTodo] = useState('');
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [userSearch, setUserSearch] = useState('');
	function onAddTodoClick() {
		addNewTodo(setRefreshData, { title: nameTodo, completed: false });
	}
	function onDescriptionUpdateClick() {
		updateTodo(setRefreshData, selectedTodo?.dataset?.id, {
			title: nameTodo,
		});
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

	function onDeleteTodoClick() {
		deleteTodo(setRefreshData, selectedTodo?.dataset?.id);
	}

	const onTodoClick = (event) => {
		event.preventDefault();
		const { target } = event;
		if (target.classList.contains('todo__completed')) return;

		//Нахожу родительский элемент (элемент списка) т.к. в target могут попасть и дочерние элементы
		const todo = target.closest('.todoList__todo');
		setSelectedTodo(todo);
		//Делаю глубокое копирование чтобы не мутировать тек. массив
		let deepCopyTodoList = JSON.parse(JSON.stringify(todoList));
		//Нахожу по id в массиве выбранный элемент
		const indexTodo = deepCopyTodoList.findIndex((t) => t.id === Number(todo.dataset.id));
		//Вырезаю его из массива
		const currentTodoCopy = deepCopyTodoList.splice(indexTodo, 1)[0];
		//Меняю selected
		currentTodoCopy.selected = !currentTodoCopy.selected;
		//Проверяю чтобы в массиве больше не было выбранных элементов
		deepCopyTodoList = deepCopyTodoList.map((todo) => {
			if (todo.selected === true) todo.selected = false;
			return todo;
		});
		//Вставляю изменённый элемент назад в массив на своё место
		deepCopyTodoList = deepCopyTodoList.toSpliced(indexTodo, 0, currentTodoCopy);
		//Обновляю тек. массив
		setTodoList(deepCopyTodoList);
	};

	return (
		<LayoutTodoList
			todoList={todoList}
			setTodoList={setTodoList}
			setNameTodo={setNameTodo}
			setSelectedTodo={setSelectedTodo}
			onAddClick={onAddTodoClick}
			onDescriptionUpdateClick={onDescriptionUpdateClick}
			onDeleteClick={onDeleteTodoClick}
			onCheckedClick={onCheckedClick}
			onTodoClick={onTodoClick}
			onSelectChange={onSelectChange}
		/>
	);
};
