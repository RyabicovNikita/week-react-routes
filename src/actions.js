export const updateTodoList = (setTodoList) => {
	fetch('http://localhost:3005/todos')
		.then((res) => res.json())
		.then((result) => setTodoList(result))
		.catch((error) => console.error(error));
};

export const addNewTodo = (setTodoList, data) => {
	fetch('http://localhost:3005/todos', {
		method: 'POST',
		headers: { 'Context-Type': 'application/json' },
		body: JSON.stringify({
			title: data.title,
			completed: data.completed,
		}),
	})
		.then((res) => res.json())
		.then((todo) => setTodoList((prevTodos) => [...prevTodos, todo]))
		.catch((error) => console.error(error));
};
