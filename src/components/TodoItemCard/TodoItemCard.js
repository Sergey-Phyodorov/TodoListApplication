import '../TodoItem/todo-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faFloppyDisk,
	faShareFromSquare,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../ui/Button/Button';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectTodoList } from '../../redux/selectors/selectTodoList';
import { useDispatch, useSelector } from 'react-redux';
import { todoChangeAction } from '../../redux/action/todoChangeAction';
import { updateTodoAction } from '../../redux/action/updateTodoAction';
import { deleteTodoAction } from '../../redux/action/deleteTodoAction';

import { findTodo } from '../../utilities/find-todo';
import { selectTodo } from '../../redux/selectors/selectTodo';

export const TodoItemCard = () => {
	const navigate = useNavigate();
	const todoList = useSelector(selectTodoList) || [];

	const { idTodoPage } = useParams();
	const { todoTitle, isDone, id } =
		useSelector(selectTodo(Number(idTodoPage))) || {};
	const dispatch = useDispatch();

	const [todoDescriptionIsEditCancel, setTodoDescriptionIsEditCancel] =
		useState(todoTitle);
	const [isEditing, setIsEditing] = useState(false);

	const onTodoDescriptionEdit = () => {
		setTodoDescriptionIsEditCancel(todoTitle);
		setIsEditing(!isEditing);
	};
	const onTodoDescriptionEditChange = (idTodo, changDescription) => {
		dispatch(todoChangeAction({ id: idTodo, todoTitle: changDescription }));
	};
	const onTodoDescriptionEditCancel = (idTodo) => {
		dispatch(
			updateTodoAction(idTodo, {
				todoTitle: todoDescriptionIsEditCancel.todoTitle,
			}),
		);

		setIsEditing(!isEditing);
	};
	const onTodoDescriptionEditSave = (idTodo) => {
		const newTodoTitle = findTodo(todoList, idTodo) || {};
		dispatch(
			updateTodoAction(idTodo, { todoTitle: newTodoTitle.todoTitle }),
		);

		setIsEditing(!isEditing);
	};
	const onTodoDelete = (id) => {
		if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
			dispatch(deleteTodoAction(id));
			navigate('/');
		}
	};

	return (
		<ul className="app__list">
			{todoTitle === undefined ? (
				<>
					<div> Такой задачи не существует </div>
					<Button
						onClick={() => navigate('/')}
						className="todo-item__button">
						<FontAwesomeIcon
							className="todo-item__icon"
							icon={faShareFromSquare}
							rotation={180}
							size={'2x'}
						/>
					</Button>
				</>
			) : (
				<>
					<li
						className={`todo-item ${
							isDone ? 'todo-item--done' : ''
						}`}>
						{isEditing ? (
							<textarea
								className="todo-item__textarea"
								rows="2"
								value={todoTitle}
								onChange={({ target }) =>
									onTodoDescriptionEditChange(
										id,
										target.value,
									)
								}
							/>
						) : (
							<div
								onDoubleClick={() => setIsEditing(!isEditing)}
								className="todo-item__text">
								{todoTitle}
							</div>
						)}

						<div className="todo-item__actions">
							{isEditing ? (
								<>
									<Button
										onClick={() =>
											onTodoDescriptionEditSave(id)
										}
										className="todo-item__button">
										<FontAwesomeIcon
											className="todo-item__icon"
											icon={faFloppyDisk}
										/>
									</Button>

									<Button
										onClick={() => {
											onTodoDescriptionEditCancel(id);
										}}
										className="todo-item__button">
										<FontAwesomeIcon
											className="todo-item__icon"
											icon={faShareFromSquare}
										/>
									</Button>
								</>
							) : (
								<>
									<Button
										onClick={() => onTodoDescriptionEdit()}
										className="todo-item__button">
										<FontAwesomeIcon
											className="todo-item__icon"
											icon={faPenToSquare}
										/>
									</Button>

									<Button
										onClick={() => {
											onTodoDelete(id);
										}}
										className="todo-item__button">
										<FontAwesomeIcon
											className="todo-item__icon todo-item__icon--delete"
											icon={faTrash}
										/>
									</Button>
								</>
							)}
						</div>
					</li>

					<Button
						onClick={() => navigate(-1)}
						className="todo-item__button">
						<FontAwesomeIcon
							className="todo-item__icon"
							icon={faShareFromSquare}
							rotation={180}
							size={'2x'}
						/>
					</Button>
				</>
			)}
		</ul>
	);
};
