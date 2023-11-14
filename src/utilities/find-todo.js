export const findTodo = (todoList, todoId) => {
	const findTodo = todoList.find(({ id }) => id === todoId);
	return findTodo;
};
