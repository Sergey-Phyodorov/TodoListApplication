import { useContext } from 'react';
import './todo-item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckSquare,
	faSquare,
	faPenToSquare,
	faFloppyDisk,
	faShareFromSquare,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../ui/Button/Button';
import { TodoListContext } from '../../context/todo-list-context';

export const TodoItem = ({
	id,
	todoTitle,
	isDone,
	isEditing,
	isDisabledButton,
}) => {
	const {
		onTodoTitleEdit,
		onTodoTitleChange,
		onTodoTitleCancel,
		onTodoTitleSave,
		onTodoTitleDelete,
		onTodoTitleIsDone,
	} = useContext(TodoListContext);

	return (
		<li className={`todo-item ${isDone ? 'todo-item--done' : ''}`}>
			<Button
				isDisabledButton={isDisabledButton}
				onClick={() => onTodoTitleIsDone(id)}>
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
						onTodoTitleChange(id, target.value)
					}
					// onKeyDown={}
				/>
			) : (
				<div
					onDoubleClick={
						!isDisabledButton ? () => onTodoTitleEdit(id) : null
					}
					className="todo-item__text">
					{todoTitle}
				</div>
			)}

			<div className="todo-item__actions">
				{isEditing ? (
					<>
						<Button
							onClick={() => onTodoTitleSave(id)}
							className="todo-item__button">
							<FontAwesomeIcon
								className="todo-item__icon"
								icon={faFloppyDisk}
							/>
						</Button>

						<Button
							onClick={() => onTodoTitleCancel(id)}
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
							isDisabledButton={isDisabledButton}
							onClick={() => onTodoTitleEdit(id)}
							className="todo-item__button">
							<FontAwesomeIcon
								className="todo-item__icon"
								icon={faPenToSquare}
							/>
						</Button>

						<Button
							isDisabledButton={isDisabledButton}
							onClick={() => onTodoTitleDelete(id)}
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
	);
};
