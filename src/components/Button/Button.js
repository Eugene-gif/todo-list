import './Button.css';
export function Button(text = 'Text', type = 'button') {
	return `
		<button class="button" type="${type}">${text}</button>
	`;
};