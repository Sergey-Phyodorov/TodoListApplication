import './todo-list-items.css';

import { TodoItem } from '../TodoItem/TodoItem';

import { useContext } from 'react';
import { TodoListContext } from '../../context/todo-list-context';

export const TodoListItems = () => {
	const { todoList } = useContext(TodoListContext);

	return (
		<ul className="app__list fa-ul2">
			{todoList.map(
				({
					id,
					todoTitle,
					isDone,
					isEditing = false,
					isDisabledButton = false,
				}) => (
					<TodoItem
						key={id}
						id={id}
						todoTitle={todoTitle}
						isDone={isDone}
						isEditing={isEditing}
						isDisabledButton={isDisabledButton}
					/>
				),
			)}
		</ul>
	);
};
