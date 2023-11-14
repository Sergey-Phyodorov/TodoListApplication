import './button.css';
export const Button = ({ children, onClick, isDisabledButton }) => {
	return (
		<button disabled={isDisabledButton} onClick={onClick}>
			{children}
		</button>
	);
};
