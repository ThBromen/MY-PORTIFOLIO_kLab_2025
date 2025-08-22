function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;

  if (name === "" || email === "" || subject === "") {
    alert("All fields must be filled out");
    return false;
  }
  return true;
}
