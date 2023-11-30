import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

import { ItemCardPage } from './pages/ItemCardPage/ItemCardPage';
import { MainLayout } from './pages/MainLayout/MainLayout';

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="todo/:idTodoPage" element={<ItemCardPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
