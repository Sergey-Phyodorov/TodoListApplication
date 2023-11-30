export const getDescriptionTodo = (id) => {
	return {
		type: 'GET_DESCRIPTION_TODO',
		payload: id,
	};
};
