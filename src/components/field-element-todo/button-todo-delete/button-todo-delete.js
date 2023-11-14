import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './button-todo-delete.css';
export function ButtonTodoDelete() {
	return (
		<span>
			<FontAwesomeIcon
				className="field-element-todo__delete-icon
						field-element-todo__delete-icon--hover"
				icon={faTrash}
				onClick={() => {
					if (!isEdit) {
						let userConfirmation = window.confirm(
							'Вы уверены что хотите удалить задачу',
						);
						if (userConfirmation) {
							requestDeleteItemTodo(id);
						}
					}
				}}
			/>
		</span>
	);
}
