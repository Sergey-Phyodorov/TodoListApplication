import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDownAZ,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import './input-search-todo.css';

export function InputSearchTodo({ searchTodoList, isSorted, toggleSort }) {
	return (
		<div className="search-todo">
			<input
				className="search-todo__input"
				style={{ width: '100%' }}
				type="text"
				placeholder="Search by phrase"
				onChange={(event) => searchTodoList(event)}
			/>

			<FontAwesomeIcon
				className="search-todo__icon"
				icon={faMagnifyingGlass}
			/>

			<FontAwesomeIcon
				onClick={toggleSort}
				className={`sort-todo__icon  sort-todo__icon--hover  
				${isSorted ? 'sort-todo__icon--active' : ''}`}
				icon={faArrowDownAZ}
			/>
		</div>
	);
}
