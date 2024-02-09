function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    if (validateForm()) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Thank you for your message!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      // Uncomment the line below to submit the form
      // form.submit();
    }
  });

  function validateForm() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    // Reset previous error messages
    resetErrorMessages();

    // Validate Full Name
    if (fullName.trim() === "") {
      displayErrorMessage("fullNameError", "Please enter your full name.");
      return false;
    }

    // Check if full name contains numbers
    if (/\d/.test(fullName)) {
      displayErrorMessage(
        "fullNameError",
        "Full name must not contain any numbers."
      );
      return false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayErrorMessage("emailError", "Please enter a valid email address.");
      return false;
    }

    // Validate Message
    if (message.trim() === "") {
      displayErrorMessage("messageError", "Please enter your message.");
      return false;
    }

    // If all validations pass, return true
    return true;
  }

  function displayErrorMessage(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.innerText = message;
    errorElement.style.display = "block";
  }

  function resetErrorMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(function (element) {
      element.innerText = "";
      element.style.display = "none";
    });
  }
});

/** ----------- Navbar ----------- */
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
