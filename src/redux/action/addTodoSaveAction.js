import { createTodo } from '../../api/api';

export const addTodoSaveAction = (payload) => {
	return (dispatch) => {
		createTodo(payload).then((newTodo) => {
			dispatch({
				type: 'ADD_TODO_SAVE',
				payload: { newTodo, oldTodo: payload },
			});
		});
	};
};
