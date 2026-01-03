import './Input.css';
import IconSearch from '@/assets/IconSearch.js';
import IconClear from '@/assets/IconClear.js';
export function Input(placeholder, name='text', isSearch = false) {
	return `
	<div class="todo__input input">
    <input type="text" 
			class="input__field${isSearch ? ' search' : ''}"
			placeholder="${placeholder}"
			name="${name}">
		${(isSearch ? IconSearch : '')}
		${(isSearch ? IconClear : '')}
  </div>
	`;
};