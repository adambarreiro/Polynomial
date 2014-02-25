// -----------------------------------------------------------------------------
// Name: /public/js/game/components/item/exit.js
// Author: Adam Barreiro
// Description: Exit component.
// Updated: 25-02-2014
// -----------------------------------------------------------------------------

/**
 * exit.js
 * @dependency /public/js/game/scenes.js
 */
define (["../../../scenes"], function(Scenes) {

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

return {
    /**
     * Registers the component into the game.
     */
    registerComponent: function(edition) {
        Crafty.c('Exit', {
            /**
             * Starts all the components attached and events.
             */
            startAll: function() {
                this.addComponent("Collision");
                this.bind("EnterFrame", function(e) {
                    if(this.hit('Character')){
                        Crafty('Character').stopAll();
                        Scenes.nextLevel();
                    }
                });
            },
            /**
             * Inits the component
             */
            init: function() {
                this.requires('Item, spr_exit');
                if (!edition) this.startAll();
            }
        });
    }
};

});