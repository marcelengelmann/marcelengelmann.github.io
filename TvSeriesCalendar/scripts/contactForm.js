const contactFormScript = {
    startUp() {
        //set eventlisteners for the contactForm content
        document.getElementById("contactSubmit").addEventListener("click", contactFormScript.formSubmitted);
        document.getElementById("contactCancel").addEventListener("click", contactFormScript.formCanceled);
    },
    close() {
        //remove the setted eventlisteners
        document.getElementById("contactSubmit").removeEventListener("click", contactFormScript.formSubmitted);
        document.getElementById("contactCancel").removeEventListener("click", contactFormScript.formCanceled);
    },
    //check validity of the form before submitting it
    formSubmitted(event) {
        event.preventDefault();
        const contactForm = document.getElementById("contactForm");
        if (contactForm.checkValidity()) {
            contactForm.submit();
            contactForm.reset();
        } else contactForm.reportValidity();
    },
    //reset the form, when user cancles the progress
    formCanceled(event) {
        event.preventDefault();
        document.getElementById("contactForm").reset();
    }
};