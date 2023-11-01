import './input-creating-todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function InputCreatingTodo({ changeTodoFlag }) {
	const [textHeight, setTextHeight] = useState('');
	const [textArea, setTextArea] = useState('');

	function requestAddItemTodo(todo) {
		fetch('http://localhost:3005/myTodo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ todo: todo, isDone: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача создана', response);
				changeTodoFlag();
			});
	}

	const handleInput = (event) => {
		setTextHeight(event.target.value);
		event.target.style.height = 'inherit';
		event.target.style.height = `${event.target.scrollHeight}px`;

		setTextArea(event.target.value);
	};

	const handleClick = () => {
		if (textArea.trim() !== '') {
			requestAddItemTodo(textArea.trim());
			setTextArea('');
		}
	};

	return (
		<div className="input-creating-todo">
			{/*<label className="input-creating-todo__label">*/}
			{/*	Add Task to List*/}
			{/*</label>*/}
			<span style={{ display: 'flex', alignItems: 'center' }}>
				<textarea
					value={textArea}
					onInput={handleInput}
					className="input-creating-todo__textarea"
					rows="1"
					placeholder="Enter a description of the task"></textarea>

				<FontAwesomeIcon
					className="input-creating-todo__add-icon 
					input-creating-todo__add-icon--hover"
					icon={faPlus}
					onClick={handleClick}
				/>
			</span>
		</div>
	);
}
