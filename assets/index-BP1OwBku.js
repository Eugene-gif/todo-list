(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const S=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})();function _(n,c="text",a=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${a?" search":""}"
			placeholder="${n}"
			name="${c}">
		${a?S:""}
  </div>
	`}function x(n="Text",c="button"){return`
		<button class="button" type="${c}">${n}</button>
	`}function C(){let n=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo-add"),a=document.querySelector(".todo__count-reset"),i=document.querySelector(".todo__list"),o=document.querySelector(".todo__count-value span"),r=document.querySelector(".input__field.search"),u=e=>{const t=document.createElement("li");t.classList.add("todo__item"),t.dataset.id=e.id;const s=document.createElement("label");s.classList.add("todo__item-checkbox");const l=s.appendChild(document.createElement("input"));l.type="checkbox",e.completed&&(l.checked=!0);const p=s.appendChild(document.createElement("span"));p.textContent=e.value;const d=document.createElement("button");d.classList.add("todo__item-delete"),d.type="button",d.textContent="✖",t.replaceChildren(s,d),i.append(t)},f=e=>{i.replaceChildren(),e.length&&e.forEach(t=>{u(t)})},h=()=>{localStorage.setItem("tasks",JSON.stringify(n))},m=()=>{o.textContent=n.length},v=e=>{if(e.preventDefault(),!c.task.value)return!1;const t={id:crypto.randomUUID(),value:c.task.value,completed:!1};u(t),n.push(t),h(),m(),c.reset()},g=e=>{e.preventDefault();const t=e.target.classList.contains("todo__item-delete"),s=!!e.target.closest(".todo__item-checkbox");if(!t&&!s)return!1;const l=e.target.closest(".todo__item").dataset.id,p=i.querySelector(`[data-id="${l}"]`);if(t&&(p.remove(),n=n.filter(d=>d.id!==l)),s){const d=p.querySelector(".todo__item-checkbox input"),L=n.find(k=>k.id===l);d.checked=!d.checked,L.completed=d.checked}h(),m()},b=()=>{localStorage.removeItem("tasks"),n=[],i.replaceChildren(),m()},y=((e,t=300)=>{let s;return(...l)=>{clearTimeout(s),s=setTimeout(()=>{e(...l)},t)}})(e=>{const t=n.filter(s=>s.value.trim().toLowerCase().includes(e.toLowerCase()));console.log("Рендерим по запросу:",e),f(t)},500);f(n),m(),r.addEventListener("input",e=>{let t=e.target.value.trim();if(console.log(t),t===""){f(n);return}y(t)}),c.addEventListener("submit",v),a.addEventListener("click",b),i.addEventListener("click",g)}),`
	<div class="todo">
		<h2 class="todo__title">To Do List</h2>
		<form id="todo-add" class="todo__add">
			${_("Добавить задачу","task")}
			${x("Add","submit")}
		</form>
		${_("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			<div class="todo__count-reset" tabindex="0">Очистить всё</div>
		</div>
		<ul class="todo__list">
		</ul>
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${C()}
  </div>
`;
