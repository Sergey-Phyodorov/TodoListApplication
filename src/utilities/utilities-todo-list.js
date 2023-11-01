export function searchTodoList() {
	const inputSearch = document.querySelector('.search-todo__input');
	const searchValue = inputSearch.value.trim().toLowerCase();
	const list = document.querySelectorAll('.field-element-todo');
	list.forEach((item) => {
		const text = item.querySelector('.field-element-todo__text').innerText;
		if (text.toLowerCase().indexOf(searchValue) === -1) {
			item.style.display = 'none';
		} else {
			item.style.display = 'flex';
		}
	});
}

export function sortTodoList(sortFlag) {
	const todoList = document.querySelectorAll('.field-element-todo');
	const todoListArray = Array.from(todoList);

	todoListArray.sort((a, b) => {
		if (a.textContent > b.textContent) return 1;
		if (a.textContent < b.textContent) return -1;
		return 0;
	});

	if (sortFlag) {
		// changeTodoFlag();
		console.log(
			'sortFlag - ',
			sortFlag,
			'должно все вернуться в исходное состояние',
		);
	} else {
		const ul = document.querySelector('.app__list');
		ul.innerHTML = '';
		todoListArray.forEach((item) => ul.append(item));
	}
}
