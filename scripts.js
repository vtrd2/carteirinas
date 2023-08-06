let lojas = [];
var content = document.getElementById("unic-content")

fetch('/dados/data.json')
    .then(response => response.json())
    .then(data => {
        lojas = data;
        console.log(lojas)
        generateFichas(lojas)
    })

function generateFichas(listaLojas) {
    for (let i = 0; i < listaLojas.length; i++) {
        const loja = listaLojas[i]
        const newElement = `<div class="ficha" id="${loja["nome"]}"><p class="texto_loja">${loja["nome"]}</p><div class="content_ficha"><p class="desconto">${loja["desconto_curto"]}</p><button class="info_button" onClick="showCompleteInfos('${loja["nome"]}')"><img class="info_img" src="images/info-circle-svgrepo-com.svg" alt="info"></button></div></div>`
        content.insertAdjacentHTML("beforeend", newElement)
    }
}

function removeFichas() {
    fichas = [...content.getElementsByClassName("ficha")]
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i]
        ficha.remove()
    }
}

function removeLongContent() {
    longContent = content.getElementsByClassName("long-content")[0]
    longContent.remove()
}

function showFichasFromLongContent() {
    removeLongContent()
    generateFichas(lojas)
}

function showCompleteInfos(nome) {
    removeFichas()

    for (let i = 0; i < lojas.length; i++) {
        loja = lojas[i]
        if (loja['nome'] === nome) {
            break;
        }
    }

    const newElement = `<div class="long-content"><div class="botao-voltar"><button class="back_button" onClick="showFichasFromLongContent()"><img class="info_img" src="images/back-square-svgrepo-com.svg" alt="voltar"></button></div><div class="text-content"><div class="title-text-content"><p>${loja['nome']}</p></div><div class="desconto-text-content"><p class="long-desconto">${loja['desconto_longo']}</p></div><div class="instagram"><a class="link-insta" href="${loja['instagram']}"><img src="images/instagram-svgrepo-com 1.svg" alt="instagram" class="info_img" id="insta"><p>${loja['arroba']}</p></a></div></div></div>`
    content.insertAdjacentHTML("beforeend", newElement)
}
