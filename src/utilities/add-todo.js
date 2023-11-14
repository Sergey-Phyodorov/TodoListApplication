import { NEW_TODO_ID } from '../constants/new-todo-id';

export const addTodo = (todoList, todo) => {
	const newTodo = todo || {
		id: NEW_TODO_ID,
		todoTitle: '',
		isDone: false,
		isEditing: true,
		isDisabledButton: false,
	};
	return [newTodo, ...todoList];
};
