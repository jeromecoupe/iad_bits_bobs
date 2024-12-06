const elBody = document.querySelector("body");
const elMenuTriggers = document.querySelectorAll(".js-menutrigger");
const elMobileMenu = document.querySelector(".js-mobilemenu");
const bodyClass = "has-menu";
const menuClass = "is-open";

console.log(elBody);

function init() {
  console.log("in there");

  elMenuTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      elBody.classList.add(bodyClass);
      elMobileMenu.classList.toggle(menuClass);
    });
  });
}

export { init };
