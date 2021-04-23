function sendMail(contactForm) {
    emailjs.send("service_dwqe96l", "Trivia World Contact", {
            "first_name": contactForm.firstname.value,
            "last_name": contactForm.lastname.value,
            "from_email": contactForm.emailaddress.value,
            "quiz_idea": contactForm.quizidea.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    document.getElementById("contact-form").reset();
    return false;
}