import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

let addPm = (ic = "success", pm) => {
  Toast.fire({
    icon: ic,
    title: pm,
  });
};

const deletePm = (pm, fu) => {
  Swal.fire({
    title: "Sind Sie Sicher ?",
    text: pm,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#032d7b",
    cancelButtonColor: "#eb2727",
    confirmButtonText: "Ja, Lösche es!",
  }).then((result) => {
    if (result.isConfirmed) {
      addPm("success", "Item wurde gelöscht");
      fu();
    }
  });
};

const backToMainPm = (link) => {
  Swal.fire({
    title: "Sind sie sicher?",
    text: "Sie haben Ihre Änderung noch nicht gespeichert ",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#032d7b",
    cancelButtonColor: "#eb2727",
    confirmButtonText: "Ja , verlassen",
  }).then((result) => {
    if (result.isConfirmed) {
      link();
    }
  });
};

const changeTheme = (link) => {
  Swal.fire({
    title: "Sind sie sicher?",
    text: "Wollen Sie wirklich Ihr Thema ändern ?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#032d7b",
    cancelButtonColor: "#eb2727",
    confirmButtonText: "Ja",
  }).then((result) => {
    if (result.isConfirmed) {
      link();
      addPm("success", "Ihr Thema wurde geändert");
    }
  });
};

export { addPm, deletePm, backToMainPm, changeTheme };
