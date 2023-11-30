import './todo-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckSquare,
	faSquare,
	faFloppyDisk,
	faShareFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../ui/Button/Button';

import { Link } from 'react-router-dom';
import { findTodo } from '../../utilities/find-todo';

import { useDispatch, useSelector } from 'react-redux';
import { selectTodoList } from '../../redux/selectors/selectTodoList';
import { updateTodoAction } from '../../redux/action/updateTodoAction';
import { todoChangeAction } from '../../redux/action/todoChangeAction';
import { addTodoSaveAction } from '../../redux/action/addTodoSaveAction';
import { addTodoCanselAction } from '../../redux/action/addTodoCanselAction';
import { selectTodo } from '../../redux/selectors/selectTodo';

export const TodoItem = ({ idTodo, isEditing }) => {
	const dispatch = useDispatch();
	const todoList = useSelector(selectTodoList) || [];
	const { todoTitle, isDone } = useSelector(selectTodo(idTodo)) || {};

	const onTodoAddCancel = (idTodo) => {
		dispatch(addTodoCanselAction(idTodo));
	};
	const onTodoAddChange = (idTodo, changTitle) => {
		dispatch(todoChangeAction({ id: idTodo, todoTitle: changTitle }));
	};
	const onTodoAddSave = (idTodo) => {
		const newTodoTitle = findTodo(todoList, idTodo) || {};
		dispatch(addTodoSaveAction(newTodoTitle));
	};
	const onTodoIsDone = (idTodo, isDone) => {
		dispatch(updateTodoAction(idTodo, { isDone: !isDone }));
	};

	return (
		<li className={`todo-item ${isDone ? 'todo-item--done' : ''}`}>
			<Button onClick={() => onTodoIsDone(idTodo, isDone)}>
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
					onChange={({ target }) =>
						onTodoAddChange(idTodo, target.value)
					}
				/>
			) : (
				<Link to={`/todo/${idTodo}`} className="todo-item__text">
					{todoTitle}
				</Link>
			)}

			<div className="todo-item__actions">
				{isEditing ? (
					<>
						<Button
							onClick={() => onTodoAddSave(idTodo)}
							className="todo-item__button">
							<FontAwesomeIcon
								className="todo-item__icon"
								icon={faFloppyDisk}
							/>
						</Button>

						<Button
							onClick={() => onTodoAddCancel(idTodo)}
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
