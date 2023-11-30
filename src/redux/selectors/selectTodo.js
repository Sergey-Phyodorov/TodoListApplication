export const selectTodo = (idTodo) => {
	return (state) => {
		return state.todoList.find(({ id }) => id === idTodo);
	};
};
