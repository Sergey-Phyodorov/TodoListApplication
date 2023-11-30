import './todo-list-items.css';

import { useSelector, useDispatch } from 'react-redux';
import { TodoItem } from '../TodoItem/TodoItem';

import { useEffect } from 'react';
import { initialTodoListAction } from '../../redux/action/initialTodoListAction';
import { selectTodoList } from '../../redux/selectors/selectTodoList';

export const TodoListItems = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initialTodoListAction());
	}, [dispatch]);

	const todoList = useSelector(selectTodoList) || [];

	return (
		<ul className="app__list">
			{todoList.map(({ id, todoTitle, isDone, isEditing = false }) => (
				// isEditing = false разобраться
				<TodoItem
					key={id}
					id={id}
					todoTitle={todoTitle}
					isDone={isDone}
					isEditing={isEditing}
				/>
			))}
		</ul>
	);
};
