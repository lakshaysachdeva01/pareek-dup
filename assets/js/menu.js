//code for opening menu bar

document.getElementById("open").addEventListener("click" , openmenu());

function openmenu(){
  showmenu.style.display= "block";
  showmenufull.style.display= "block";
}

document.getElementById("close").addEventListener("click",closemenu());

function closemenu() {

    showmenu.style.display="none";
    showmenufull.style.display= "none";  
}


// Code for products dropdown
function opendropdown() {
  const dropdownMenu = document.querySelector('.dropdown_menu');
  const buttonIcon = document.querySelector('.prod_mob i');

  // Toggle dropdown display
  if (dropdownMenu.classList.contains('show')) {
      // Remove show class for closing the dropdown
      dropdownMenu.classList.remove('show');
      buttonIcon.classList.remove('rotate');

      // Wait for the transition to finish before hiding the dropdown
      setTimeout(() => {
          dropdownMenu.style.display = 'none'; // Hide the dropdown
      }, 300); // Match this time to the transition duration
  } else {
      // Show the dropdown
      dropdownMenu.style.display = 'block'; // Show it first to calculate height
      // Use a timeout to ensure the display is set before adding the show class
      setTimeout(() => {
          dropdownMenu.classList.add('show');
          buttonIcon.classList.add('rotate'); // Rotate icon
      }, 10); // A small delay to allow the display to take effect
  }
}

// Ensure the dropdown is initially hidden
document.addEventListener('DOMContentLoaded', function () {
  const dropdownMenu = document.querySelector('.dropdown_menu');
  dropdownMenu.style.display = 'none'; // Hide it initially
});


function openBanner() {
  document.getElementById("visitBanner").style.display = "block";
  showmenufull.style.display="block";
  vistmodal.style.display="block";
}

// Function to close the banner
function closeBanner() {
  document.getElementById("visitBanner").style.display = "none";
  showmenufull.style.display="none";
  vistmodal.style.display="none";
}

// Optional: Close the banner if clicking outside of it
window.onclick = function(event) {
  var banner = document.getElementById("visitBanner");
  if (event.target == banner) {
      closeBanner();
  }
}

// code for window scrooll button



