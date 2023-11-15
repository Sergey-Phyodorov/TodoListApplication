const fetchServer = (method, { id, ...payload } = {}) => {
	let url = 'http://localhost:3005/myTodo';
	let options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (method !== 'GET' && method !== 'POST') {
		url += `/${id}`;
	}

	if (method !== 'GET' && method !== 'DELETE') {
		options.body = JSON.stringify(payload);
	}

	return fetch(url, options).then((jsonData) => jsonData.json());
};

export const createTodo = (newTodo) => {
	const { isEditing, isDisabledButton, id, ...rest } = newTodo;
	return fetchServer('POST', { ...rest });
};

export const readTodo = () => fetchServer('GET');

export const updateTodo = (id, updatedTodo) => {
	const { isEditing, isDisabledButton, ...rest } = updatedTodo;
	return fetchServer('PATCH', { id, ...rest });
};

export const deleteTodo = (idTodo) => fetchServer('DELETE', { id: idTodo });
