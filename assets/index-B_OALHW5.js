(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&p(a)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();const O=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})();function S(e,c="text",d=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${d?" search":""}"
			placeholder="${e}"
			name="${c}">
		${d?O:""}
  </div>
	`}function v(e="Text",c="",d="button"){return`
		<button class="button${c?" "+c:""}"
			type="${d}"
		>${e}</button>
	`}function T(){let e=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo"),d=c.querySelector("#todo-add"),p=c.querySelector(".input__field.search"),t=c.querySelector(".btn-delete-all"),o=c.querySelector(".todo__list"),a=c.querySelector(".todo__count-value span"),g=c.querySelector(".todo__list-empty");let y=null;const u=c.querySelector("#todo-modal"),x=u.querySelector(".btn-modal-ok"),E=u.querySelector(".btn-modal-close"),L=s=>{const n=document.createElement("li");n.classList.add("todo__item"),n.dataset.id=s.id;const l=document.createElement("label");l.classList.add("todo__item-checkbox");const r=l.appendChild(document.createElement("input"));r.type="checkbox",s.completed&&(r.checked=!0);const m=l.appendChild(document.createElement("span"));m.textContent=s.value;const i=document.createElement("button");i.classList.add("button","btn-delete-task"),i.type="button",i.textContent="✖",n.replaceChildren(l,i),o.append(n)},f=(s="Список пуст")=>{o.classList.add("--hide"),g.classList.remove("--hide"),g.textContent=s},b=()=>{o.classList.remove("--hide"),g.classList.add("--hide")},_=s=>{o.replaceChildren(),b(),s.length?s.forEach(n=>{L(n)}):f()},k=()=>{localStorage.setItem("tasks",JSON.stringify(e))},h=()=>{a.textContent=e.length,e.length?t.classList.remove("--hide"):t.classList.add("--hide")},C=s=>{if(s.preventDefault(),!d.task.value)return!1;const n={id:crypto?.randomUUID()??Date.now().toString(),value:d.task.value,completed:!1};e.length===0&&b(),L(n),e.push(n),k(),h(),d.reset(),d.task.focus()},$=s=>{s.preventDefault();const n=s.target.classList.contains("btn-delete-task"),l=!!s.target.closest(".todo__item-checkbox");if(!n&&!l)return!1;const r=s.target.closest(".todo__item").dataset.id,m=o.querySelector(`[data-id="${r}"]`);if(n&&(m.classList.add("is-disappearing"),setTimeout(()=>{m.remove(),e=e.filter(i=>i.id!==r),e.length===0&&f()},300)),l){const i=m.querySelector(".todo__item-checkbox input"),I=e.find(w=>w.id===r);i.checked=!i.checked,I.completed=i.checked}setTimeout(()=>{k(),h()},310)},q=()=>{localStorage.removeItem("tasks"),e=[],o.replaceChildren(),h(),f()};_(e),h(),p.addEventListener("input",s=>{let n=s.target.value.trim().toLowerCase();if(clearTimeout(y),n.length===0){_(e);return}const l=e.filter(r=>r.value.trim().toLowerCase().includes(n));y=setTimeout(()=>{if(!l.length&&n.length){f(`По запросу "${n}" ничего не найдено`);return}_(l)},500)}),d.addEventListener("submit",C),o.addEventListener("click",$),t.addEventListener("click",()=>u.showModal()),x.addEventListener("click",()=>{q(),u.close()}),E.addEventListener("click",()=>u.close())}),`
	<div class="todo" id="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${S("Добавить задачу","task")}
			${v("Add","btn-add-task","submit")}
		</form>
		${S("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			${v("Oчистить всё","btn-delete-all")}
		</div>
		<ul class="todo__list"></ul>
		<div class="todo__list-empty">Список пуст</div>
		<dialog id="todo-modal">
			<div class="panel">
				<p class="text">Удалить все задачи?</p>
				<div class="actions">
					${v("Ок","btn-modal-ok")}
					${v("Отмена","btn-modal-close")}
				</div>
			</div>
		</dialog>
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${T()}
  </div>
`;
