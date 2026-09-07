/* =====================================================================
 * GITHUB-CLONE
 * ===================================================================== */
/* --- Referencias a elementos del HTML ---
   Se buscan una sola vez, al arrancar, y se reutilizan siempre. */

const asideBackdrop = document.querySelector(".backdrop-left-bar")
const buttonShowMenuLeft = document.getElementById("top-bar__toggle-bar-left")
const buttonCloseMenuLeft = document.getElementById("aside__close-button")
const buttonSearchMenuRepo = document.getElementById("search-repo-button-menu")
const inputSearchMenuRepo = document.getElementById("search-repo-input-menu")
const itemsToSearchNodeListAside = document.querySelectorAll(".item-to-search")

/* ===================================================================== */

const searchBox = document.getElementById("search-box")
const buttonShowTopBarSearch = document.getElementById("top-bar__search")
const searchInputTopBar = document.getElementById("search-top-bar-input")
const itemsToSearchObjectTopBar = document.getElementById("top-bar-repos")
const itemsToSearchNodeListBar = itemsToSearchObjectTopBar.querySelectorAll("li")

/* ===================================================================== */

const inputSearchAsideRepo = document.getElementById("input-aside-search")
const itemsToSearchAsideRepoObject  = document.getElementById("list-aside-search")
const itemsToSearchAsideRepoNodeList = itemsToSearchAsideRepoObject.querySelectorAll("li")

/* ===================================================================== */

const buttonShowAskCopilot = document.getElementById("ask-copilot")
const buttonAddRepo = document.getElementById("add-repo-top-bar")
const buttonAvatarMenu= document.getElementById("button-avatar")

const buttonAskMode = document.getElementById("ask-mode-button")
const buttonRepo = document.getElementById("repositories-button")
const buttonModels = document.getElementById("models-button")

const buttonWriteCode = document.getElementById("write-code-button")
const buttonGit = document.getElementById("git-button")
const buttonPull = document.getElementById("pull-button")

/* ===================================================================== */

const buttonFilterClose = document.getElementById("main__summary-close")
const filterDetails = document.getElementById("details")

/* ===================================================================== */

const buttonCloseAvatar = document.getElementById("close-avatar")
const buttonStarPaintNodeList = document.querySelectorAll(".main__feed-star-button")

/* =====================================================================
 * ESTADO
 * ===================================================================== */

let buttonSearchIsClick = false     // ESTA DESPLEGADO EL BUSCADOR ?
let searchTerms = ""                // TERMINOS DE BUSQUEDA PARA REPOS
const dropdowns = []                // ARRAY DE MENUS DESPLEGABLES ACTIVOS

/* =====================================================================
 * Funciones que pintan el estado
 * ===================================================================== */

function renderSearch(toRender){
   toRender.forEach(searchItem => {
      const matches = searchItem.textContent.trim().toLowerCase().includes(searchTerms);
      searchItem.hidden = !matches;
   })
}

/* =====================================================================
 * LISTENERS
 * ===================================================================== */

/* ABRIR MENU LATERAL */
buttonShowMenuLeft.addEventListener("click", () => {
   asideBackdrop.hidden = false;
})

/* CERRAR MENU LATERAL */
buttonCloseMenuLeft.addEventListener("click", () => {
   asideBackdrop.hidden = true;

   searchTerms = "";
   inputSearchMenuRepo.value = "";
   renderSearch(itemsToSearchNodeListAside);
})

/* DESPLEGAR EL INPUT EN EL MENU LATERAL */
buttonSearchMenuRepo.addEventListener("click", () => {
   const htmlMenuButtonSearch = asideBackdrop.querySelector(".left-bar__button-show-search")
   const htmlMenuButtonHidden = asideBackdrop.querySelector(".left-bar__button-hidde")
   const htmlMenuInputSearch = asideBackdrop.querySelector(".search-repo-input-menu-box-li")

   buttonSearchIsClick = !buttonSearchIsClick;

   htmlMenuButtonSearch.hidden = buttonSearchIsClick;
   htmlMenuButtonHidden.hidden = !buttonSearchIsClick;
   htmlMenuInputSearch.hidden = !buttonSearchIsClick;

   buttonSearchMenuRepo.setAttribute("aria-expanded", buttonSearchIsClick)

   if (buttonSearchIsClick) {
      inputSearchMenuRepo.focus();
   } else {
      searchTerms = "";
      inputSearchMenuRepo.value = "";
      renderSearch(itemsToSearchNodeListAside);
   }
})

