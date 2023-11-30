import { Routes, Route } from 'react-router-dom';
import { readTodo } from './api/api';

import { useEffect, useState } from 'react';

import { TodoListContext } from './context/todo-list-context';

import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { ItemCardPage } from './pages/ItemCardPage/ItemCardPage';
import { MainLayout } from './pages/MainLayout/MainLayout';

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
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="todo/:idTodoPage" element={<ItemCardPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</TodoListContext.Provider>
	);
}

export default App;
