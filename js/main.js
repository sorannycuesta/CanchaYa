// 1. Los datos de los botones viven en un array.
//    Para agregar un botón nuevo, solo añades una línea aquí.
const LINKS = [
    { href: "index.html",          icono: "fa-house",        label: "Inicio" ,  descripcion: "Vuelve a la página principal"},
    { href: "sobre-nosotros.html", icono: "fa-users-rays",   label: "Sobre nosotros" ,  descripcion: "Conoce más sobre nosotros"},
    { href: "contactanos.html",    icono: "fa-address-book", label: "Contáctanos",  descripcion: "Aquí puedes contactarnos"},
];

class AppSidebar extends HTMLElement {
    connectedCallback() {
        // 2. Nombre del archivo actual. Si está vacío (ruta "/"), es el inicio.
        const actual = location.pathname.split("/").pop() || "index.html";

        // 3. Con .map() convertimos cada objeto en un <li>
        const items = LINKS.map(({ href, icono, label, descripcion }) => `
            <li>
                <a class="link_nav" href="${href}" data-tooltip="${descripcion}" aria-label="${label}"
                   ${href === actual ? 'aria-current="page"' : ""}>
                    <i class="fa-solid ${icono}"></i>
                </a>
            </li>
        `).join("");

        // 4. Pintamos la sidebar
        this.innerHTML = `
            <nav class="nav_flotante" aria-label="Navegación principal">
                <ul class="ul_nav">
                    ${items}
                    <li>
                        <button class="link_nav btn_orientacion" type="button"
                         data-tooltip="Mueve la barra al otro lado"
                         aria-label="Cambiar orientación">
                            <i class="fa-solid fa-arrows-rotate"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        `;

        // 5. Orientación: recordar la elección y cambiarla con el botón
       const nav = this.querySelector(".nav_flotante");

if (localStorage.getItem("sidebar-lado") === "derecha") {
    nav.classList.add("derecha");
}

this.querySelector(".btn_orientacion").addEventListener("click", () => {
    const derecha = nav.classList.toggle("derecha");
    localStorage.setItem("sidebar-lado", derecha ? "derecha" : "izquierda");
});
    }
}

customElements.define("app-sidebar", AppSidebar);