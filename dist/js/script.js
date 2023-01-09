"use strict";const form=document.getElementById("form"),pristine=new Pristine(form);form.addEventListener("submit",e=>{e.preventDefault(),onFormSubmit(e)});const signUpSelect=document.getElementById("a-select"),compSizeSelect=document.getElementById("cs-select"),helpSelect=document.getElementById("help-select"),signUpNiceSelect=signUpSelect?NiceSelect.bind(signUpSelect):null,compSizeNiceSelect=compSizeSelect?NiceSelect.bind(compSizeSelect):null,helpNiceSelect=helpSelect?NiceSelect.bind(helpSelect):null,selectById={"a-select":signUpNiceSelect,"cs-select":compSizeNiceSelect,"help-select":helpNiceSelect},filteredSelects=[signUpSelect,compSizeSelect,helpSelect].filter(e=>!!e);filteredSelects.forEach(e=>{e.addEventListener("change",()=>{this.validateSelect(e.getAttribute("id"))})});const filteredNiceSelects=[signUpNiceSelect,compSizeNiceSelect,helpNiceSelect].filter(e=>!!e);async function onFormSubmit(e){e.preventDefault();const t=validateSelect(signUpSelect?"a-select":["cs-select","help-select"]);pristine.validate()&&t&&(signUpSelect?signUpRequest():postToGoogleForm())}function signUpRequest(){const e={first_name:document.getElementById("name").value,last_name:document.getElementById("lastname").value,email:document.getElementById("email").value,user_type:document.getElementById("a-select").value};if(Object.values(e).some(e=>!e))return;fetch(" https://landing.133t.com/api/early-adopter/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{e.ok?(clearForm(),successModalAction(!0)):alert(`HTTP Error: ${e.statusText}`)})}function postToGoogleForm(){const e={Email:document.getElementById("email").value,CompanySize:document.getElementById("cs-select").value,HowCanWeHelp:document.getElementById("help-select").value,Question:document.getElementById("text").value,agree:document.getElementById("agree").value},t=document.getElementById("submitBtn");if(Object.values(e).some(e=>!e)||t.classList.contains("form-sec__btn--loading"))return;t.classList.toggle("form-sec__btn--loading");const c=form.getAttribute("action");fetch(c,{method:"POST",body:new FormData(form)}).then(e=>{e.ok?(clearForm(),t.classList.toggle("form-sec__btn--loading")):alert(`HTTP Error: ${e.statusText}`)})}function clearForm(){form.reset(),Object.entries(selectById).forEach(([e,t])=>{if(!t)return;t.clear(),t.update();const c=document.getElementById(`${e}-error`);c&&(c.innerText="")})}function validateSelect(e){let t=e;Array.isArray(e)||(t=[e]);const c=[];return t.forEach(e=>{const t=document.getElementById(`${e}-group`),l=document.getElementById(`${e}-error`);selectById[e].options.some(e=>e.element.classList.contains("selected"))?(t.classList.remove("has-danger-custom"),l.innerText="",c.push(!0)):(t.classList.add("has-danger-custom"),l.innerText="Please choose.",c.push(!1))}),c.every(e=>!!e)}function successModalAction(e){const t=document.querySelector(".success-modal");t.style.display=e?"flex":"none";const c=()=>successModalAction(!1);e?t.addEventListener("click",c):t.removeEventListener("click",c)}filteredNiceSelects.forEach(e=>{e.dropdown.addEventListener("focusout",()=>{this.validateSelect(e.el.getAttribute("id"))})});