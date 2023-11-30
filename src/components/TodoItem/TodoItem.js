import { useContext, useState } from 'react';
import './todo-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckSquare,
	faSquare,
	faFloppyDisk,
	faShareFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../ui/Button/Button';
import { TodoListContext } from '../../context/todo-list-context';
import { Link } from 'react-router-dom';
import { setTodo } from '../../utilities/set-todo';
import { NEW_TODO_ID } from '../../constants/new-todo-id';
import { removeTodo } from '../../utilities/remove-todo';
import { findTodo } from '../../utilities/find-todo';
import { createTodo, updateTodo } from '../../api/api';
import { addTodo } from '../../utilities/add-todo';

import { useDispatch, useSelector } from 'react-redux';
import { selectTodoList } from '../../redux/selectors/selectTodoList';
import { updateTodoAction } from '../../redux/action/updateTodoAction';

export const TodoItem = ({ id, isEditing }) => {
	const todoList = useSelector(selectTodoList) || [];
	const dispatch = useDispatch();

	const { todoTitle, isDone } = findTodo(todoList, id);

	const { todoList2, setTodoList } = useContext(TodoListContext);

	const [todoListCanselEdit, setTodoListCanselEdit] = useState(todoList);
	const onTodoAddCancel = (id) => {
		// setIsDisabledButton(false);
		if (id === NEW_TODO_ID) {
			setTodoList(removeTodo(todoList, NEW_TODO_ID));
			return;
		}
		const updatedList = setTodo(todoList, {
			id,
			todoTitle: todoListCanselEdit.todoTitle,
			isEditing: false,
		});
		setTodoList(updatedList);
	};
	const onTodoAddChange = (id, changTitle) => {
		const updatedDescription = setTodo(todoList, {
			id,
			todoTitle: changTitle,
		});
		setTodoList(updatedDescription);
	};
	const onTodoAddSave = (idTodo) => {
		// setIsDisabledButton(false);
		const newTodoTitle = findTodo(todoList, idTodo) || {};

		createTodo(newTodoTitle).then((todo) => {
			let updatedList = setTodo(todoList, {
				id: NEW_TODO_ID,
				isEditing: false,
			});
			updatedList = removeTodo(updatedList, NEW_TODO_ID);
			updatedList = addTodo(updatedList, todo);
			setTodoList(updatedList);
		});
	};
	const onTodoIsDone = (id, isDone) => {
		dispatch(updateTodoAction(id, { isDone: !isDone }));
	};

	return (
		<li className={`todo-item ${isDone ? 'todo-item--done' : ''}`}>
			<Button onClick={() => onTodoIsDone(id, isDone)}>
				{isDone ? (
					<FontAwesomeIcon
						className="todo-item__icon"
						icon={faCheckSquare}
						size="lg"
					/>
				) : (
					<FontAwesomeIcon
						className="todo-item__icon"
						icon={faSquare}
						size="lg"
					/>
				)}
			</Button>

			{isEditing ? (
				<textarea
					className="todo-item__textarea"
					rows="2"
					value={todoTitle}
					onChange={({ target }) => onTodoAddChange(id, target.value)}
				/>
			) : (
				<Link to={`/todo/${id}`} className="todo-item__text">
					{todoTitle}
				</Link>
			)}

			<div className="todo-item__actions">
				{isEditing ? (
					<>
						<Button
							onClick={() => onTodoAddSave(id)}
							className="todo-item__button">
							<FontAwesomeIcon
								className="todo-item__icon"
								icon={faFloppyDisk}
							/>
						</Button>

						<Button
							onClick={() => onTodoAddCancel(id)}
							className="todo-item__button">
							<FontAwesomeIcon
								className="todo-item__icon"
								icon={faShareFromSquare}
							/>
						</Button>
					</>
				) : (
					<></>
				)}
			</div>
		</li>
	);
};
