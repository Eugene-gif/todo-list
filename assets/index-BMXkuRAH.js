(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))m(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&m(a)}).observe(document,{childList:!0,subtree:!0});function d(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(o){if(o.ep)return;o.ep=!0;const t=d(o);fetch(o.href,t)}})();const $=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})();function L(e,c="text",d=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${d?" search":""}"
			placeholder="${e}"
			name="${c}">
		${d?$:""}
  </div>
	`}function k(e="Text",c="",d="button"){return`
		<button class="button${c?" "+c:""}" type="${d}">${e}</button>
	`}function I(){let e=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo"),d=c.querySelector("#todo-add"),m=c.querySelector(".input__field.search"),o=c.querySelector(".btn-delete-all"),t=c.querySelector(".todo__list"),a=c.querySelector(".todo__count-value span"),h=c.querySelector(".todo__list-empty");let v=null;const _=n=>{const s=document.createElement("li");s.classList.add("todo__item"),s.dataset.id=n.id;const i=document.createElement("label");i.classList.add("todo__item-checkbox");const l=i.appendChild(document.createElement("input"));l.type="checkbox",n.completed&&(l.checked=!0);const u=i.appendChild(document.createElement("span"));u.textContent=n.value;const r=document.createElement("button");r.classList.add("button","btn-delete-task"),r.type="button",r.textContent="✖",s.replaceChildren(i,r),t.append(s)},p=(n="Список пуст")=>{t.classList.add("--hide"),h.classList.remove("--hide"),h.textContent=n},b=()=>{t.classList.remove("--hide"),h.classList.add("--hide")},g=n=>{t.replaceChildren(),b(),n.length?n.forEach(s=>{_(s)}):p()},y=()=>{localStorage.setItem("tasks",JSON.stringify(e))},f=()=>{a.textContent=e.length},S=n=>{if(n.preventDefault(),!d.task.value)return!1;const s={id:crypto?.randomUUID()??Date.now().toString(),value:d.task.value,completed:!1};e.length===0&&b(),_(s),e.push(s),y(),f(),d.reset(),d.task.focus()},w=n=>{n.preventDefault();const s=n.target.classList.contains("btn-delete-task"),i=!!n.target.closest(".todo__item-checkbox");if(!s&&!i)return!1;const l=n.target.closest(".todo__item").dataset.id,u=t.querySelector(`[data-id="${l}"]`);if(s&&(u.classList.add("is-disappearing"),setTimeout(()=>{u.remove(),e=e.filter(r=>r.id!==l),e.length===0&&p()},300)),i){const r=u.querySelector(".todo__item-checkbox input"),C=e.find(E=>E.id===l);r.checked=!r.checked,C.completed=r.checked}setTimeout(()=>{y(),f()},310)},x=()=>{localStorage.removeItem("tasks"),e=[],t.replaceChildren(),f(),p()};g(e),f(),m.addEventListener("input",n=>{let s=n.target.value.trim().toLowerCase();if(clearTimeout(v),s.length===0){g(e);return}const i=e.filter(l=>l.value.trim().toLowerCase().includes(s));v=setTimeout(()=>{if(!i.length&&s.length){p(`По запросу "${s}" ничего не найдено`);return}g(i)},500)}),d.addEventListener("submit",S),o.addEventListener("click",x),t.addEventListener("click",w)}),`
	<div class="todo" id="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${L("Добавить задачу","task")}
			${k("Add","btn-add-task","submit")}
		</form>
		${L("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			${k("Oчистить всё","btn-delete-all")}
		</div>
		<ul class="todo__list"></ul>
		<div class="todo__list-empty">Список пуст</div>
		<!--<button onclick="window['todo-modal'].showModal()">Open</button>
		<dialog id="todo-modal">
			<button onclick="window['todo-modal'].close()">Close</button>
		</dialog>-->
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${I()}
  </div>
`;
