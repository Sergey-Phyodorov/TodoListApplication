export const initialState = {
	todoList: [],
};
export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_TODO_LIST': {
			return {
				...state,
				todoList: payload,
			};
		}
		case 'ADD_TODO': {
			return {
				...state,
				todoList: [...state.todoList, payload],
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
						return payload;
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
