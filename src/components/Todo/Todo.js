import './Todo.css';
import './Item.css';
import './Checkbox.css';
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
		let isEditing = false;

		const todoModal = root.querySelector('#todo-modal');
		const todoModalBtnOk = todoModal.querySelector('.btn-modal-ok');
		const todoModalBtnClose = todoModal.querySelector('.btn-modal-close');

		const renderElement = (item) => {
			const li = document.createElement('li');
			li.classList.add('todo__item', 'item');
			li.dataset.id = item.id;

			const checkbox = li.appendChild(document.createElement('div'));
			checkbox.classList.add('checkbox', 'item__checkbox');

			const input = checkbox.appendChild(document.createElement('input'));
			input.type = 'checkbox';
			input.id = item.id;
			item.completed ? input.checked = true : '';
			input.classList.add('checkbox__input');

			const label = checkbox.appendChild(document.createElement('label'));
			label.for = item.id;
			label.classList.add('checkbox__label');

			const box = label.appendChild(document.createElement('div'));
			box.classList.add('checkbox__box');

			const icon = box.appendChild(document.createElement('div'));
			icon.classList.add('checkbox__icon');
			icon.textContent = '✔';

			const text = checkbox.appendChild(document.createElement('p'));
			text.classList.add('checkbox__text', 'item__text');
			text.textContent = item.value;

			const btnRemove = li.appendChild(document.createElement('button'));
			btnRemove.classList.add('button', 'btn-delete-task', 'item__button-delete');
			btnRemove.type = "button";
			btnRemove.textContent = "✖";

			li.replaceChildren(checkbox, btnRemove);
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
			const isCheckbox = !!evt.target.closest('.checkbox__label');
			const isText = !!evt.target.closest('.checkbox__text');

			if (!isDelete && !isCheckbox && !isText) return false;

			const id = evt.target.closest('.todo__item').dataset.id;
			const item = list.querySelector(`[data-id="${id}"]`);
			const dataItem = tasks.find((el) => el.id === id);

			if (isDelete) {
				item.classList.add('is-disappearing');
				setTimeout(() => {
					item.remove();
					tasks = tasks.filter(el => el.id !== id);
					if (tasks.length === 0) hideList();
				}, 300);
			}

			if (isCheckbox) {
				const checkbox = item.querySelector('.checkbox__input');
				checkbox.checked = !checkbox.checked;
				dataItem.completed = checkbox.checked;
			}

			if (isText && !isEditing) {
				const view = evt.target.closest('.checkbox__text');
				const area = document.createElement("textarea");
				area.classList.add('checkbox__textarea');
				area.value = view.innerHTML;
				view.replaceWith(area);
				area.focus();
				isEditing = true;

				area.onkeydown = (e) => {
					if (e.key === "Enter" && e.shiftKey) return;
					if (e.key === "Enter") area.blur();
				};

				area.onblur = () => {
					view.innerHTML = area.value;
					dataItem.value = area.value;
					area.replaceWith(view);
					isEditing = false;
					saveToStorage();
				}
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