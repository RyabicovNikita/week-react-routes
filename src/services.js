export const mergeClasses = (classes, separator = ' ') => {
	if (classes?.length === 0) return '';
	let className = '';
	classes.forEach((item) => {
		item?.length ? (className = className + separator + item) : (className = item);
	});
	return className;
};

export const getTodoList = (setTodoList, search = '', setIsLoading) => {
	setIsLoading(true);
	fetch(`http://localhost:3005/todos/${search}`)
		.then((res) => res.json())
		.then((result) => setTodoList(result))
		.catch((error) => console.error(error))
		.finally(() => setIsLoading(false));
};

export const getTodoByID = async (id) => {
	const responsible = await fetch(`http://localhost:3005/todos/${id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	});
	return await responsible.json();
};

export const addNewTodo = (setRefreshData, data) => {
	fetch('http://localhost:3005/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: data.title,
			completed: data.completed,
			selected: data.selected,
		}),
	})
		.catch((error) => console.error(error))
		.finally(() => setRefreshData((prevState) => !prevState));
};

export const updateTodo = (id, data) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(data),
	}).catch((error) => console.error(error));
	// .finally(() => setRefreshData((prevState) => !prevState));
};

export const deleteTodo = (id) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	}).catch((error) => console.error(error));
};

export function debounce(callback, timeOut) {
	setTimeout(callback, timeOut);
}
