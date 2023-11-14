import './App.css';
import { readTodo, updateTodo, deleteTodo, createTodo } from './api/api';

import { setTodo } from './utilities/set-todo';
import { removeTodo } from './utilities/remove-todo';
import { findTodo } from './utilities/find-todo';
import { addTodo } from './utilities/add-todo';

import { TodoListItems } from './components/TodoListItems/TodoListItems';

import { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { ControlsPanel } from './components/ControlsPanel/ControlsPanel';
import { TodoListContext } from './context/todo-list-context';
import { NEW_TODO_ID } from './constants/new-todo-id';

function App() {
	const [todoList, setTodoList] = useState([]);
	const [todoListCanselEdit, setTodoListCanselEdit] = useState(todoList);

	useEffect(() => {
		readTodo().then((loadedTodoList) => setTodoList(loadedTodoList));
	}, []);

	const onTodoTitleAdd = () => {
		setTodoList(addTodo(todoList));
	};
	const onTodoTitleChange = (id, changTitle) => {
		const updatedList = setTodo(todoList, { id, todoTitle: changTitle });
		setTodoList(updatedList);
	};
	const onTodoTitleEdit = (id) => {
		setTodoListCanselEdit(findTodo(todoList, id));
		const updatedList = setTodo(todoList, { id, isEditing: true });
		setTodoList(updatedList);
	};
	const onTodoTitleSave = (idTodo) => {
		const newTodoTitle = findTodo(todoList, idTodo) || {};

		if (idTodo === NEW_TODO_ID) {
			createTodo(newTodoTitle).then((todo) => {
				let updatedList = setTodo(todoList, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedList = removeTodo(updatedList, NEW_TODO_ID);
				updatedList = addTodo(updatedList, todo);
				setTodoList(updatedList);
			});
		} else {
			updateTodo(idTodo, newTodoTitle).then();
			const updatedList = setTodo(todoList, { idTodo, isEditing: false });
			setTodoList(updatedList);
		}
	};
	const onTodoTitleCancel = (id) => {
		const updatedList = setTodo(todoList, {
			id,
			todoTitle: todoListCanselEdit.todoTitle,
			isEditing: false,
		});
		setTodoList(updatedList);
	};
	const onTodoTitleDelete = (id) => {
		if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
			deleteTodo(id).then(() => {
				setTodoList(removeTodo(todoList, id));
			});
		}
	};
	const onTodoTitleIsDone = (id) => {
		const isDone = findTodo(todoList, id).isDone;
		const updatedList = setTodo(todoList, { id, isDone: !isDone });
		updateTodo(id, { isDone: !isDone }).then();
		setTodoList(updatedList);
	};

	return (
		<TodoListContext.Provider
			value={{
				todoList,
				onTodoTitleEdit,
				onTodoTitleChange,
				onTodoTitleCancel,
				onTodoTitleSave,
				onTodoTitleDelete,
				onTodoTitleIsDone,
			}}>
			<div className="app">
				<main className="app__main">
					<Header />
					<ControlsPanel onTodoTitleAdd={onTodoTitleAdd} />
					<TodoListItems />
				</main>
			</div>
		</TodoListContext.Provider>
	);
}

export default App;
