import './Todo.css';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';

export function Todo() {
	let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

	document.addEventListener('DOMContentLoaded', () => {
		const root = document.getElementById('todo');
		const formAdd = root.querySelector('#todo-add');
		const inputSearch = root.querySelector('.input__field.search');
		const resetAll = root.querySelector('.btn-delete-all');
		const list = root.querySelector('.todo__list');
		const count = root.querySelector('.todo__count-value span');
		const messsageEmptyList = root.querySelector('.todo__list-empty');
		let timeoutId = null;

		const renderElement = (item) => {
			const li = document.createElement('li');
			li.classList.add('todo__item');
			li.dataset.id = item.id;

			const label = document.createElement('label');
			label.classList.add('todo__item-checkbox');

			const checkbox = label.appendChild(document.createElement('input'));
			checkbox.type = "checkbox";
			item.completed ? checkbox.checked = true : '';

			const text = label.appendChild(document.createElement('span'));
			text.textContent = item.value;

			const btnRemove = document.createElement('button');
			btnRemove.classList.add('button', 'btn-delete-task');
			btnRemove.type = "button";
			btnRemove.textContent = "✖";

			li.replaceChildren(label, btnRemove);
			list.append(li);
		}

		const hideList = (message = 'Список пуст') => {
			list.classList.add('--hide');
			messsageEmptyList.classList.remove('--hide');
			messsageEmptyList.textContent = message;
		}

		const showList = () => {
			list.classList.remove('--hide');
			messsageEmptyList.classList.add('--hide');
		}

		const renderList = (tasks) => {
			list.replaceChildren();
			showList();

			if (tasks.length) {
				tasks.forEach((item) => {
					renderElement(item);
				});
			} else {
				hideList();
			}
		}

		const saveToStorage = () => {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}

		const updateCount = () => {
			count.textContent = tasks.length;
		}

		const addItem = (evt) => {
			evt.preventDefault();
			if (!formAdd.task.value) return false;

			const item = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				value: formAdd.task.value,
				completed: false,
			};

			if (tasks.length === 0) showList();

			renderElement(item);
			tasks.push(item);
			saveToStorage();
			updateCount();
			formAdd.reset();
			formAdd.task.focus();
		}

		const actionItem = (evt) => {
			evt.preventDefault();
			const isDelete = evt.target.classList.contains('btn-delete-task');
			const isCheckbox = !!evt.target.closest('.todo__item-checkbox');
			if (!isDelete && !isCheckbox) return false;

			const id = evt.target.closest('.todo__item').dataset.id;
			const item = list.querySelector(`[data-id="${id}"]`);

			if (isDelete) {
				item.classList.add('is-disappearing');
				setTimeout(() => {
					item.remove();
					tasks = tasks.filter(el => el.id !== id);
					if (tasks.length === 0) hideList();
				}, 300);
			}

			if (isCheckbox) {
				const checkbox = item.querySelector('.todo__item-checkbox input');
				const el = tasks.find((el) => el.id === id);
				checkbox.checked = !checkbox.checked;
				el.completed = checkbox.checked;
			}

			setTimeout(() => {
				saveToStorage();
				updateCount();
			}, 310);
		}

		const removeAll = () => {
			localStorage.removeItem('tasks');
			tasks = [];
			list.replaceChildren();
			updateCount();
			hideList();
		}

		renderList(tasks);
		updateCount();

		inputSearch.addEventListener('input', (evt) => {
			let query = evt.target.value.trim().toLowerCase();
			clearTimeout(timeoutId);

			if (query.length === 0) {
				renderList(tasks); // сразу
				return;
			}

			const filteredTasks = tasks.filter(el => el.value.trim().toLowerCase().includes(query));

			timeoutId = setTimeout(() => {
				if (!filteredTasks.length && query.length) {
					hideList(`По запросу "${query}" ничего не найдено`);
					return;
				}

				renderList(filteredTasks);
			}, 500);
		});

		formAdd.addEventListener('submit', addItem);
		resetAll.addEventListener('click', removeAll);
		list.addEventListener('click', actionItem);
	});

	return `
	<div class="todo" id="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${Input('Добавить задачу', 'task')}
			${Button('Add', 'btn-add-task', 'submit')}
		</form>
		${Input('Поиск', 'search', true)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			${Button('Oчистить всё', 'btn-delete-all')}
		</div>
		<ul class="todo__list"></ul>
		<div class="todo__list-empty">Список пуст</div>
		<!--<button onclick="window['todo-modal'].showModal()">Open</button>
		<dialog id="todo-modal">
			<button onclick="window['todo-modal'].close()">Close</button>
		</dialog>-->
	</div>`;
}