import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FieldElementTodo } from './components/field-element-todo/field-element-todo';
import { InputCreatingTodo } from './components/input-creating-todo/input-creating-todo';
import { InputSearchTodo } from './components/input-search-todo/input-search-todo';
import { Spinner } from './components/spinner/spinner';

import { useEffect, useState } from 'react';

function App() {
	const [addTodoFlag, setAddTodoFlag] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [toDoList, setToDoList] = useState([]);
	const [originalToDoList, setOriginalToDoList] = useState([]);
	const [isSorted, setIsSorted] = useState(false);
	const changeTodoFlag = () => setAddTodoFlag(!addTodoFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/myTodo')
			.then((loadedDate) => loadedDate.json())
			.then((loadedTodoList) => {
				setToDoList(loadedTodoList);
				setOriginalToDoList(loadedTodoList);
				console.log(loadedTodoList);
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false));
	}, [addTodoFlag]);

	const toggleSort = () => {
		if (!isSorted) {
			const sortedList = [...toDoList].sort((a, b) =>
				a.todo.localeCompare(b.todo),
			);
			setToDoList(sortedList);
		} else {
			setToDoList(originalToDoList);
		}
		setIsSorted(!isSorted);
	};

	const debounce = (func, debounceTime) => {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(...args);
			}, debounceTime);
		};
	};

	// Функция поиска
	const searchTodoList = (event) => {
		const searchQuery = event.target.value;
		if (!searchQuery.trim()) {
			// Если поисковой запрос пуст, возвращаем оригинальный список
			setToDoList(originalToDoList);
		} else {
			// Фильтруем список по запросу
			const filteredList = originalToDoList.filter((todo) =>
				todo.todo.toLowerCase().includes(searchQuery.toLowerCase()),
			);
			setToDoList(filteredList);
		}
	};

	// Создаём дебаунсированную версию функции поиска
	const debouncedSearch = debounce(searchTodoList, 500);

	return (
		<div className="app">
			<main className="app__main">
				<h1 className="app__title">Todo List Application</h1>
				<InputSearchTodo
					searchTodoList={debouncedSearch}
					toggleSort={toggleSort}
					isSorted={isSorted}
				/>

				<InputCreatingTodo changeTodoFlag={changeTodoFlag} />

				<ul className="app__list fa-ul">
					{toDoList.map(({ id, todo, isDone }) => (
						<FieldElementTodo
							key={id}
							id={id}
							todo={todo}
							isDone={isDone}
							changeTodoFlag={changeTodoFlag}
						/>
					))}
				</ul>

				<Spinner isLoading={isLoading} />
			</main>
		</div>
	);
}

export default App;
