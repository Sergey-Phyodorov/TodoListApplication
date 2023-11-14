import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './items-search.css';

export const ItemsSearch = () => {
	const [searchingPhrase, setSearchingPhrase] = useState('');

	const onSearchingPhraseChange = (event) => {
		setSearchingPhrase(event.target.value);
	};

	return (
		<div className="items-search">
			<input
				className="items-search__input"
				type="text"
				placeholder="Search..."
				value={searchingPhrase}
				onChange={onSearchingPhraseChange}
			/>
			<FontAwesomeIcon
				className="items-search__icon"
				icon={faMagnifyingGlass}

				// TODO: сделать анимацию
				// beatFade={flag ? false : true}
			/>
		</div>
	);
};
