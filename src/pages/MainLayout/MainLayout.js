import './main-layout.css';
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
	return (
		<>
			<div className="main-layout">
				<main className="main-layout__main">
					<Header />
					<Outlet />
				</main>
			</div>
		</>
	);
};
