'use strict';
function Ahorcado() {
    this.elems = {
        iniciar_btn: "[rel='iniciar-juego']",
        jumbotron: "[rel='jumbotron']",
        game_cont: "[rel='game-cont']",
        current_w: "[rel='current-word']",
        reload_game: "[rel='reload-game']",
        letter_btn: "[rel='letter-btn']",
        selected_letters: "[rel='selected-letters']"
    };
    this.palabras = [
        {palabra: 'GEMA', tip: ''}, {palabra: 'ARCA', tip: ''}, {palabra: 'FILA', tip: ''}, {palabra: "FIFA", tip: ''}, {palabra: "ARCO", tip: ''},
        {palabra: 'APIOS', tip: ''}, {palabra: "HORAS", tip: ''}, {palabra: 'CALDO', tip: ''}, {palabra: "DAMAS", tip: ''}, {palabra: "DEDOS", tip: ''},
        {palabra: 'FABULA', tip: ''}, {palabra: 'HABANO', tip: ''}, {palabra: 'JABALI', tip: ''}, {palabra: 'SABADO', tip: ''}, {palabra: 'TABACO', tip: ''},
        {palabra: 'CABALLO', tip: ''}, {palabra: 'FABRICA', tip: ''}, {palabra: 'MANAGUA', tip: ''}, {palabra: 'BARBERO', tip: ''}, {palabra: 'VACACIONES', tip: ''}
    ];
    this.cls = {
        h: "ahorcado--hidden",
        b: "ahorcado--show",
        disabled: 'disabled'
    };
    this.current_word = [];
    this.comp_word = [];
    this.cont_words = [];
}

Ahorcado.prototype.__ = function(element) {
  return document.querySelector(element);
};

Ahorcado.prototype.$ = function(element) {
    return document.querySelectorAll(element);
};


Ahorcado.prototype.generate_ramdom_num = function() {
    let self = this;
    return Math.floor( Math.random() * self.palabras.length );
};

Ahorcado.prototype.binds = function () {
    let self = this;
    self.__(self.elems.iniciar_btn).addEventListener("click", (_evt) => self.iniciarJuego(_evt, self) );
    self.__(self.elems.reload_game).addEventListener('click', (_evt) => self.reiniciarJuego(_evt, self));
    document.querySelectorAll(self.elems.letter_btn).forEach( (value, index) => {
        value.addEventListener('click', (_evt) => self.get_current_btn(_evt, self) );
    });
};

Ahorcado.prototype.clear_letters = function(element) {
    this.__(element).innerHTML = "";
};

Ahorcado.prototype.search_and_replace_words = function(letter) {
    let self = this;
    self.current_word.forEach((value, index) => {
        if (value.toLocaleLowerCase() == letter) {
            self.comp_word[index] = letter;
        }
    });
};

Ahorcado.prototype.disabled_btn = function(_evt) {
    _evt.currentTarget.classList.add(this.cls.disabled);
    _evt.currentTarget.setAttribute("disabled", "disabled");
};

Ahorcado.prototype.selectedLetters = function(letter) {
    let self = this;
    this.cont_words.push(`<span class="badge badge-light mr-1">${letter}</span>`);
    self.__(self.elems.selected_letters).innerHTML = this.cont_words.join("");
};


Ahorcado.prototype.get_current_btn = function(_evt, self) {
    let letter = _evt.currentTarget.getAttribute('data-letter');
    self.selectedLetters(letter);
    self.disabled_btn(_evt);
    self.clear_letters(self.elems.current_w);
    self.search_and_replace_words(letter);
    self.__(self.elems.current_w).innerHTML = self.comp_word.join("");
};

Ahorcado.prototype.reiniciarJuego = function(_evt, self) {
    self.__(self.elems.current_w).innerHTML = "";
    self.generarPalabra();
};

Ahorcado.prototype.iniciarJuego = function(_evt, self){
    self.__(self.elems.jumbotron).classList.add(self.cls.h);
    self.__(self.elems.game_cont).classList.remove(self.cls.h);
    self.generarPalabra();
};

Ahorcado.prototype.generarPalabra = function() {
    let self = this;
    let generate_word = this.palabras[self.generate_ramdom_num()].palabra;
    self.__(self.elems.current_w).innerHTML = generate_word;
    this.current_word = generate_word.split("");
    self.comp_word = [];
    this.current_word.forEach((value, index) => self.comp_word.push('_'));
    self.__(self.elems.current_w).innerHTML = this.comp_word.join("");
    console.log(this.current_word, 'currentword');
    console.log(this.comp_word, 'comp word');
};

const ah = new Ahorcado();
ah.binds();
