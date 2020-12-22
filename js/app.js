/**
 *
 * Programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint (Airbnb)
 *
*/

/**
 * Define Global Variables
 *
*/
const sectionList = document.body.querySelectorAll('section');
const navBarList = document.body.querySelector('ul#navbar-list');
const backToTop = document.getElementById('back-to-top');

/**
 * End Global Variables
 *
*/

/**
 * Begin Main Functions
 *
*/

/**
 * toggleBackToTop
 *
 * Control the visibilty of the back to top button
 */
function toggleBackToTop() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
}

/**
 * changeNavbarBackgrund
 *
 * Control the color of the navbar before and after scrolling
 */
function changeNavbarBackgrund() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    navBarList.classList.add('scrolled');
  } else {
    navBarList.classList.remove('scrolled');
  }
}

/**
 *  * setLiActive
 *
 * Set the menu item active then scoll to its section
 *
 * @param {Event} event
 */
function setLiActive(event) {
  document.querySelectorAll('ul#navbar-list li a').forEach((listItem) => {
    listItem.classList.remove('active');
  });

  const clickedAnchor = event.target;
  clickedAnchor.classList.add('active');

  document.querySelector(`#${clickedAnchor.dataset.sectionId}`).scrollIntoView();
}

/**
 * setSectionActive
 *
 * Add needed classes to activated menu item and its section and remove unnneded classes from others
 *
 * @param {String} sectionId
 */
function setSectionActive(sectionId) {
  document.querySelectorAll('section').forEach((sec) => sec.classList.remove('active'));
  document.querySelectorAll('ul#navbar-list li a').forEach((a) => a.classList.remove('active'));

  const section = document.querySelector(`#${sectionId}`);
  section.classList.add('active');

  const liAnchor = document.querySelector(`[data-section-id="${sectionId}"]`);
  liAnchor.classList.add('active');
}

/**
 * isSectionVisible
 *
 * Check if the section is visible inside the view port
 *
 * @param {Element} section
 */
function isSectionVisible(section) {
  const rect = section.getBoundingClientRect();
  return rect.bottom <= window.innerHeight;
}

/**
 * buildTheNavBar
 *
 * Create needed HTML elements structure to build the navbar
 */
function buildTheNavBar() {
  sectionList.forEach((section) => {
    const listItem = document.createElement('li');
    const listItemLink = document.createElement('a');
    listItem.appendChild(document.createTextNode(listItemLink));
    listItemLink.appendChild(document.createTextNode(section.dataset.nav));
    listItemLink.dataset.sectionId = section.id;
    navBarList.appendChild(listItem).appendChild(listItemLink);
  });
}

buildTheNavBar();

/**
 * End Main Functions
 * Begin Events
 *
*/
document.querySelectorAll('ul#navbar-list li a').forEach((li) => {
  li.addEventListener('click', setLiActive);
});

document.querySelector('#back-to-top').addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

window.addEventListener('scroll', () => {
  changeNavbarBackgrund();
  toggleBackToTop();
  document.querySelectorAll('section').forEach((sec) => {
    if (isSectionVisible(sec)) {
      setSectionActive(sec.id);
    }
  });
});
