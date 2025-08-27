function validateForm() {
 let navbar = document.querySelector(".navbar");
 let menuLinks = document.getElementById("menuLinks");

function toggleMenu() {
  menuLinks.classList.toggle("Show-Menu");
}




  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  function isValidEmail(email) {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    return pattern.test(email);
  }

  if (name === "" || email === "" || subject === "") {
    alert("All fields must be filled out");
    return false;
  }
  if (!isValidEmail(email)) {
    alert("Invalid email format");
    return false;
  }
  return true;
}
