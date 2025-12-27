(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function u(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=u(t);fetch(t.href,s)}})();const C=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})();function y(e,c="text",u=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${u?" search":""}"
			placeholder="${e}"
			name="${c}">
		${u?C:""}
  </div>
	`}function E(e="Text",c="button"){return`
		<button class="button" type="${c}">${e}</button>
	`}function I(){let e=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo-add"),u=document.querySelector(".todo__count-reset"),r=document.querySelector(".todo__list"),t=document.querySelector(".todo__count-value span"),s=document.querySelector(".input__field.search"),a=document.querySelector(".todo__list-empty"),_=o=>{const n=document.createElement("li");n.classList.add("todo__item"),n.dataset.id=o.id;const d=document.createElement("label");d.classList.add("todo__item-checkbox");const l=d.appendChild(document.createElement("input"));l.type="checkbox",o.completed&&(l.checked=!0);const f=d.appendChild(document.createElement("span"));f.textContent=o.value;const i=document.createElement("button");i.classList.add("todo__item-delete"),i.type="button",i.textContent="✖",n.replaceChildren(d,i),r.append(n)},m=(o="Список пуст")=>{r.classList.add("--hide"),a.classList.remove("--hide"),a.textContent=o},v=()=>{r.classList.remove("--hide"),a.classList.add("--hide")},h=o=>{r.replaceChildren(),v(),o.length?o.forEach(n=>{_(n)}):m()},g=()=>{localStorage.setItem("tasks",JSON.stringify(e))},p=()=>{t.textContent=e.length},L=o=>{if(o.preventDefault(),!c.task.value)return!1;const n={id:crypto.randomUUID(),value:c.task.value,completed:!1};e.length===0&&v(),_(n),e.push(n),g(),p(),c.reset()},b=o=>{o.preventDefault();const n=o.target.classList.contains("todo__item-delete"),d=!!o.target.closest(".todo__item-checkbox");if(!n&&!d)return!1;const l=o.target.closest(".todo__item").dataset.id,f=r.querySelector(`[data-id="${l}"]`);if(n&&(f.remove(),e=e.filter(i=>i.id!==l),e.length===0&&m()),d){const i=f.querySelector(".todo__item-checkbox input"),S=e.find(x=>x.id===l);i.checked=!i.checked,S.completed=i.checked}g(),p()},k=()=>{localStorage.removeItem("tasks"),e=[],r.replaceChildren(),p(),m()};h(e),p(),s.addEventListener("input",o=>{let n=o.target.value.trim();if(n.length===0){h(e);return}const d=e.filter(l=>l.value.trim().toLowerCase().includes(n.toLowerCase()));if(!d.length&&n.length){m(`По запросу "${n}" ничего не найдено`);return}h(d)}),c.addEventListener("submit",L),u.addEventListener("click",k),r.addEventListener("click",b)}),`
	<div class="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${y("Добавить задачу","task")}
			${E("Add","submit")}
		</form>
		${y("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			<div class="todo__count-reset" tabindex="0">Очистить всё</div>
		</div>
		<ul class="todo__list">
		</ul>
		<div class="todo__list-empty">Список пуст</div>
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${I()}
  </div>
`;
