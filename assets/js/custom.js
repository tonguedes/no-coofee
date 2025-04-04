const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const utmSource = urlParams.get("utm_source");
const utmCampaign = urlParams.get("utm_campaign");
const utmContent = urlParams.get("utm_content");
const utmTerm = urlParams.get("utm_term");

let origem = "";
let origem_completa = "";

if (utmSource) {
    if (utmSource === "google") {
        origem = "Google";
        origem_completa = `${utmCampaign}/${utmContent}/${utmTerm}`;
    } else if (utmSource === "facebook") {
        origem = "Facebook";
        origem_completa = `${utmCampaign}/${utmContent}`;
    }
} else {
    origem = "Orgânico";
    origem_completa = "Orgânico";
}

console.log(origem_completa);

// Atualizando valores nos campos do formulário
document.querySelectorAll('[id^="cf_duna_origem_lead"]').forEach(e => e.value = origem);
document.querySelectorAll('[id^="cf_duna_origem_completa"]').forEach(e => e.value = origem_completa);

document.addEventListener("DOMContentLoaded", function () {

    function showError(container, message, input) {
        container.innerHTML = message;
        container.classList.add("show");
        container.classList.remove("success");
        input.classList.add("error");
        input.classList.remove("success");
    }

    function clearError(container, input) {
        container.innerHTML = "";
        container.classList.remove("show");
        input.classList.remove("error");
        input.classList.add("success");
    }

    function validateForm(form) {
        let name = form.querySelector(".nome");
        let email = form.querySelector(".email");
        let phone = form.querySelector(".telefone");
        let errorContainer = form.querySelector(".error-message-container");

        let isValidName = name.value.length >= 3;
        let isValidEmail = email.value.length >= 6 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        let isValidPhone = /^\d{11,}$/.test(phone.value.replace(/[^\d]/g, ""));

        if (!isValidName) {
            showError(errorContainer, "Por favor, insira um nome válido com pelo menos 3 caracteres.", name);
            return false;
        }
        clearError(errorContainer, name);

        if (!isValidEmail) {
            showError(errorContainer, "Por favor, insira um e-mail válido com pelo menos 6 caracteres.", email);
            return false;
        }
        clearError(errorContainer, email);

        if (!isValidPhone) {
            showError(errorContainer, "Por favor, insira um telefone válido com pelo menos 11 caracteres.", phone);
            return false;
        }
        clearError(errorContainer, phone);

        return true;
    }

    function handleFormSubmission(selector) {
        let form = document.querySelector(selector);
        let submitButton = form.querySelector("button[type='submit']");
        let errorContainer = form.querySelector(".error-message-container");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            errorContainer.classList.remove("show", "success", "error");
            errorContainer.classList.add("carregando");

            setTimeout(function () {
                let isValid = validateForm(form);

                if (isValid) {
                    document.querySelectorAll(".sumir-btn, button[type='submit']").forEach(el => el.style.display = "none");

                    errorContainer.innerHTML = "Formulário enviado com sucesso!";
                    errorContainer.classList.add("show", "success");
                    errorContainer.classList.remove("error");

                    setTimeout(() => {
                        window.location.href = "sucesso.php";
                    }, 100);
                }
            }, 500);
        });

        form.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", function () {
                submitButton.disabled = !validateForm(form);
            });
        });
    }

    handleFormSubmission(".contact-form-1");
    handleFormSubmission(".contact-form-2");

});

// Atualizando botões de dados
document.querySelectorAll(".data-button").forEach(button => {
    button.addEventListener("click", function () {
        let buttonContent = this.getAttribute("data-button-content");

        document.querySelectorAll(".data-button-content").forEach(content => content.textContent = buttonContent);
        document.querySelectorAll(".local-form").forEach(input => input.value = buttonContent);
    });
});

// Máscara de telefone
document.querySelectorAll(".mask-tel").forEach(input => {
    input.addEventListener("input", event => {
        let value = event.target.value.replace(/\D/g, "");

        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, "($1");
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }

        event.target.value = value;
    });
});