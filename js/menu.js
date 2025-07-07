function initMenuToggle() {
    const toggleBtn = document.querySelector('.header_menu-toggle'); //pega o botao que abre e fecha
    const menu = document.querySelector('.header_menu'); //pega o menu

    if (!toggleBtn || !menu) return; //se nao encontrar

    toggleBtn.addEventListener('click', () => toggleMenu());

    // Fecha ao clicar em qualquer link dentro do menu (mobile UX)
    menu.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a') toggleMenu(true);
    });

    function toggleMenu(forceClose = false) {
        const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true'; //ve se o menu esta aberto
        const willOpen = forceClose ? false : !isOpen;
        toggleBtn.setAttribute('aria-expanded', willOpen); //atualiza o estado do menu
        toggleBtn.textContent = willOpen ? '✖' : '☰'; //troca o icone
        menu.classList.toggle('active', willOpen); //adiciona ou remove a classe active
    }
}