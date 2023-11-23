import './home-page.css';
import { TodoListItems } from '../../components/TodoListItems/TodoListItems';
import { ControlsPanel } from '../../components/ControlsPanel/ControlsPanel';

export const HomePage = () => {
	return (
		<>
			<ControlsPanel />
			<TodoListItems />
		</>
	);
};
