import './Todo.css';
import './Modal.css';
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

		const todoModal = root.querySelector('#todo-modal');
		const todoModalBtnOk = todoModal.querySelector('.btn-modal-ok');
		const todoModalBtnClose = todoModal.querySelector('.btn-modal-close');

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
			if (!tasks.length) resetAll.classList.add('--hide');
			else resetAll.classList.remove('--hide');
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

		const animateCloseModal = () => {
			todoModal.classList.add('close');
			setTimeout(() => todoModal.close(), 500);
		}

		renderList(tasks);
		updateCount();

		// Слушатели событий
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

		list.addEventListener('click', actionItem);

		resetAll.addEventListener('click', () => {
			todoModal.classList.remove('close');
			todoModal.showModal();
		});

		todoModalBtnOk.addEventListener('click', () => {
			removeAll();
			animateCloseModal();
		});

		todoModalBtnClose.addEventListener('click', () => {
			animateCloseModal();
		});

		// Закрытие по клику на backdrop (вне .panel)
		todoModal.addEventListener("click", (e) => {
			e.preventDefault();
			const panel = todoModal.querySelector(".panel");
			const clickedInside = panel.contains(e.target);
			if (!clickedInside) animateCloseModal();
		});

		document.addEventListener("keydown", (evt) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				animateCloseModal();
			}
		})
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
		<dialog id="todo-modal">
			<div class="panel">
				<p class="text">Удалить все задачи?</p>
				<div class="actions">
					${Button('Ок', 'btn-modal-ok')}
					${Button('Отмена', 'btn-modal-close')}
				</div>
			</div>
		</dialog>
	</div>`;
}