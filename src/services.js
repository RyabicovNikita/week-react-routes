export const mergeClasses = (classes, separator = ' ') => {
	if (classes?.length === 0) return '';
	let className = '';
	classes.forEach((item) => {
		item?.length ? (className = className + separator + item) : (className = item);
	});
	return className;
};

export const getTodoList = (setTodoList, search = '') => {
	fetch(`http://localhost:3005/todos/${search}`)
		.then((res) => res.json())
		.then((result) => setTodoList(result))
		.catch((error) => console.error(error));
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

export const updateTodo = (setRefreshData, id, data) => {
	let newDataJSONFormat = {};
	if (data?.title?.length > 0) newDataJSONFormat.title = data.title;
	if (typeof data?.completed !== 'undefined') newDataJSONFormat.completed = data.completed;

	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify(newDataJSONFormat),
	})
		.catch((error) => console.error(error))
		.finally(() => setRefreshData((prevState) => !prevState));
};

export const deleteTodo = (setRefreshData, id) => {
	fetch(`http://localhost:3005/todos/${id}`, {
		method: 'DELETE',
	})
		.catch((error) => console.error(error))
		.finally(() => setRefreshData((prevState) => !prevState));
};

export function debounce(callback, timeOut) {
	setTimeout(callback, timeOut);
}
