import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './spinner.css';

export function Spinner({ isLoading }) {
	return (
		<div className={isLoading ? 'loader loader--visible' : 'loader'}>
			<FontAwesomeIcon icon={faSpinner} size={'4x'} spinPulse />
		</div>
	);
}
