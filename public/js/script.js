(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Debug code for flash messages
document.addEventListener("DOMContentLoaded", function () {
  // Check for flash messages
  const successFlash = document.querySelector(".alert-success");
  const errorFlash = document.querySelector(".alert-danger");

  if (successFlash) {
    console.log(
      "Success flash message is present:",
      successFlash.textContent.trim()
    );
  }
  if (errorFlash) {
    console.log(
      "Error flash message is present:",
      errorFlash.textContent.trim()
    );
  }

  // Monitor flash message dismissal
  const flashMessages = document.querySelectorAll(".alert");
  flashMessages.forEach((flash) => {
    flash.addEventListener("closed.bs.alert", function () {
      console.log("Flash message was dismissed:", this.textContent.trim());
    });
  });
});
