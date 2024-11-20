const headerContent = `
    <div class="navbar">
        <div class="logo">
       <a href="index.html"><img src="/assets/imgs/logo/pareek-new-logo.png" alt="logo"></a> 
    </div>
    <div class="desktop-menu">
        <ul class="menubar">
            <li class="baritems"><a href="index.html">HOME</a></li>
            <li class="baritems"><a href="about.html">ABOUT US</a></li>
            <li class="baritems"><a href="product.html">PRODUCTS <button class="prod_disp"><i class="fa fa-angle-down"></i></button></a>
                <ul class="dropdown">
                    <div class="category-container"></div>
                </ul></li>
            <li class="baritems"><a href="service.html">SERVICES</a></li>
            <li class="baritems"><a href="dealership.html">DEALERSHIP</a></li>
            <li class="baritems"><a href="gallery.html">GALLERY</a></li>
            <li class="baritems"><a href="colour-palette.html">COLOUR PALETTE</a></li>
            <li class="baritems"><a href="contact.html">CONTACT US</a></li>
        </ul>
      </div>

      <button type="button" onclick="openmenu()" id="openn"><i class="flaticon-sort"></i></button>
      <div id="showmenufull"> </div> 
      <div id="showmenu" class="navbar-mobile-wrapper">
        <div class="logo logo_menu">
          <a href="index.html"><img src="/assets/imgs/logo/footer-logo.png" alt="logo"></a> 
       </div>
      
          <ul class="menubar-mobile">
            <li ><a href="index.html">HOME</a></li>
            <li ><a href="about.html">ABOUT US</a></li>
            <li ><a href="product.html">PRODUCTS </a><button class="prod_mob" onclick="opendropdown()"><i class="fa fa-angle-down"></i></button>
                <ul class="dropdown_menu">
                   <div class="category-container"></div>
                </ul></li>
            <li><a href="service.html">SERVICES</a></li>
            <li><a href="dealership.html">DEALERSHIP</a></li>
            <li><a href="gallery.html">GALLERY</a></li>
            <li><a href="colour-palette.html">COLOUR PALETTE</a></li>
            <li><a href="contact.html">CONTACT US</a></li>
            
        </ul>
             
      
        <button id="close" onclick="closemenu()">&times;</button>
        </div>
    </div>

`;

// Insert the footer content into the desired element, e.g., with the ID 'footer'
document.getElementById('navigationbar').innerHTML = headerContent;



document.addEventListener("DOMContentLoaded", function() {
    // Verify the button exists
    const button = document.getElementById("bookSiteButton");
    if (!button) {
        console.error("Button not found in DOM!");
        return;
    }
    console.log("Button found in DOM");
  
    // Scroll event listener
    window.addEventListener('scroll', function() {
        console.log("User scrolled");
  
        // Get the scroll position
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        console.log("Scroll position:", scrollTop);
  
        // Show button when scrolled 100px
        if (scrollTop > 350) {
            console.log("Showing button");
            button.style.display = "block";
        } else {
            console.log("Hiding button");
            button.style.display = "none";
        }
    });
  
    // Initial hide
    button.style.display = "none";
  });
  