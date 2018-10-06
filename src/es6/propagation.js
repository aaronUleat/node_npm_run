"use strict";

(function (w) {
    // Game
    var Game = function Game(el, option) {
        this.el = document.getElementById(el);
        this.option         = option;
        this.info_div       = document.createElement('div');
        this.info_div_id    = 'info_div';

        this.deck_div       = document.createElement("div");
        this.deck_div_id    = "check_div";
        this.gameDeck = new Deck(this.deck_div, option);
        this.gameDeck.buildDeck();

        this.el.appendChild(this.info_div);
        this.el.appendChild(this.deck_div);
    };

    var Deck = function(deck_div, option) {
        this.deckData = option.data;
        this.buildDeck = function() {
            var parentFrag = document.createDocumentFragment();
            deck_div.innerHTML = "";
            for (var i = this.deckData.length - 1; i >= 0; i--) {
                var card = new Card();
                card.id = "card-" + i;
                card.data = this.deckData[i];
                card.buildCard(parentFrag)
            }
            deck_div.appendChild(parentFrag);

        }
    }

    var Card = function() {
        this.id = "";
        this.data = "";

        this.cardCont = document.createElement("div");
        this.cardCont.className = "card_container";

        this.cardFront = document.createElement("div");
        this.cardFront.className = "card_front";

        this.cardBack = document.createElement("div");
        this.cardBack.className = "card_back";

        this.buildCard = function(parentFrag) {
            var flipDiv = document.createElement("div"),
                frontValDiv = document.createElement("div"),
                backValDiv = document.createElement("div"),
                catDiv = document.createElement("div");

            flipDiv.className = 'flip';
            frontValDiv.className = "front_val";
            backValDiv.className = "back_val";
            catDiv.className    = "cat_val";

            frontValDiv.innerHTML = this.data.q;
            backValDiv.innerHTML  = this.data.a;
            catDiv.innerHTML = this.data.category;

            this.cardFront.appendChild(frontValDiv);
            this.cardFront.appendChild(catDiv);
            this.cardBack.appendChild(backValDiv);

            flipDiv.appendChild(this.cardFront);
            flipDiv.appendChild(this.cardBack);

            this.cardCont.id = this.id;
            this.cardCont.appendChild(flipDiv);
            parentFrag.appendChild(this.cardCont);
        }
    }

    var DiscardPile = function() {

    }

    window.Game = Game;
})(window);