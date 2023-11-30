import { readTodo } from '../../api/api';

export const initialTodoListAction = () => {
	return (dispatch) => {
		readTodo().then((loadedTodoList) =>
			dispatch({ type: 'INITIAL_TODO_LIST', payload: loadedTodoList }),
		);
	};
};
