import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowDownUpAcrossLine,
	faArrowDownAZ,
	faArrowUpZA,
} from '@fortawesome/free-solid-svg-icons';

import './items-sort.css';

export const ItemsSort = () => {
	const [isSortingEnabled, setIsSortingEnabled] = useState(false);
	const onSortingChange = () => {
		setIsSortingEnabled(!isSortingEnabled);
		console.log(isSortingEnabled);
	};

	let isSorted = false;

	return (
		<button className="items-sort" onClick={onSortingChange}>
			<FontAwesomeIcon
				className="items-sort__icon items-sort__icon--across-line"
				icon={faArrowDownUpAcrossLine}
			/>
			<FontAwesomeIcon
				className="items-sort__icon items-sort__icon--az"
				icon={faArrowDownAZ}
			/>
			<FontAwesomeIcon
				className="items-sort__icon items-sort__icon--za"
				icon={faArrowUpZA}
			/>
		</button>
	);
};
