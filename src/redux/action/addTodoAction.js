export const addTodoAction = () => {
	const newTodo = {
		id: 'NEW_TODO_ID',
		todoTitle: '',
		isDone: false,
		isEditing: true,
		isDisabledButton: true,
	};
	return (dispatch) => {
		dispatch({ type: 'ADD_TODO', payload: newTodo });
	};
};
