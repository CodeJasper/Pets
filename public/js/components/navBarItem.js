function executeScript() {
  const navItemId = document.currentScript.dataset.id;
  const currentPage = document.currentScript.dataset.currentpage;
  const navItem = document.querySelector(`#${navItemId}`);
  navItem.addEventListener("click", navItemSelected);

  function activeCurrentPage() {
    const navItems = document.querySelectorAll(".nav-item");
    if (navItem.children[0].pathname === currentPage) {
      navItem.children[0].classList.add("active");
    }
  }

  activeCurrentPage();

  function navItemSelected() {
    const navItems = document.querySelectorAll(".nav-item");
    const navLink = navItem.children[0];
    navItems.forEach((item) => item.children[0].classList.remove("active"));
    navLink.classList.add("active");
  }
}
executeScript();
