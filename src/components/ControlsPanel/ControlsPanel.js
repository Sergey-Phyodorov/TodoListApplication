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

export function ControlsPanel({ onTodoTitleAdd }) {
	const { isDisabledButton } = useContext(TodoListContext);

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
