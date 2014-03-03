// -----------------------------------------------------------------------------
// Name: /public/js/game/components/terrain/abyss.js
// Author: Adam Barreiro
// Description: Abyss component.
// Updated: 25-02-2014
// -----------------------------------------------------------------------------

/**
 * abyss.js
 */
define (function() {

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

return {
    /**
     * Registers the component into the game.
     */
    registerComponent: function(edition) {
        Crafty.c('Abyss', {
            /**
             * Inits the component
             */
            init: function() {
                this.requires('Terrain, spr_abyss');
            }
        });
    }
};

});