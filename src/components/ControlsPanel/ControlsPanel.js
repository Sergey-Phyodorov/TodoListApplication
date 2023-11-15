import './controls-panel.css';
import { ItemsSearch } from '../ItemsSearch/ItemsSearch';
import { ItemsSort } from '../ItemsSort/ItemsSort';
import { Input } from '../../ui/Input/Input';
import {
	faSquarePlus,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../ui/Button/Button';

export function ControlsPanel({ onTodoTitleAdd }) {
	return (
		<div>
			{/*<div style={{ display: 'flex' }}>*/}
			{/*	<ItemsSearch />*/}
			{/*	<ItemsSort />*/}
			{/*</div>*/}
			<Input>
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					className="items-block__icon"
					// TODO: сделать анимацию
					// beatFade={flag ? false : true}
				/>

				<Button onClick={onTodoTitleAdd}>
					<FontAwesomeIcon size="xl" icon={faSquarePlus} />
				</Button>
			</Input>
		</div>
	);
}
