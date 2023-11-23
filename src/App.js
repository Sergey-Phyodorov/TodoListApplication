import './App.css';
import { Routes, Route } from 'react-router-dom';
import { readTodo } from './api/api';

import { useEffect, useState } from 'react';

import { TodoListContext } from './context/todo-list-context';

import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { Header } from './components/Header/Header';
import { ItemCardPage } from './pages/ItemCardPage/ItemCardPage';

function App() {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		readTodo().then((loadedTodoList) => setTodoList(loadedTodoList));
	}, []);

	return (
		<TodoListContext.Provider
			value={{
				todoList,
				setTodoList,
			}}>
			<div className="app">
				<main className="app__main">
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route
							path="/todo/:idTodoPage"
							element={<ItemCardPage />}
						/>

						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</div>
		</TodoListContext.Provider>
	);
}

export default App;
