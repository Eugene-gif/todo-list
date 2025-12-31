(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))_(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&_(h)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function _(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const A=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})();function q(o,c="text",i=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${i?" search":""}"
			placeholder="${o}"
			name="${c}">
		${i?A:""}
  </div>
	`}function L(o="Text",c="",i="button"){return`
		<button class="button${c?" "+c:""}"
			type="${i}"
		>${o}</button>
	`}function B(){let o=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo"),i=c.querySelector("#todo-add"),_=c.querySelector(".input__field.search"),s=c.querySelector(".btn-delete-all"),n=c.querySelector(".todo__list"),h=c.querySelector(".todo__count-value span"),g=c.querySelector(".todo__list-empty");let C=null,y=!1;const u=c.querySelector("#todo-modal"),w=u.querySelector(".btn-modal-ok"),T=u.querySelector(".btn-modal-close"),I=e=>{const t=document.createElement("li");t.classList.add("todo__item","item"),t.dataset.id=e.id;const a=t.appendChild(document.createElement("div"));a.classList.add("checkbox","item__checkbox");const r=a.appendChild(document.createElement("input"));r.type="checkbox",r.id=e.id,e.completed&&(r.checked=!0),r.classList.add("checkbox__input");const m=a.appendChild(document.createElement("label"));m.for=e.id,m.classList.add("checkbox__label");const p=m.appendChild(document.createElement("div"));p.classList.add("checkbox__box");const f=p.appendChild(document.createElement("div"));f.classList.add("checkbox__icon"),f.textContent="✔";const d=a.appendChild(document.createElement("p"));d.classList.add("checkbox__text","item__text"),d.textContent=e.value;const l=t.appendChild(document.createElement("button"));l.classList.add("button","btn-delete-task","item__button-delete"),l.type="button",l.textContent="✖",t.replaceChildren(a,l),n.append(t)},v=(e="Список пуст")=>{n.classList.add("--hide"),g.classList.remove("--hide"),g.textContent=e},$=()=>{n.classList.remove("--hide"),g.classList.add("--hide")},x=e=>{n.replaceChildren(),$(),e.length?e.forEach(t=>{I(t)}):v()},E=()=>{localStorage.setItem("tasks",JSON.stringify(o))},b=()=>{h.textContent=o.length,o.length?s.classList.remove("--hide"):s.classList.add("--hide")},O=e=>{if(e.preventDefault(),!i.task.value)return!1;const t={id:crypto?.randomUUID()??Date.now().toString(),value:i.task.value,completed:!1};o.length===0&&$(),I(t),o.push(t),E(),b(),i.reset(),i.task.focus()},M=e=>{e.preventDefault();const t=e.target.classList.contains("btn-delete-task"),a=!!e.target.closest(".checkbox__label"),r=!!e.target.closest(".checkbox__text");if(!t&&!a&&!r)return!1;const m=e.target.closest(".todo__item").dataset.id,p=n.querySelector(`[data-id="${m}"]`),f=o.find(d=>d.id===m);if(t&&(p.classList.add("is-disappearing"),setTimeout(()=>{p.remove(),o=o.filter(d=>d.id!==m),o.length===0&&v()},300)),a){const d=p.querySelector(".checkbox__input");d.checked=!d.checked,f.completed=d.checked}if(r&&!y){const d=e.target.closest(".checkbox__text"),l=document.createElement("textarea");l.classList.add("checkbox__textarea"),l.value=d.innerHTML,d.replaceWith(l),l.focus(),y=!0,l.onkeydown=S=>{S.key==="Enter"&&S.shiftKey||S.key==="Enter"&&l.blur()},l.onblur=()=>{d.innerHTML=l.value,f.value=l.value,l.replaceWith(d),y=!1,E()}}setTimeout(()=>{E(),b()},310)},D=()=>{localStorage.removeItem("tasks"),o=[],n.replaceChildren(),b(),v()},k=()=>{u.classList.add("close"),setTimeout(()=>u.close(),500)};x(o),b(),_.addEventListener("input",e=>{let t=e.target.value.trim().toLowerCase();if(clearTimeout(C),t.length===0){x(o);return}const a=o.filter(r=>r.value.trim().toLowerCase().includes(t));C=setTimeout(()=>{if(!a.length&&t.length){v(`По запросу "${t}" ничего не найдено`);return}x(a)},500)}),i.addEventListener("submit",O),n.addEventListener("click",M),s.addEventListener("click",()=>{u.classList.remove("close"),u.showModal()}),w.addEventListener("click",()=>{D(),k()}),T.addEventListener("click",()=>{k()}),u.addEventListener("click",e=>{e.preventDefault(),u.querySelector(".panel").contains(e.target)||k()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(e.preventDefault(),k())})}),`
	<div class="todo" id="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${q("Добавить задачу","task")}
			${L("Add","btn-add-task","submit")}
		</form>
		${q("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			${L("Oчистить всё","btn-delete-all")}
		</div>
		<ul class="todo__list"></ul>
		<div class="todo__list-empty">Список пуст</div>
		<dialog id="todo-modal">
			<div class="panel">
				<p class="text">Удалить все задачи?</p>
				<div class="actions">
					${L("Ок","btn-modal-ok")}
					${L("Отмена","btn-modal-close")}
				</div>
			</div>
		</dialog>
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${B()}
  </div>
`;
