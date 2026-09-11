/* ================================================================================== 
 * GITHUB-CLONE
 * ================================================================================== */

/* --- Referencias a elementos del HTML ---
   Se buscan una sola vez, al arrancar, y se reutilizan siempre. */

const inputCreateName = document.getElementById("input-name")
const nameIdea = document.getElementById("name-idea")
const message = document.getElementById("message")

const inputCreateDescription = document.getElementById("input-description")
const typeCharacter = document.getElementById("description-string")

const switchButton = document.getElementById("switch")
const switchBox = document.getElementById("switch-box")
const switchTag = document.getElementById("switch-tag")

const createRepoButton = document.getElementById("button-create-repo")

/* ===============================================================================
* ESTADO
* ================================================================================ */

let inputRepoName = ""                            // NOMBRE DEL REPOSITORIO
let inputRepoDescription = ""                     // DESCRIPCION DEL REPOSITORIO
const repoNameRegex = /^[A-Za-z0-9._-]+$/;        // CARACTERES INCLUIDOS EN EL INPUT
const repos = getRepos()                          // ARRAY DE REPOS GUARDADOS


/* ================================================================================
* Funciones que pintan el estado
* ================================================================================= */

function renderMessage(){
    if(!repoNameRegex.test(inputRepoName) && inputRepoName.length !== 0){
        inputCreateName.style.borderColor = "var(--color-success-fg)"
        inputRepoName = inputRepoName.replace(/[^A-Za-z0-9._-]/g, "")
        message.innerHTML = /*HTML*/ `

        <span>
            <svg class="validate" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm-.705 8.737L9.63 4.403 8.392 3.166 5.295 6.263l-1.7-1.702L2.356 5.8l2.938 2.938Z"></path></svg>
        </span>
        <span class="form__create-name-validate-message">
            Tu nuevo repositorio se creará como <strong>${inputRepoName}</strong>.<span class="form__create-name-validate-message-wrong"> El nombre del repositorio solo puede contener letras, dígitos y caracteres <code _istranslated="1">ASCII .</code>, <code _istranslated="1">-</code>, y <code _istranslated="1">_</code>.</span>
        </span>

    `}else if(inputRepoName.length === 0){
        inputCreateName.style.borderColor = "var(--color-danger-fg)"
        message.innerHTML = /*HTML*/ `

        <span>
            <svg class="error" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
        </span>
        <span class="form__create-name-error-message">El nombre no puede estar en blanco</span>

    `}else if(inputRepoName.length >= 100){
        inputCreateName.style.borderColor = "var(--color-danger-fg)"
        message.innerHTML = /*HTML*/ `

        <span>
            <svg class="error" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
        </span>
        <span class="form__create-name-error-message">El nombre no puede superar los 100 caracteres</span>
    `}else if(repos.includes(inputRepoName)){
        inputCreateName.style.borderColor = "var(--color-danger-fg)"
        message.innerHTML = /*HTML*/ `

        <span>
            <svg class="error" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
        </span>
        <span class="form__create-name-error-message">El repositorio ya existe</span>
    `}else{
        inputCreateName.style.borderColor = "var(--color-success-fg)"
        message.innerHTML = /*HTML*/ `
        <span>
            <svg class="validate" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0Zm-.705 8.737L9.63 4.403 8.392 3.166 5.295 6.263l-1.7-1.702L2.356 5.8l2.938 2.938Z"></path></svg>
        </span>
        <span class="form__create-name-validate-message">
            Tu nuevo repositorio se creará como <strong>${inputRepoName}</strong>.
        </span>
    `}
}

function renderTypeCharacter(){
    if(inputRepoDescription.length >= 350){
        inputCreateDescription.style.borderColor = "var(--color-danger-fg)"
        typeCharacter.innerHTML = /*HTML*/ `
            <span>
                <svg class="error" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
            </span>
            <span color = "var(--color-danger-fg)">La descripcion no puede exceder los 350 caracteres</span>
        `
    }else{
        typeCharacter.innerHTML = /*HTML*/ `
            ${inputRepoDescription.length}
        `
    }
}

/* =============================================================================== 
* LISTENERS
* ================================================================================  */

/* GUARDAR LA NOMBRE */
inputCreateName.addEventListener("input",(event) =>{
    inputRepoName = event.target.value.toLowerCase().replace(/ /g, "-")
    renderMessage()
})

/* SELECCIONAR NOMBRE PROPUESTO */
nameIdea.addEventListener("click",(event) =>{
    inputRepoName = nameIdea.innerHTML.toLowerCase().replace(/ /g, "-")
    inputCreateName.value = inputRepoName
    renderMessage()
})

/* GUARDAR LA DESCRIPCION */
inputCreateDescription.addEventListener("input",(event) =>{
    inputRepoDescription = event.target.value
    renderTypeCharacter()
})

/* ACTIVAR O DESACTIVAR EL SWITCH */
switchButton.addEventListener("click",(event) =>{
    if (switchTag.textContent === "Off"){
        switchBox.style.animationName = "switchAnimationOn"
        switchButton.style.backgroundColor = "var(--color-accent-emphasis)"
        switchTag.innerHTML = "On"

    }else{
        switchBox.style.animationName = "switchAnimationOff"
        switchButton.style.backgroundColor = "var(--color-btn-bg)"
        switchTag.innerHTML = "Off"
    }
})


createRepoButton.addEventListener("click",(event) =>{

    if (!inputRepoName || inputRepoName.length >= 100 || repos.includes(inputRepoName)){
        inputCreateName.scrollIntoView({
            behavior: "smooth",
            block: "center" 
        });
        renderMessage()
    }else{
         saveRepo(inputRepoName)
    }
   
    inputRepoName = ""
    inputCreateName.value = ""
})