/* CERRAR EL MENU LATERAL AL TOCAR FUERA DE EL */
asideBackdrop.addEventListener("click", (event) => {
   if (event.target.closest(".left-bar")) return;

   asideBackdrop.hidden = true;

   searchTerms = "";
   inputSearchMenuRepo.value = "";
   renderSearch(itemsToSearchNodeListAside);
})

/* ===================================================================== */

/* ABRIR BARRA DE BUSQUEDA SUPERIOR */
buttonShowTopBarSearch.addEventListener("click", () => {
   const htmlSearchBar = nav.querySelector(".backdrop-top-bar")
   htmlSearchBar.hidden = false;
   searchInputTopBar.focus();
})

/* CERRAR BARRA DE BUSQUEDA SUPERIOR */
searchBox.addEventListener("click", (event) => {
   if (event.target.closest(".search-bar")) return;
   const htmlSearchBar= nav.querySelector(".backdrop-top-bar")

   searchTerms = ""
   searchInputTopBar.value = "";
   renderSearch(itemsToSearchNodeListBar);

   htmlSearchBar.hidden = true;
})

/* ===================================================================== */

/* BUSCADOR DE REPO */

function repoSearch(input,list){
   input.addEventListener("input", (event) => {
      searchTerms = event.target.value.toLowerCase().trim();
      renderSearch(list);
   })
}

repoSearch(inputSearchAsideRepo, itemsToSearchAsideRepoNodeList)
repoSearch(searchInputTopBar, itemsToSearchNodeListBar)
repoSearch(inputSearchMenuRepo, itemsToSearchNodeListAside)

/* ===================================================================== */

/* ABRIR Y CERRAR MENUS DESPLEGABLES DESPLEGABLE SUPERIOR MODULO DERECHO */

function closeDropdown({ trigger, menu }) {
   menu.hidden = true
   trigger.setAttribute("aria-expanded", "false")
}

function registerDropdown(trigger, menuSelector, root = document) {
   const menu = root.querySelector(menuSelector)
   if (!trigger || !menu) return

   trigger.setAttribute("aria-expanded", "false")

   const dropdown = { trigger, menu }

   trigger.addEventListener("click", (event) => {
      event.stopPropagation()
      const wasOpen = !menu.hidden

      dropdowns.forEach((otherDropdown) => {
         if (otherDropdown !== dropdown) closeDropdown(otherDropdown)
      })

      menu.hidden = wasOpen 
      trigger.setAttribute("aria-expanded", String(!menu.hidden))
   })

   menu.addEventListener("click", (event) => event.stopPropagation())

   dropdowns.push(dropdown)
}

document.addEventListener("click", () => {
   dropdowns.forEach((dropdown) => closeDropdown(dropdown))
})

registerDropdown(buttonShowAskCopilot, ".top-bar__copilot-menu")
registerDropdown(buttonAddRepo, ".top-bar__add-menu")
registerDropdown(buttonAvatarMenu, ".top-bar__avatar-menu")
registerDropdown(buttonCloseAvatar, ".top-bar__avatar-menu")
registerDropdown(buttonAskMode, ".main__ask-menu")
registerDropdown(buttonRepo, ".main__repositories-menu")
registerDropdown(buttonModels, ".main__models-menu")
registerDropdown(buttonWriteCode, ".main__write-code-menu")
registerDropdown(buttonGit, ".main__git-menu")
registerDropdown(buttonPull, ".main__pull-menu")

/* ===================================================================== */

/* CERRAR FILTRO DE BUSQUEDA */
buttonFilterClose.addEventListener("click", () => {
   if (filterDetails.hasAttribute("open")){
      filterDetails.removeAttribute("open");
   }
});

/* CERRAR FILTRO DE BUSQUEDA AL TOCAR AFUERA */
document.addEventListener("click", (event) => { 
   if (event.target.closest(".details")) return;

   const outside =  document.getElementById("body")

   if (filterDetails.hasAttribute("open") && !filterDetails.contains(event.target)){
      filterDetails.removeAttribute("open");
   }
});

/* ===================================================================== */

/* PINTAR ESTRELLA */

buttonStarPaintNodeList.forEach((buttonStarPaint)=>{
   let isPaint = false
   buttonStarPaint.addEventListener("click", (event) => {
      const buttonStar = event.target.closest(".main__feed-star-button")
      if(!buttonStar) return;
      
      const star = buttonStar.querySelector("svg")
      const span = buttonStar.querySelector("span")

      if(!isPaint){
         isPaint = true
         star.setAttribute("fill", "rgb(227, 179, 65)")
         span.innerHTML = `Starred`
      }else if(isPaint){
         isPaint = false
         star.setAttribute("fill", "var(--color-fg-muted)")
         span.innerHTML = `Star`
      }

   })
   
})

