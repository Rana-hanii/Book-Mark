var markName = document.getElementById("markName");
var url = document.getElementById("url");
var display = document.getElementById("display");
var validationRules = document.getElementById("validationRules");

//check in local storage
var bookMarks;
if (localStorage.getItem("bookMarks")) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displayBookmark(bookMarks);
} else {
  bookMarks = [];
}

//save content det in object
function addBookmark() {
  if(isRepeated()){
    if (bookmarkValidation() && urlValidation()){
      var bookmark = {
        name: markName.value,
        url: url.value,
      };
      
      bookMarks.push(bookmark);
      displayBookmark(bookMarks);
      clearInputs();
      saveTolocalStorage();
    } else {
      console.log("error");
      validationAlert();
    }
  }else{
    validationAlert();
  }
}

//display bookmark
function displayBookmark(bMarks) {
  console.log(bMarks);
  var cartoona = "";
  for (var i = 0; i < bMarks.length; i++) {
    cartoona += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${bMarks[i].name}</td>
                            <td><button onclick="window.open('${
                              bMarks[i].url
                            }', '_blank')" class="btn btn-outline-success"><i
                                        class="fa-solid fa-eye mx-2"></i>Visite</button></td>
                            <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger"><i
                                        class="fa-solid fa-trash mx-2"></i>Delete</button></td>
                        </tr>
                    `;
  }
  display.innerHTML = cartoona;
}

//clear >> inputs after add
function clearInputs() {
  markName.value = null;
  url.value = null;
  url.classList.remove("is-invalid");
  url.classList.remove("is-valid");
  markName.classList.remove("is-valid");
  markName.classList.remove("is-invalid");
}
//delete
function deleteBookmark(index) {
  bookMarks.splice(index, 1);
  displayBookmark(bookMarks);
  saveTolocalStorage();
}
//refresh>>local storage
function saveTolocalStorage() {
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
}
//validation
function bookmarkValidation() {
  var regex = /^[a-zA-Z0-9\s-]+$/;
  if (regex.test(markName.value)) {
    markName.classList.add("is-valid");
    markName.classList.remove("is-invalid");
    return true;
  } else {
    markName.classList.add("is-invalid");
    markName.classList.remove("is-valid");
    return false;
  }
}
function urlValidation() {
  var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (regex.test(url.value)) {
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");
    return true;
  } else {
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");
    return false;
  }
}
//Alert
function validationAlert() {
  validationRules.classList.replace("d-none", "d-block");
}

//Close Alert
function closeAlert() {
  validationRules.classList.add("d-none");
}

//to check redundent name
function isRepeated() {
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name === markName.value) {
      console.log("false")
      return false;
    }
  }
  return true;
}
