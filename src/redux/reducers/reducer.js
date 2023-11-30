export const initialState = {
	todoList: [],
};
export const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'INITIAL_TODO_LIST': {
			return {
				...state,
				todoList: payload,
			};
		}

		case 'ADD_TODO': {
			if (state.todoList.some((obj) => obj.id === payload.id)) {
				return state;
			}

			return {
				...state,
				todoList: [payload, ...state.todoList],
			};
		}

		case 'ADD_TODO_CHANGE': {
			return {
				...state,
				todoList: state.todoList.map((todo) => {
					if (todo.id === payload.id) {
						return {
							...todo,
							...payload,
						};
					}

					return todo;
				}),
			};
		}

		case 'ADD_TODO_SAVE': {
			return {
				...state,
				todoList: [
					...state.todoList.filter(
						(todo) => todo.id !== payload.oldTodo.id,
					),
					payload.newTodo,
				],
			};
		}

		case 'ADD_TODO_CANSEL': {
			console.log('payload', payload);
			return {
				...state,
				todoList: state.todoList.filter((todo) => todo.id !== payload),
			};
		}

		case 'DELETE_TODO': {
			return {
				...state,
				todoList: state.todoList.filter(({ id }) => id !== payload),
			};
		}

		case 'UPDATE_TODO': {
			return {
				...state,
				todoList: state.todoList.map((todo) => {
					if (todo.id === payload.id) {
						return {
							...todo,
							...payload,
						};
					}

					return todo;
				}),
			};
		}

		default: {
			return state;
		}
	}
};
