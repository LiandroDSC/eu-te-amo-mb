// Variáveis
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Função que redimensiona as notas
function resize_notes() {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].classList.contains("active")) {
            notes[i].classList.remove("active");
            notes[i].style.height = "30%";
        }
    }
}

// Função principal que habilita todas as notas
function notes_ready() {
    for (let i = 0; i < notes.length; i++) {
        notes[i].addEventListener("click", function () {
            if (mobile_media_query.matches) {
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    this.style.height = "30%";
                } else {
                    for (let j = 0; j < notes.length; j++) {
                        if (notes[j].classList.contains("active")) {
                            notes[j].classList.remove("active");
                            notes[j].style.height = "30%";
                        }
                    }
                    this.classList.add("active");
                    this.style.height = "150%"; // Aumenta a altura para 160% quando clicado
                }
            } else if (tablet_media_query.matches) {
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    this.style.height = "30%";
                } else {
                    for (let j = 0; j < notes.length; j++) {
                        if (notes[j].classList.contains("active")) {
                            notes[j].classList.remove("active");
                            notes[j].style.height = "30%";
                        }
                    }
                    this.classList.add("active");
                    this.style.height = "130%"; // Aumenta a altura para 130% quando clicado
                }
            } else {
                if (this.classList.contains("active")) {
                    this.classList.remove("active");
                    this.style.height = "30%";
                } else {
                    for (let j = 0; j < notes.length; j++) {
                        if (notes[j].classList.contains("active")) {
                            notes[j].classList.remove("active");
                            notes[j].style.height = "30%";
                        }
                    }
                    this.classList.add("active");
                    this.style.height = "120%"; // Aumenta a altura para 120% quando clicado
                }
            }
        });
    }
}

// Função que configura o papel superior do envelope
function set_up_paper() {
    const upPaper = document.querySelector(".js-up-paper");
    const arr = [0, 0, 100, 0, 50, 61];
    upPaper.style.bottom = "97%";
    upPaper.style.transform = "rotate(180deg)";
    upPaper.style.zIndex = "200";
    upPaper.style.clipPath = "polygon(" + arr.join("%,") + "%)";
    notes_ready();
}

// Função que inicia a transição do papel superior do envelope
function envelop_transition() {
    const upPaper = document.querySelector(".js-up-paper");
    upPaper.style.bottom = "1%";
    setTimeout(set_up_paper, 250); // Delay de 250ms para simular a transição
    upPaper.removeEventListener("click", envelop_transition);
    upPaper.classList.remove("cursor");
}

// Função para cortar o adesivo
function sticker() {
    const sticker = document.querySelector(".js-sticker");
    sticker.style.width = "20%";
    sticker.style.left = "-80%";
    document.body.classList.remove("scissors");
    sticker.removeEventListener("click", sticker);
    const upPaper = document.querySelector(".js-up-paper");
    upPaper.addEventListener("click", envelop_transition);
    upPaper.classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function (event) {
    resize_notes();
};
