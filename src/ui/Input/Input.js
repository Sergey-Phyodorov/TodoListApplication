import './input.css';

export const Input = ({
	children,
	value,
	onChange,
	placeholder,
	isDisabledInput,
}) => {
	return (
		<div className="input-block">
			<input
				disabled={isDisabledInput}
				className="input-block__input"
				type="text"
				placeholder={placeholder || 'Search item...'}
				value={value}
				onChange={onChange}
			/>
			{children}
		</div>
	);
};
