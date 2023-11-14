import './input.css';
export const Input = ({ children, value, onChange, placeholder }) => {
	return (
		<div className="input-block">
			<input
				className="input-block__input"
				type="text"
				placeholder={placeholder || 'Write item...'}
				value={value}
				onChange={onChange}
			/>
			{children}
		</div>
	);
};
