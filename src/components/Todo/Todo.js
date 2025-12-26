import './Todo.css';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';

export function Todo() {
	let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

	document.addEventListener('DOMContentLoaded', () => {
		const formAdd = document.getElementById('todo-add');
		const resetAll = document.querySelector('.todo__count-reset');
		const list = document.querySelector('.todo__list');
		const count = document.querySelector('.todo__count-value span');
		const inputSearch = document.querySelector('.input__field.search');

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
			btnRemove.classList.add('todo__item-delete');
			btnRemove.type = "button";
			btnRemove.textContent = "✖";

			li.replaceChildren(label, btnRemove);
			list.append(li);
		}

		const renderList = (tasks) => {
			list.replaceChildren();
			if (tasks.length) {
				tasks.forEach((item) => {
					renderElement(item);
				});
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
				id: crypto.randomUUID(),
				value: formAdd.task.value,
				completed: false,
			};

			renderElement(item);
			tasks.push(item);
			saveToStorage();
			updateCount();
			formAdd.reset();
		}

		const actionItem = (evt) => {
			evt.preventDefault();
			const isDelete = evt.target.classList.contains('todo__item-delete');
			const isCheckbox = !!evt.target.closest('.todo__item-checkbox');
			if (!isDelete && !isCheckbox) return false;

			const id = evt.target.closest('.todo__item').dataset.id;
			const item = list.querySelector(`[data-id="${id}"]`);

			if (isDelete) {
				item.remove();
				tasks = tasks.filter(el => el.id !== id);
			}

			if (isCheckbox) {
				const checkbox = item.querySelector('.todo__item-checkbox input');
				const el = tasks.find((el) => el.id === id);
				checkbox.checked = !checkbox.checked;
				el.completed = checkbox.checked;
			}

			saveToStorage();
			updateCount();
		}

		const removeAll = () => {
			localStorage.removeItem('tasks');
			tasks = [];
			list.replaceChildren();
			updateCount();
		}


		// "Тяжёлая" функция: фильтрация + перерендер
		const renderFilteredList = (query) => {
			const newArr = tasks.filter((el) => {
				return el.value.trim().toLowerCase().includes(query.toLowerCase())
			});
			
			console.log("Рендерим по запросу:", query);
			renderList(newArr);
		}

		// Реализация debounce
		const debounce = (fn, ms = 300) => {
			let timerId;

			return (...args) => {
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					fn(...args);
				}, ms);
			}
		}

		// делаем "заторможенную" версию
		const renderDebounced = debounce(renderFilteredList, 500);

		renderList(tasks);
		updateCount();

		inputSearch.addEventListener('input', (evt) => {
			let query = evt.target.value.trim();
			console.log(query);

			if (query === "") {
				renderList(tasks); // сразу
				return;
			}


			renderDebounced(query);
		});

		formAdd.addEventListener('submit', addItem);
		resetAll.addEventListener('click', removeAll);
		list.addEventListener('click', actionItem);
	});

	return `
	<div class="todo">
		<h2 class="todo__title">To Do List</h2>
		<form id="todo-add" class="todo__add">
			${Input('Добавить задачу', 'task')}
			${Button('Add', 'submit')}
		</form>
		${Input('Поиск', 'search', true)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			<div class="todo__count-reset" tabindex="0">Очистить всё</div>
		</div>
		<ul class="todo__list">
		</ul>
	</div>`;
}