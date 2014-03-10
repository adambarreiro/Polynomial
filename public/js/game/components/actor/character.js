// -----------------------------------------------------------------------------
// Name: /public/js/game/components/actor/character.js
// Author: Adam Barreiro
// Description: Character component
// Updated: 25-02-2014
// -----------------------------------------------------------------------------

/**
 * character.js
 * @dependency /public/js/game/components/actor/character/battle.js
 * @dependency /public/js/game/components/actor/character/bonus.js
 * @dependency /public/js/game/components/actor/character/camera.js
 * @dependency /public/js/game/components/actor/character/damage.js
 * @dependency /public/js/game/components/actor/character/detection.js
 * @dependency /public/js/game/components/actor/character/movement.js
 * @dependency /public/js/game/components/actor/character/lava.js
 */
define (["./character/battle","./character/bonus","./character/camera","./character/damage","./character/detection","./character/movement","./character/lava"], function(Battle, Bonus, Camera, Damage, Detection, Movement, Lava) {

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

/**
 * Registers all the child components.
 */
function createChildComponents() {
    // Each component have some dependencies on another, so the order
    // is important and should not be changed.
    Camera.createComponent();
    Bonus.createComponent();
    Battle.createComponent();
    Damage.createComponent(); // Lava
    Lava.createComponent(); // Damage, Battle
    Movement.createComponent(); // Lava
    Detection.createComponent(); // Battle
}

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

return {
    /**
     * Registers the component into the game.
     */
    registerComponent: function(edition) {
        Crafty.c('Character', {
            _orientation: "right",
            _health: 100, // Health of the character
            _shield: 0, // Shield of the character
            stopAll: function() {
                // Kills components
                this.removeComponent("Camera");
                this.removeComponent("Detection");
                this.removeComponent("Lava");
                this.removeComponent("Battle");
                this.removeComponent("Movement");
                // Kills events
                this.unbind("EnterFrame");
                this.unbind("Moved");
                this.unbind("KeyDown");
                // Kills enemy events
                Crafty("Enemy").each(function(){
                    this.stopEnemy();
                });
            },
            startAll: function() {
                // Restarts components
                this.addComponent("Camera");
                this.addComponent("Detection");
                this.addComponent("Lava");
                this.addComponent("Battle");
                this.addComponent("Movement");
                // Restarts enemy events
                Crafty('Enemy').each(function() {
                    this.startEnemy();
                });
            },
            startCharacter: function() {
                this.addComponent("Camera");
                this.addComponent("Bonus");
                this.addComponent("Damage");
                this.addComponent("Lava");
                this.addComponent("Movement");
                this.addComponent("Detection");
                this.addComponent("Battle");
            },
            init: function() {
                this.requires('Actor, Keyboard, Multiway, spr_char');
                this.z=2;
                if (!edition) {
                    this.reel("CharMoveLeft",800,0,1,8);
                    this.reel("CharMoveRight",800,0,2,8);
                    this.reel("CharJumpLeft",300,0,3,3);
                    this.reel("CharJumpRight",300,0,4,3);
                    this.startCharacter();
                }
            }
        });
        createChildComponents();
    }
};

});