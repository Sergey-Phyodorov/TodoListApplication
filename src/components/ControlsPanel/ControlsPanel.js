import './controls-panel.css';

import { useContext } from 'react';
import { TodoListContext } from '../../context/todo-list-context';

import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSquarePlus,
	faMagnifyingGlass,
	faArrowDownUpAcrossLine,
} from '@fortawesome/free-solid-svg-icons';
import { addTodo } from '../../utilities/add-todo';
import { useSelector } from 'react-redux';
import { selectTodoList } from '../../redux/selectors/selectTodoList';

export function ControlsPanel() {
	const { todoList2, setTodoList, isDisabledButton } =
		useContext(TodoListContext);
	console.log(isDisabledButton);

	const todoList = useSelector(selectTodoList);
	console.log(todoList);
	const onTodoTitleAdd = () => {
		console.log('onTodoTitleAdd');
		setTodoList(addTodo(todoList));
		console.log(todoList);
	};
	return (
		<div>
			<Input isDisabledInput={isDisabledButton}>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					className="items-block__icon"
					// TODO: сделать анимацию
					// beatFade={flag ? false : true}
				/>

				<Button
					isDisabledButton={isDisabledButton}
					onClick={onTodoTitleAdd}>
					<FontAwesomeIcon size="xl" icon={faSquarePlus} />
				</Button>

				<Button isDisabledButton={isDisabledButton}>
					<FontAwesomeIcon
						size="lg"
						className="items-sort__icon items-sort__icon--across-line"
						icon={faArrowDownUpAcrossLine}
					/>
					{/*<FontAwesomeIcon*/}
					{/*	className="items-sort__icon items-sort__icon--az"*/}
					{/*	icon={faArrowDownAZ}*/}
					{/*/>*/}
					{/*<FontAwesomeIcon*/}
					{/*	className="items-sort__icon items-sort__icon--za"*/}
					{/*	icon={faArrowUpZA}*/}
					{/*/>*/}
				</Button>
			</Input>
		</div>
	);
}
