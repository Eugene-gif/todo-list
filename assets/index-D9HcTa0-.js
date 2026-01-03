(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))f(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const _ of n.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&f(_)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function f(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const A=(function(){return`
		<svg class="input__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
		<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m14 14-2.9-2.9m1.567-3.767A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z"/>
</svg>
	`})(),B=(function(){return`
		<button class="button input__clear --hide" type="button">✖</button>
	`})();function $(t,c="text",i=!1){return`
	<div class="todo__input input">
    <input type="text" 
			class="input__field${i?" search":""}"
			placeholder="${t}"
			name="${c}">
		${i?A:""}
		${i?B:""}
  </div>
	`}function g(t="Text",c="",i="button"){return`
		<button class="button${c?" "+c:""}"
			type="${i}"
		>${t}</button>
	`}function N(){let t=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];return document.addEventListener("DOMContentLoaded",()=>{const c=document.getElementById("todo"),i=c.querySelector("#todo-add"),f=c.querySelector(".input__field.search"),s=c.querySelector(".btn-delete-all"),n=c.querySelector(".todo__list"),_=c.querySelector(".todo__count-value span"),y=c.querySelector(".todo__list-empty");let C=null,x=!1;const m=c.querySelector("#todo-modal"),w=m.querySelector(".btn-modal-ok"),T=m.querySelector(".btn-modal-close"),I=e=>{const o=document.createElement("li");o.classList.add("todo__item","item"),o.dataset.id=e.id;const a=o.appendChild(document.createElement("div"));a.classList.add("checkbox","item__checkbox");const u=a.appendChild(document.createElement("input"));u.type="checkbox",u.id=e.id,e.completed&&(u.checked=!0),u.classList.add("checkbox__input");const r=a.appendChild(document.createElement("label"));r.for=e.id,r.classList.add("checkbox__label");const p=r.appendChild(document.createElement("div"));p.classList.add("checkbox__box");const h=p.appendChild(document.createElement("div"));h.classList.add("checkbox__icon"),h.textContent="✔";const l=a.appendChild(document.createElement("p"));l.classList.add("checkbox__text","item__text"),l.textContent=e.value;const d=o.appendChild(document.createElement("button"));d.classList.add("button","btn-delete-task","item__button-delete"),d.type="button",d.textContent="✖",o.replaceChildren(a,d),n.append(o)},v=(e="Список пуст")=>{n.classList.add("--hide"),y.classList.remove("--hide"),y.textContent=e},q=()=>{n.classList.remove("--hide"),y.classList.add("--hide")},b=e=>{n.replaceChildren(),q(),e.length?e.forEach(o=>{I(o)}):v()},S=()=>{localStorage.setItem("tasks",JSON.stringify(t))},L=()=>{_.textContent=t.length,t.length?s.classList.remove("--hide"):s.classList.add("--hide")},O=e=>{if(e.preventDefault(),!i.task.value)return!1;const o={id:crypto?.randomUUID()??Date.now().toString(),value:i.task.value,completed:!1};t.length===0&&q(),I(o),t.push(o),S(),L(),i.reset(),i.task.focus()},M=e=>{e.preventDefault();const o=e.target.classList.contains("btn-delete-task"),a=!!e.target.closest(".checkbox__label"),u=!!e.target.closest(".checkbox__text");if(!o&&!a&&!u)return!1;const r=e.target.closest(".todo__item").dataset.id,p=n.querySelector(`[data-id="${r}"]`),h=t.find(l=>l.id===r);if(o&&(p.classList.add("is-disappearing"),setTimeout(()=>{p.remove(),t=t.filter(l=>l.id!==r),t.length===0&&v()},300)),a){const l=p.querySelector(".checkbox__input");l.checked=!l.checked,h.completed=l.checked}if(u&&!x){const l=e.target.closest(".checkbox__text"),d=document.createElement("textarea");d.classList.add("checkbox__textarea"),d.value=l.innerHTML,l.replaceWith(d),d.focus(),x=!0,d.onkeydown=E=>{E.key==="Enter"&&E.shiftKey||E.key==="Enter"&&d.blur()},d.onblur=()=>{l.innerHTML=d.value,h.value=d.value,d.replaceWith(l),x=!1,S()}}setTimeout(()=>{S(),L()},310)},D=()=>{localStorage.removeItem("tasks"),t=[],n.replaceChildren(),L(),v()},k=()=>{m.classList.add("close"),setTimeout(()=>m.close(),500)};b(t),L(),f.addEventListener("input",e=>{let o=e.target.value.trim().toLowerCase();const a=e.target.closest(".todo__input"),u=a.querySelector(".input__icon"),r=a.querySelector(".input__clear");if(clearTimeout(C),r.onclick=()=>{f.value="",u.classList.remove("--hide"),r.classList.add("--hide"),b(t),f.focus()},o.length===0){u.classList.remove("--hide"),r.classList.add("--hide"),b(t);return}o.length&&(u.classList.add("--hide"),r.classList.remove("--hide"));const p=t.filter(h=>h.value.trim().toLowerCase().includes(o));C=setTimeout(()=>{if(!p.length&&o.length){v(`По запросу "${o}" ничего не найдено`);return}b(p)},500)}),i.addEventListener("submit",O),n.addEventListener("click",M),s.addEventListener("click",()=>{m.classList.remove("close"),m.showModal()}),w.addEventListener("click",()=>{D(),k()}),T.addEventListener("click",()=>{k()}),m.addEventListener("click",e=>{e.preventDefault(),m.querySelector(".panel").contains(e.target)||k()}),document.addEventListener("keydown",e=>{e.key==="Escape"&&(e.preventDefault(),k())})}),`
	<div class="todo" id="todo">
		<h1 class="todo__title">To Do List</h1>
		<form id="todo-add" class="todo__add">
			${$("Добавить задачу","task")}
			${g("Add","btn-add-task","submit")}
		</form>
		${$("Поиск","search",!0)}
		<div class="todo__count">
			<div class="todo__count-value">Всего задач: <span></span></div>
			${g("Oчистить всё","btn-delete-all")}
		</div>
		<ul class="todo__list"></ul>
		<div class="todo__list-empty">Список пуст</div>
		<dialog id="todo-modal">
			<div class="panel">
				<p class="text">Удалить все задачи?</p>
				<div class="actions">
					${g("Ок","btn-modal-ok")}
					${g("Отмена","btn-modal-close")}
				</div>
			</div>
		</dialog>
	</div>`}document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    ${N()}
  </div>
`;
