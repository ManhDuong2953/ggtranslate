const wrapper = document.querySelector(".wrapper");
var inputWord = wrapper.querySelector(".input");
var showInfor = wrapper.querySelector(".word .detail")
var langs = wrapper.querySelectorAll(".language input")
var langscontainer = wrapper.querySelector(".language")



function data(result) {
    wrapper.classList.add("active")
    console.log(result[0][0][0])
    showInfor.innerHTML = `${result[0][0][0]}`;
}



langs.forEach(lang => {
    lang.addEventListener("click", e => {
        if (lang.checked === true) {
            langchoosed = lang.getAttribute("id");
            console.log(langchoosed)
        }
    })
})

inputWord.addEventListener("keyup", e => {
    inputWord.value = e.target.value.replace(/""/g,",")
    if (inputWord.focus) {
        wrapper.classList.remove("active")
    }
    if (e.key === "Enter" && inputWord.value) {
        fetchAPI(inputWord.value, langchoosed)
    }


})


function fetchAPI(word, langchoosed) {
    wrapper.classList.remove("active")
    var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langchoosed}&dt=t&q=${word}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(result => data(result, word))
        .catch(err => showInfor.innerHTML = `${word} is not found`);
}