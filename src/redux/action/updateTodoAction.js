import { updateTodo } from '../../api/api';

export const updateTodoAction = (id, payload) => {
	return (dispatch) => {
		updateTodo(id, payload).then((updatedTodo) => {
			dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
		});
	};
};
