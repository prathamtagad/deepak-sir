const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const submitButton = document.querySelector("#submit-button");
const formMessage = document.querySelector("#form-message");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const toast = document.querySelector("#toast");
const toastText = document.querySelector("#toast-text");
let toastTimer;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, errorElement, message) {
  const wrapper = input.closest(".input-wrap");
  wrapper.classList.toggle("invalid", Boolean(message));
  wrapper.classList.remove("valid");
  input.setAttribute("aria-invalid", message ? "true" : "false");
  errorElement.textContent = message;
}

function validateEmail() {
  const value = emailInput.value.trim();
  let message = "";

  if (!value) message = "Please enter your email address.";
  else if (!emailPattern.test(value)) message = "Enter a valid email address.";

  setError(emailInput, emailError, message);
  if (!message) emailInput.closest(".input-wrap").classList.add("valid");
  return !message;
}

function validatePassword() {
  const value = passwordInput.value;
  let message = "";

  if (!value) message = "Please enter your password.";
  else if (value.length < 6) message = "Your password must be at least 6 characters.";

  setError(passwordInput, passwordError, message);
  if (!message) passwordInput.closest(".input-wrap").classList.add("valid");
  return !message;
}

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

passwordToggle.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  passwordToggle.classList.toggle("is-visible", shouldShow);
  passwordToggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  passwordToggle.setAttribute("aria-pressed", String(shouldShow));
  passwordInput.focus();
});

emailInput.addEventListener("blur", () => {
  if (emailInput.value.trim()) validateEmail();
});

passwordInput.addEventListener("blur", () => {
  if (passwordInput.value) validatePassword();
});

emailInput.addEventListener("input", () => {
  if (emailError.textContent || emailInput.closest(".input-wrap").classList.contains("valid")) validateEmail();
});

passwordInput.addEventListener("input", () => {
  if (passwordError.textContent || passwordInput.closest(".input-wrap").classList.contains("valid")) validatePassword();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const emailIsValid = validateEmail();
  const passwordIsValid = validatePassword();

  if (!emailIsValid || !passwordIsValid) {
    (!emailIsValid ? emailInput : passwordInput).focus();
    return;
  }

  submitButton.classList.add("loading");
  submitButton.setAttribute("aria-label", "Signing in");

  setTimeout(() => {
    submitButton.classList.remove("loading");
    submitButton.removeAttribute("aria-label");
    formMessage.textContent = "Your form looks good. Connect your authentication to sign in.";
    showToast("Form validated successfully!");
  }, 950);
});

document.querySelector("#forgot-link").addEventListener("click", (event) => {
  event.preventDefault();
  if (!validateEmail()) {
    emailInput.focus();
    emailError.textContent = "Enter your email to continue with password recovery.";
    return;
  }
  showToast("Connect your password recovery flow here.");
});

document.querySelector("#signup-link").addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Connect your registration page here.");
});