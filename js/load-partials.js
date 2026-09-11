/* =====================================================================
 * CARGA DE FRAGMENTOS COMPARTIDOS (header + aside + footer + toggle-menu)
 * ===================================================================== */

async function loadPartial(url, placeholderId) {
   const placeholder = document.getElementById(placeholderId)

   if (!placeholder) return

   const response = await fetch(url, { cache: "no-store" })

   if (!response.ok) {
      throw new Error(`No se pudo cargar ${url} (status ${response.status})`)
   }

   const html = await response.text()

   placeholder.outerHTML = html
}

async function loadSharedUI() {
   await Promise.all([
      loadPartial("partials/header.html", "header-placeholder"),
      loadPartial("partials/aside.html", "aside-placeholder"),
      loadPartial("partials/toggle-menu.html", "toggle-menu-placeholder"),
      loadPartial("partials/footer.html", "footer-placeholder"),
   ])

   initSharedUI()
}

loadSharedUI()
