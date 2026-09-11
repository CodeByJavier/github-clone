/* ================================================================================== 
 * GITHUB-CLONE
 * ================================================================================== */

const REPOS_KEY = "repos"

/* Lee el array de repos guardado */
function getRepos(){
   const saved = localStorage.getItem(REPOS_KEY)
   return saved ? JSON.parse(saved) : []
}

/* Anade un repo al array y lo vuelve a guardar. */
function saveRepo(repo){
   const repos = getRepos()
   repos.push(repo)
   localStorage.setItem(REPOS_KEY, JSON.stringify(repos))
}

/* Borra un repo del array  */
function deleteRepo(repo){
   const repos = getRepos()
   const remaining = repos.filter((saved) => saved !== repo)
   localStorage.setItem(REPOS_KEY, JSON.stringify(remaining))
}

const THEME_KEY = "theme"

/* Cuelga el tema del <html>. El CSS solo mira ese atributo. */
function setTheme(theme){
   document.documentElement.setAttribute("data-theme", theme)
}

/* Recuerda el tema */
function chooseTheme(theme){
   setTheme(theme)
   localStorage.setItem(THEME_KEY, theme)
}

/* Que tema toca al arrancar. */
function getInitialTheme(){
   const saved = localStorage.getItem(THEME_KEY)
   if (saved) return saved

   return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}


setTheme(getInitialTheme())

