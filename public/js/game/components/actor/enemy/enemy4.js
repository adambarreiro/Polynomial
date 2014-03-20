// -----------------------------------------------------------------------------
// Name: /public/js/game/components/actor/enemy/enemy4.js
// Author: Adam Barreiro
// Description: Enemy 4 component.
// Updated: 25-02-2014
// -----------------------------------------------------------------------------

/**
 * enemy4.js
 * @dependency /public/js/game/scenes.js
 */
define (["../../../scenes"],function(Scenes) {

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

return {
    /**
     * Registers the component into the game.
     */
    registerComponent: function(edition) {
        Crafty.c('Enemy4', {
            /**
             * Inits the component
             */
            init: function() {
                this.requires('Enemy, spr_enemy4');
                if (!edition) {
                    this.reel("EnemyAnimationLeft",400,0,1,4);
                    this.reel("EnemyAnimationRight",400,0,0,4);
                    this._id = Scenes.generateMultiplayerId();
                }
            }
        });
    }
        
};

});