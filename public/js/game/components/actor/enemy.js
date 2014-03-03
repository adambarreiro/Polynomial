// -----------------------------------------------------------------------------
// Name: /public/js/game/components/actor/enemy.js
// Author: Adam Barreiro Costa
// Description: Registers the enemy component
// Updated: 24-02-2014
// -----------------------------------------------------------------------------

/**
 * enemy.js
 * @dependency /public/js/game/components/actor/enemy/enemy1.js
 * @dependency /public/js/game/components/actor/enemy/enemy2.js
 * @dependency /public/js/game/components/actor/enemy/enemy3.js
 * @dependency /public/js/game/components/actor/enemy/enemy4.js
 * @dependency /public/js/game/components/actor/enemy/enemy5.js
 * @dependency /public/js/game/components/actor/enemy/patrol.js
 */
define (["./enemy/enemy1", "./enemy/enemy2","./enemy/enemy3","./enemy/enemy4","./enemy/enemy5","./enemy/patrol"], function(Enemy1, Enemy2, Enemy3, Enemy4, Enemy5, Patrol) {

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

var DAMAGE = 35;

/**
 * Registers all the child components.
 */
function createChildComponents(edition) {
    // Enemy + component
    Enemy1.registerComponent(edition);
    // Enemy - component
    Enemy2.registerComponent(edition);
    // Enemy * component
    Enemy3.registerComponent(edition);
    // Enemy (*) component
    Enemy4.registerComponent(edition);
    // Enemy / component
    Enemy5.registerComponent(edition);
    // Patrol component
    Patrol.registerComponent(edition);
}

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------
return {
    /**
     * Registers the component into the game.
     */
    registerComponent: function(edition) {
        Crafty.c('Enemy', {
            _enemyHealth: 100, // Health of the enemy
            /**
             * Substracts a random amount of life from the enemy's health.
             * @return boolean - If the enemy's dead it's true.
             */
            damage: function() {
                this._enemyHealth = this._enemyHealth - Math.floor(Math.random()*(DAMAGE-10+1)+10);
                if (this._enemyHealth > 0) {
                    $('#enemybar').css({"width": (this._enemyHealth*3) + "px"});
                    return false;
                } else {
                    $($(".lifebox").children()[2]).hide();
                    $($(".lifebox").children()[3]).hide();
                    $('#enemybar').css({"width": "300px"});
                    Crafty("Character")._enemy.destroy();
                    return true;
                }
            },
            /**
             * Starts all the components attached and events.
             */
            startEnemy: function() {
                this.addComponent("Patrol");
            },
            /**
             * Stops all the components attached.
             */
            stopEnemy: function() {
                this.removeComponent("Patrol");
                this.unbind("EnterFrame");
            },
            /**
             * Inits the component
             */
            init: function() {
                this.requires('Actor');
                this.z=5;
                if (!edition) {
                    this.gravity("Terrain").gravityConst(0.3);
                    this.startEnemy();
                }
            }
        });
        createChildComponents(edition);
    }
};
});