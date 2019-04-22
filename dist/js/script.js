'use strict';
console.log("test");
function Ahorcado() {
    this.elems = {
        iniciar_btn: "[rel='iniciar-juego']",
        jumbotron: "[rel='jumbotron']",
        game_cont: "[rel='game-cont']",
        current_w: "[rel='current-word']",
        reload_game: "[rel='reload-game']",
        letter_btn: "[rel='letter-btn']",
        selected_letters: "[rel='selected-letters']",
        badge_counter: "[rel='badge-counter']",
        modal_win: "[rel='modal-win']",
        punto_user: "[rel='punto-jugador']",
        punto_maq: "[rel='punto-maquina']",
        generar_pista_btn: "[rel='gen-pista']",
        pista_copy: "[rel='pista-copy']"
    };
    this.palabras = [
        {palabra: 'GEMA', tip: 'Piedra preciosa.'}, {palabra: 'ARCA', tip: 'Embarcacion'}, {palabra: 'FILA', tip: 'Serie de personas o cosas colocadas una tras otra en línea'}, {palabra: "FIFA", tip: 'Institucion Mundial'}, {palabra: "ARCO", tip: ' Arma hecha de una varilla de acero, madera u otra materia elástica.'},
        {palabra: 'APIOS', tip: 'Planta hortícola de tallo jugoso'}, {palabra: "HORAS", tip: 'Para marcar el tiempo.'}, {palabra: 'CALDO', tip: 'Líquido sustancioso que se obtiene de la cocción en agua abundante de algún alimento'}, {palabra: "DAMAS", tip: 'Nombre femenino plural'}, {palabra: "DEDOS", tip: 'Extremidades de la mano y del pie del ser humano y de otros animales como los grandes simios'},
        {palabra: 'FABULA', tip: 'Relato o composición literaria en prosa o en verso que proporciona una enseñanza o consejo moral.'}, {palabra: 'HABANO', tip: 'Cigarro puro elaborado en la isla de Cuba.'}, {palabra: 'JABALI', tip: 'Mamífero paquidermo de la familia del cerdo'}, {palabra: 'SABADO', tip: 'Sexto día de la semana civil'}, {palabra: 'TABACO', tip: 'Hoja de esta planta que, curada y preparada, se fuma, se masca o se aspira en forma de rapé.'},
        {palabra: 'CABALLO', tip: 'Mamífero équido, macho, de tamaño mediano o grande.'}, {palabra: 'FABRICA', tip: 'Establecimiento con las instalaciones y la maquinaria necesarias para confeccionar un producto'}, {palabra: 'MANAGUA', tip: 'Ciudad del Pais Nicaragua.'}, {palabra: 'BARBERO', tip: 'Hombre que tiene por oficio afeitar, cortar y arreglar la barba, el bigote y el pelo a los hombres.'}, {palabra: 'VACACIONES', tip: 'Hace referencia al descanso de una actividad habitual.'}
    ];
    this.cls = {
        h: "ahorcado--hidden",
        b: "ahorcado--show",
        disabled: 'disabled'
    };
    this.current_word = [];
    this.comp_word = [];
    this.cont_words = [];
    this.chances = 0;
    this.puntos = {
        maquina: 0,
        user: 0
    };
    this.store_word = null;
}
Ahorcado.prototype.addChanches = function() {
    this.chances++;
}
Ahorcado.prototype.__ = function(element) {
    return document.querySelector(element);
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
    self.__(self.elems.generar_pista_btn).addEventListener("click", (_evt) => self.generarPista(_evt) )
};

Ahorcado.prototype.enableGenPista = function() {
    this.__(this.elems.pista_copy ).classList.remove(this.cls.h);
    this.__(this.elems.pista_copy ).innerHTML = "";
    this.__(this.elems.generar_pista_btn).removeAttribute("disabled");
    this.__(this.elems.generar_pista_btn).classList.remove(this.cls.disabled);
};

