async function submitForm(evt, form) {
    evt.preventDefault();

    const btnSubmit = document.getElementById("btnSubmit");
    let origBtnHTML = btnSubmit.innerHTML;
    btnSubmit.innerHTML = "<span class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\"></span> Processing...";
    btnSubmit.disabled = true;

    let successAlert = document.getElementById("successAlert");
    if (!successAlert.classList.contains("d-none")) {
        successAlert.classList.add("d-none");
    }

    let errorAlert = document.getElementById("errorAlert");
    if (!errorAlert.classList.contains("d-none")) {
        errorAlert.classList.add("d-none");
    }

    const formData = new FormData(form).entries()
    const response = await fetch('https://2ts9gfjuk6.execute-api.us-east-1.amazonaws.com/mobile-price-classification', {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "https://pushkar.io/",
            "Access-Control-Allow-Headers": "POST",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    }).catch(err => console.log(err));

    if (response.ok) {
        const result = await response.json();

        document.getElementById("pred-num").innerHTML = result["price-range-num"];
        document.getElementById("pred-cat").innerHTML = result["price-range-str"];

        document.getElementById("successAlert").classList.remove("d-none");
    }
    else {
        document.getElementById("errorAlert").classList.remove("d-none");
    }

    btnSubmit.innerHTML = origBtnHTML;
    btnSubmit.disabled = false;

    return response;

}

const classifierForm = document.querySelector("#classifierForm");
if (classifierForm) {
    classifierForm.addEventListener("submit", function (evt) {

        if (!classifierForm.checkValidity()) {
            evt.preventDefault()
            evt.stopPropagation()
        }
        else {
            let response = submitForm(evt, this);
        }
        classifierForm.classList.add('was-validated')
    });
}