function initSharedUI() {

   getRepos().forEach((repo) => storageRender(repo))

   /* --- Referencias a elementos del HTML --- */
   
   const asideBackdrop = document.querySelector(".backdrop-left-bar")
   const buttonShowMenuLeft = document.getElementById("top-bar__toggle-bar-left")
   const buttonCloseMenuLeft = document.getElementById("aside__close-button")
   const buttonSearchMenuRepo = document.getElementById("search-repo-button-menu")
   const inputSearchMenuRepo = document.getElementById("search-repo-input-menu")
   const itemsToSearchNodeListAside = document.querySelectorAll(".item-to-search")

/* ================================================================================== */

   const searchBox = document.getElementById("search-box")
   const buttonShowTopBarSearch = document.getElementById("top-bar__search")
   const searchInputTopBar = document.getElementById("search-top-bar-input")
   const itemsToSearchObjectTopBar = document.getElementById("top-bar-repos")
   const itemsToSearchNodeListBar = itemsToSearchObjectTopBar ? itemsToSearchObjectTopBar.querySelectorAll("li") : []

/* ================================================================================== */

   const inputSearchAsideRepo = document.getElementById("input-aside-search")
   const itemsToSearchAsideRepoObject  = document.getElementById("list-aside-search")
    const itemsToSearchAsideRepoNodeList = itemsToSearchAsideRepoObject ? itemsToSearchAsideRepoObject.querySelectorAll("li") : []

   const inputSearchMainRepo = document.getElementById("input-main-search")
   const itemsToSearchMainRepoObject  = document.getElementById("list-main-search")
   const itemsToSearchMainRepoNodeList = itemsToSearchMainRepoObject ? itemsToSearchMainRepoObject.querySelectorAll("li") : []


/* ================================================================================== */

   const buttonShowAskCopilot = document.getElementById("ask-copilot")
   const buttonAddRepo = document.getElementById("add-repo-top-bar")
   const buttodocumentatarMenu= document.getElementById("button-avatar")

   const buttonAskMode = document.getElementById("ask-mode-button")
   const buttonRepo = document.getElementById("repositories-button")
   const buttonModels = document.getElementById("models-button")

   const buttonWriteCode = document.getElementById("write-code-button")
   const buttonGit = document.getElementById("git-button")
   const buttonPull = document.getElementById("pull-button")

/* ================================================================================== */

   const buttonFilterClose = document.getElementById("main__summary-close")
   const filterDetails = document.getElementById("details")

/* ================================================================================== */

   const buttonCloseAvatar = document.getElementById("close-avatar")
   const buttonStarPaintNodeList = document.querySelectorAll(".main__feed-star-button")

/* ================================================================================== */

   /* ===============================================================================
   * ESTADO
   * ================================================================================ */

   let buttonSearchIsClick = false     // ESTA DESPLEGADO EL BUSCADOR ?
   let searchTerms = ""                // TERMINOS DE BUSQUEDA PARA REPOS
   const dropdowns = []                // ARRAY DE MENUS DESPLEGABLES ACTIVOS

   /* ================================================================================
   * Funciones que pintan el estado
   * ================================================================================= */

   function renderSearch(toRender){
      toRender.forEach(searchItem => {
         const matches = searchItem.textContent.trim().toLowerCase().includes(searchTerms);
         searchItem.hidden = !matches;
      })
   }


   /* =============================================================================== 
   * LISTENERS
   * ================================================================================  */

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

/* ================================================================================== */

   /* ABRIR BARRA DE BUSQUEDA SUPERIOR */
   buttonShowTopBarSearch.addEventListener("click", () => {
      const htmlSearchBar = document.querySelector(".backdrop-top-bar")
      htmlSearchBar.hidden = false;
      searchInputTopBar.focus();
   })

   /* CERRAR BARRA DE BUSQUEDA SUPERIOR */
   searchBox.addEventListener("click", (event) => {
      if (event.target.closest(".search-bar")) return;
      const htmlSearchBar= document.querySelector(".backdrop-top-bar")

      searchTerms = ""
      searchInputTopBar.value = "";
      renderSearch(itemsToSearchNodeListBar);

      htmlSearchBar.hidden = true;
   })

/* ================================================================================== */

   /* BUSCADOR DE REPO */

   function repoSearch(input,list){
      if (!input) return

      input.addEventListener("input", (event) => {
         searchTerms = event.target.value.toLowerCase().trim();
         renderSearch(list);
      })
   }
   repoSearch(inputSearchMainRepo, itemsToSearchMainRepoNodeList)
   repoSearch(inputSearchAsideRepo, itemsToSearchAsideRepoNodeList)
   repoSearch(searchInputTopBar, itemsToSearchNodeListBar)
   repoSearch(inputSearchMenuRepo, itemsToSearchNodeListAside)

/* ================================================================================== */

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
   registerDropdown(buttodocumentatarMenu, ".top-bar__avatar-menu")
   registerDropdown(buttonCloseAvatar, ".top-bar__avatar-menu")
   registerDropdown(buttonAskMode, ".main__ask-menu")
   registerDropdown(buttonRepo, ".main__repositories-menu")
   registerDropdown(buttonModels, ".main__models-menu")
   registerDropdown(buttonWriteCode, ".main__write-code-menu")
   registerDropdown(buttonGit, ".main__git-menu")
   registerDropdown(buttonPull, ".main__pull-menu")

/* ================================================================================== */

   /* CERRAR FILTRO DE BUSQUEDA */
   if (buttonFilterClose && filterDetails) {
      buttonFilterClose.addEventListener("click", () => {
         if (filterDetails.hasAttribute("open")){
            filterDetails.removeAttribute("open");
         }
      });

      /* CERRAR FILTRO DE BUSQUEDA AL TOCAR AFUERA */
      document.addEventListener("click", (event) => {
         if (event.target.closest(".details")) return;

         if (filterDetails.hasAttribute("open") && !filterDetails.contains(event.target)){
            filterDetails.removeAttribute("open");
         }
      });
   }

/* ================================================================================== */

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

/* ================================================================================== */

   /* CAMBIAR ENTRE MODO DARK O LIGTH */
   const switchLigthDark = document.getElementById("switch-ligth-dark")

   switchLigthDark?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme")
      chooseTheme(current === "dark" ? "light" : "dark")
   })
   
/* ================================================================================== */

   /* ELIMINAR REPOS */
   document.addEventListener("click", (event) => {
      const button = event.target.closest(".delete")
      if (!button) return

      const repoName = button.closest("li").dataset.repo
      if (!repoName) return

      deleteRepo(repoName)
      document.querySelectorAll(`[data-repo="${repoName}"]`).forEach((item) => item.remove())
   })

}
/* ================================================================================== */

/* AÑADIR REPOS */

function storageRender(repo){
   const lists = [
      document.getElementById("list-aside-search"),
      document.getElementById("top-bar-repos"),
      document.getElementById("list-main-search"),
      document.getElementById("toggle-menu-list"),
   ]

   lists.forEach((list) => {
      if (!list) return

      list.insertAdjacentHTML("beforeend", /*HTML*/ `
         <li class="item-to-search item-to-search-js" data-repo="${repo}">
            <div class="box-name-js">
               <span>
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
               </span>
               <a class="repositories-link-js" href="" aria-label="Abrir repositorios">
                  CodeByJavier<span>/</span>${repo}
               </a>
            </div>
            <button class="delete btn" type="button" aria-label="Eliminar repositorio">
               <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path></svg>
            </button>
         </li>
      `)
   })
}