Ahorcado.prototype.printTip = function() {
    this.__(this.elems.pista_copy ).classList.remove(this.cls.h);
    this.__(this.elems.pista_copy ).innerHTML = this.store_word.tip;
    this.__(this.elems.generar_pista_btn).setAttribute("disabled", "disabled");
    this.__(this.elems.generar_pista_btn).classList.add(this.cls.disabled);
    this.handle_chances();
};

Ahorcado.prototype.generarPista = function(_evt){
    let conf = confirm("Si desea generar una pista perdera un turno. Desea continuar?");
    if (conf) {
        return this.printTip();
    }
    return false;
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
    self.handle_chances();
    setTimeout( () => self.handle_winings(), 200 )
    self.__(self.elems.current_w).innerHTML = self.comp_word.join("");
};
Ahorcado.prototype.handle_chances = function() {
    this.addChanches();
    console.log(this.comp_word.join("").includes("_"));
    if (this.chances < 10 ) {
        return this.__(this.elems.badge_counter).innerHTML = this.chances;
    }
    return this.outChances();
}
Ahorcado.prototype.resetAll = function() {
    this.reiniciarJuego();
    this.enableLetterButtons();
    this.clearSelectedLetters();
    this.restartChanches();
}

Ahorcado.prototype.outChances = function() {
    this.puntos.maquina++;
    this.__(this.elems.punto_maq).innerHTML = this.puntos.maquina;
    let conf = confirm("Has Perdido:( Deseas seguir jugando?");
    if (conf) {
        this.resetAll();
    } else {
        window.location.reload();
    }
}

Ahorcado.prototype.restartChanches = function() {
    this.chances = 0;
    this.__(this.elems.badge_counter).innerHTML = this.chances;
}

Ahorcado.prototype.clearSelectedLetters = function() {
    this.cont_words = [];
    this.__(this.elems.selected_letters).innerHTML = "";
}

Ahorcado.prototype.enableLetterButtons = function() {
    document.querySelectorAll(this.elems.letter_btn).forEach((value, index) => {
        value.classList.remove('disabled');
        value.removeAttribute('disabled');
    });
}

Ahorcado.prototype.handle_winings = function() {
    if ( ! this.comp_word.join("").includes("_") ) {
        this.puntos.user++;
        this.__(this.elems.punto_user).innerHTML = this.puntos.user;
        let conf = confirm("Has ganado!!! Deseas jugar de nuevo?");
        if (conf) {
            this.reiniciarJuego();
            this.enableLetterButtons();
            this.clearSelectedLetters();
            this.restartChanches();
        } else {
            window.location.reload();
        }
    }
}

Ahorcado.prototype.reiniciarJuego = function(_evt) {
    this.__(this.elems.current_w).innerHTML = "";
    this.enableLetterButtons();
    this.clearSelectedLetters();
    this.restartChanches();
    this.generarPalabra();
    this.enableGenPista();
};
Ahorcado.prototype.iniciarJuego = function(_evt, self){
    self.__(self.elems.jumbotron).classList.add(self.cls.h);
    self.__(self.elems.game_cont).classList.remove(self.cls.h);
    self.generarPalabra();
};
Ahorcado.prototype.generarPalabra = function() {
    let self = this;
    let num_gen = self.generate_ramdom_num();
    self.store_word = this.palabras[num_gen];
    let generate_word = this.palabras[num_gen].palabra;
    self.__(self.elems.current_w).innerHTML = generate_word;
    this.current_word = generate_word.split("");
    self.comp_word = [];
    this.current_word.forEach((value, index) => self.comp_word.push('_'));
    self.__(self.elems.current_w).innerHTML = this.comp_word.join("");
    console.log(self.store_word, "this is self");
    console.log(this.current_word, 'currentword');
    console.log(this.comp_word, 'comp word');
};
const ah = new Ahorcado();
ah.binds();
