import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import './header.css';

export function Header() {
	return (
		<header className="header">
			<FontAwesomeIcon
				className="header__icon"
				icon={faRectangleList}
				size={'2x'}
			/>
			<h1 className="header__title">Todo List Application</h1>
		</header>
	);
}
