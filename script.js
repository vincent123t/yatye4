// initialisation du booléen d'erreur sur un champ du formulaire
let errorForm = true;

// effacement du message d'erreur après 2 secondes
function deleteError(tag) {
  const target = document.getElementById(tag);
  target.innerText = "";
  target.classList.remove("err-style");
}

// effacement du message du mail envoyé avec succès après 5 secondes puis retour à l'accueil
function deleteSuccess(tag) {
  const target = document.getElementById(tag);
  target.innerText = "";
  target.classList.remove("success-style");
  window.location.href = "index.html";
}

// vérification de l'input selon la rule et les paramètres transmis
function inputValidation(input, rule, msgTag, msg) {
  target = document.getElementById(input);
  console.log("rule : ", rule, "target : ", target.value);
  if (rule.test(target.value)) {
    document.getElementById(msgTag).innerText = "";
    errorForm = false;
    console.log("ok sur : ", input, " errorForm = ", errorForm);
  } else {
    document.getElementById(msgTag).innerText = msg;
    document.getElementById(msgTag).classList.add("err-style");
    setTimeout(deleteError, 3000, msgTag);
    errorForm = true;
    console.log("erreur sur : ", input, " errorForm = ", errorForm);
  }
}

// mise en place de l'écouteur sur le titre pour retour vers la page d'accueil (index) sur clic
const goHome = document.getElementsByTagName("h1")[0];
goHome.addEventListener("click", function (e) {
  window.location.href = "index.html";
});

// mise en place de l'écouteur sur le bouton 'Envoyer' du formulaire de contact
// + contrôle des champs saisis
const sendMail = document.getElementById("contact-form");
sendMail.addEventListener("submit", function (e) {
  e.preventDefault();

  // vérification des données entrées dans chacun des champs du formulaire
  console.log("errorForm avant = ", errorForm);
  inputValidation("email", /^[a-z0-9._-]{2,30}[@][a-z0-9_-]{2,20}[.][a-z]{2,15}$/, "err-mail", "Veuillez entrer une adresse email valide");
  if (errorForm) { console.log("retour erreur mail"); return };
  inputValidation("subject", /^[A-Za-z0-9àâçéèêïîôùû()?!.,;:' +-]{4,80}$/, "err-subject", "Le sujet doit contenir de 4 à 40 caractères");
  if (errorForm) { console.log("retour erreur mail"); return };
  inputValidation("message", /^[A-Za-z0-9àâçéèêïîôùû()?!.,;:' +-]{40,4000}$/, "err-message", "Le message doit contenir de 40 à 4000 caractères");
  if (errorForm) { console.log("retour erreur mail"); return };
  console.log("errorForm après = ", errorForm);

  /*const serviceID = "service_do2l5me";*/
  const serviceID = "yatye_gallery_service";
  /*const templateID = "template_v3v92by";*/
  const templateID = "yatye_gallery_template";

  emailjs.sendForm(serviceID, templateID, '#contact-form')
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      document.getElementById("send-success").innerHTML = "Message envoyé avec succès";
      document.getElementById("send-success").classList.add("success-style");
      setTimeout(deleteSuccess, 5000, "send-success");
    }, function (error) {
      console.log('FAILED...', error);
    });

});
