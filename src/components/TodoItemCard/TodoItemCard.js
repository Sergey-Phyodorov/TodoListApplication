import { useContext, useState } from 'react';
import '../TodoItem/todo-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faFloppyDisk,
	faShareFromSquare,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../ui/Button/Button';
import { TodoListContext } from '../../context/todo-list-context';
import { useNavigate, useParams } from 'react-router-dom';
import { findTodo } from '../../utilities/find-todo';
import { deleteTodo, updateTodo } from '../../api/api';
import { setTodo } from '../../utilities/set-todo';
import { removeTodo } from '../../utilities/remove-todo';

export const TodoItemCard = () => {
	const navigate = useNavigate();
	const { todoList, setTodoList } = useContext(TodoListContext);

	const { idTodoPage } = useParams();

	const { todoTitle, isDone, id } =
		findTodo(todoList, Number(idTodoPage)) || {};

	const [todoDescription, setTodoDescription] = useState(todoTitle);
	const [todoDescriptionIsEditCancel, setTodoDescriptionIsEditCancel] =
		useState(todoDescription);
	const [isEditing, setIsEditing] = useState(false);

	const onTodoDescriptionEdit = (id) => {
		const { todoTitle } = findTodo(todoList, id);
		setTodoDescriptionIsEditCancel(todoTitle);
		setIsEditing(!isEditing);
	};
	const onTodoDescriptionEditChange = (id, changDescription) => {
		setTodoDescription(changDescription);
	};
	const onTodoDescriptionEditCancel = () => {
		setTodoDescription(todoDescriptionIsEditCancel);
		setIsEditing(!isEditing);
	};
	const onTodoDescriptionEditSave = (idTodo) => {
		updateTodo(idTodo, { todoTitle: todoDescription });
		setTodoList(
			setTodo(todoList, {
				id: idTodo,
				todoTitle: todoDescription,
			}),
		);

		setIsEditing(!isEditing);
	};
	const onTodoDelete = (id) => {
		if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
			deleteTodo(id).then(() => {
				setTodoList(removeTodo(todoList, id));
			});
			navigate('/');
		}
	};

	return (
		<ul className="app__list">
			{todoDescription === undefined ? (
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
								value={todoDescription}
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
								{todoDescription}
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
											onTodoDescriptionEditCancel();
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
										onClick={() =>
											onTodoDescriptionEdit(id)
										}
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
