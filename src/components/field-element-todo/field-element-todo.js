import { useEffect, useState } from 'react';
import './field-element-todo.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckSquare,
	faPenToSquare,
	faSquare,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';

export function FieldElementTodo({ id, todo, isDone, changeTodoFlag }) {
	const [isComplete, setIsComplete] = useState(null);
	const [isEdit, setIsEdit] = useState(false);
	const [textArea, setTextArea] = useState(todo);

	useEffect(() => {
		setIsComplete(isDone);
	}, []);

	function handleTextChange(event) {
		setTextArea(event.target.value);
	}

	function requestEditItemTodo(id, todo, isDone) {
		fetch(`http://localhost:3005/myTodo/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ todo: todo, isDone: isDone }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Изменена исправлена id - ${id} `, response);
				changeTodoFlag();
			});
	}

	function requestDeleteItemTodo(id) {
		fetch(`http://localhost:3005/myTodo/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(
					`Задача удален, id - ${id}, ответ от сервера:`,
					response,
				);
				changeTodoFlag();
			});
	}

	return (
		<li className="field-element-todo">
			<span
				onClick={() => {
					if (!isEdit) {
						setIsComplete(!isComplete);
						requestEditItemTodo(id, textArea, !isComplete);
					}
				}}
				className="field-element-todo__check-square-icon
				field-element-todo__check-square-icon--hover">
				{isComplete ? (
					<FontAwesomeIcon icon={faCheckSquare} />
				) : (
					<FontAwesomeIcon icon={faSquare} />
				)}
			</span>
			{isEdit ? (
				<textarea
					className="field-element-todo__textarea"
					rows="5"
					value={textArea}
					onInput={handleTextChange}></textarea>
			) : (
				<span
					className={`field-element-todo__text 
					${isDone ? 'field-element-todo__text--strikethrough' : ''}`}>
					{textArea}
				</span>
			)}
			<span className="field-element-todo__actions">
				<span
					onClick={() => {
						if (!isComplete) {
							setIsEdit(!isEdit);
						}
						if (isEdit) {
							requestEditItemTodo(id, textArea, isComplete);
						}
					}}>
					<FontAwesomeIcon
						className="field-element-todo__edit-icon 
						field-element-todo__edit-icon--hover"
						icon={faPenToSquare}
					/>
				</span>

				<span>
					<FontAwesomeIcon
						className="field-element-todo__delete-icon
						field-element-todo__delete-icon--hover"
						icon={faTrash}
						onClick={() => {
							if (!isEdit) {
								let userConfirmation = window.confirm(
									'Вы уверены что хотите удалить задачу',
								);
								if (userConfirmation) {
									requestDeleteItemTodo(id);
								}
							}
						}}
					/>
				</span>
			</span>
		</li>
	);
}
