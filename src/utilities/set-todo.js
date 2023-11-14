export const setTodo = (todoList, newTodoData) =>
	todoList.map((todo) => {
		if (todo.id === newTodoData.id) {
			return {
				...todo,
				...newTodoData,
			};
		}
		return todo;
	});
