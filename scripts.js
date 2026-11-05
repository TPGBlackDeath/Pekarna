const form = document.getElementById("order-form");
const statusMessage = document.getElementById("form-status");

const messages = {
    ime: "Vnesite ime.",
    priimek: "Vnesite priimek.",
    email: "Vnesite veljaven e-mail.",
    izdelek: "Vnesite izdelek, ki ga želite naročiti.",
};

function validateField(field) {
    const value = field.value.trim();
    const valid = value !== "" && (field.type !== "email" || field.validity.valid);

    document.getElementById(`${field.id}-error`).textContent = valid ? "" : messages[field.name];
    field.setAttribute("aria-invalid", String(!valid));

    return valid;
}

// Clear a field's error as soon as the user corrects it.
form.addEventListener("input", (event) => {
    statusMessage.hidden = true;
    if (event.target.getAttribute("aria-invalid") === "true") {
        validateField(event.target);
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll("input, textarea")];
    const invalidFields = fields.filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
        statusMessage.hidden = true;
        invalidFields[0].focus();
        return;
    }

    // The site has no server yet, so the order is only confirmed on the page.
    form.reset();
    fields.forEach((field) => field.removeAttribute("aria-invalid"));
    statusMessage.textContent = "Hvala! Vaše naročilo je zabeleženo.";
    statusMessage.hidden = false;
});
