// -----------------------------------------------------------------------------
// Name: /public/js/game/components/actor/character/mimic.js
// Author: Adam Barreiro
// Description: Multiplayer character component
// Updated: 25-02-2014
// -----------------------------------------------------------------------------

/**
 * mimic.js
 * @dependency /public/js/game/network/connector.js
 * @dependency /public/js/game/network/creator.js
 * @dependency /public/js/game/network/scenes.js
 * @dependency /public/js/game/network/multi.js
 */
define (["../../../network/connector", "../../../network/creator", "../../../scenes", "../../../multi",], function(Connector, Creator, Scenes, Multi) {

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var TYPE;

/**
 * Function fired when we receive that the other player has moved.
 */
function onReceiveMovement() {
    switch(TYPE) {
        case "connector":
            Connector.onReceiveMovement(function(data) {
                if (data.x === 666 && data.y === 666) {
                    Crafty("Multiplayer").pauseAnimation();
                    Crafty("Multiplayer").sprite(0,0);
                } else if (data.x === -666 && data.y === -666) {
                    Crafty("Multiplayer").pauseAnimation();
                    Crafty("Multiplayer").sprite(1,0);
                } else if (data.x === 333 && data.y === 333) {
                    Crafty("Multiplayer")._up = false;
                    if (Crafty("Multiplayer")._orientation == "left") {
                        Crafty("Multiplayer").sprite(1,0);
                    } else {
                        Crafty("Multiplayer").sprite(0,0);
                    }
                } else {
                    Crafty("Multiplayer").x = data.x;
                    Crafty("Multiplayer").y = data.y;
                }
            });
            break;
        case "creator":
            Creator.onReceiveMovement(function(data) {
                if (data.x === 666 && data.y === 666) {
                    Crafty("Multiplayer").pauseAnimation();
                    Crafty("Multiplayer").sprite(0,0);
                } else if (data.x === -666 && data.y === -666) {
                    Crafty("Multiplayer").pauseAnimation();
                    Crafty("Multiplayer").sprite(1,0);
                } else if (data.x === 333 && data.y === 333) {
                    Crafty("Multiplayer")._up = false;
                    if (Crafty("Multiplayer")._orientation == "left") {
                        Crafty("Multiplayer").sprite(1,0);
                    } else {
                        Crafty("Multiplayer").sprite(0,0);
                    }
                } else {
                    Crafty("Multiplayer").x = data.x;
                    Crafty("Multiplayer").y = data.y;
                }
            });
            break;
        default: break;
    }
}

/**
 * Function fired when we receive a next level event.
 */
function onReceiveExit() {
    switch(TYPE) {
        case "connector":
            Connector.onReceiveExit(function() {
                Crafty('Character').stopAll();
                Scenes.nextLevel();
            });
            break;
        case "creator":
            Creator.onReceiveExit(function() {
                Crafty('Character').stopAll();
                Scenes.nextLevel();
            });
            break;
        default: break;
    }
}

/**
 * Function fired when we receive that an enemy's been damaged
 */
function onReceiveDamage() {
    switch(TYPE) {
        case "connector":
            Connector.onReceiveDamage(function(data) {
                Crafty.audio.play("attack");
                Crafty.audio.play("monster_scream");
                Crafty(data.enemy)._enemyHealth = Crafty(data.enemy)._enemyHealth - data.damage;
                if (Crafty(data.enemy)._enemyHealth > 0) {
                    // We're fighting the same enemy
                    if (Crafty("Character")._battleFighting && Crafty("Character")._detectionEnemy[0] === data.enemy) {
                        $('#enemybar').css({"width": (Crafty(data.enemy)._enemyHealth*3) + "px"});
                    }
                } else {
                    Crafty.audio.play("enemy_death");
                    // We're fighting the same enemy
                    if (Crafty("Character")._battleFighting && Crafty("Character")._detectionEnemy !== undefined && Crafty("Character")._detectionEnemy[0] === data.enemy) {
                        $($(".lifebox").children()[2]).hide();
                        $($(".lifebox").children()[3]).hide();
                        $('#enemybar').css({"width": "300px"});
                        Crafty("Character").clearBattle();
                        Crafty.audio.stop("alert");
                        Crafty.audio.stop("hidden");
                        Crafty.audio.play("level",-1);
                        if (Crafty("Character")._extraTime > 0) {
                            Crafty("Character")._extraTime--;
                            if (Crafty("Character")._extraTime === 0) {
                                Crafty("Character").removeBonus("clock");
                            }
                        }
                        Crafty("Character")._battleFighting = false;
                        Crafty("Character").startAll();
                    }
                    Crafty(data.enemy).destroy();
                }
            });
            break;
        case "creator":
            Creator.onReceiveDamage(function(data) {
                Crafty.audio.play("attack");
                Crafty.audio.play("monster_scream");
                Crafty(data.enemy)._enemyHealth = Crafty(data.enemy)._enemyHealth - data.damage;
                if (Crafty(data.enemy)._enemyHealth > 0) {
                    // We're fighting the same enemy
                    if (Crafty("Character")._battleFighting && Crafty("Character")._detectionEnemy !== undefined && Crafty("Character")._detectionEnemy[0] === data.enemy) {
                        $('#enemybar').css({"width": (Crafty(data.enemy)._enemyHealth*3) + "px"});
                    }
                } else {
                    Crafty.audio.play("enemy_death");
                    // We're fighting the same enemy
                    if (Crafty("Character")._battleFighting && Crafty("Character")._detectionEnemy !== undefined && Crafty("Character")._detectionEnemy[0] === data.enemy) {
                        $($(".lifebox").children()[2]).hide();
                        $($(".lifebox").children()[3]).hide();
                        $('#enemybar').css({"width": "300px"});
                        Crafty("Character").clearBattle();
                        Crafty.audio.stop("alert");
                        Crafty.audio.stop("hidden");
                        Crafty.audio.play("level",-1);
                        if (Crafty("Character")._extraTime > 0) {
                            Crafty("Character")._extraTime--;
                            if (Crafty("Character")._extraTime === 0) {
                                Crafty("Character").removeBonus("clock");
                            }
                        }
                        Crafty("Character")._battleFighting = false;
                        Crafty("Character").startAll();
                    }
                    Crafty(data.enemy).destroy();
                }
            });
            break;
        default: break;
    }
}

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

return {
    /**
     * Creates the component.
     */
    createComponent: function(edition) {
        Crafty.c('Mimic', {
            _multiJumped: false,
            /**
             * Function called to retransmit the damage of an enemy
             */
            multiplayerDamage: function(enemy, damage) {
                switch(TYPE) {
                    case "connector": Connector.sendDamage(enemy, damage); break;
                    case "creator": Creator.sendDamage(enemy, damage); break;
                    default: break;
                }
            },
            /**
             * Function called to retransmit the next level event
             */
            multiplayerExit: function() {
                switch(TYPE) {
                    case "connector": Connector.sendExit(); break;
                    case "creator": Creator.sendExit(); break;
                    default: break;
                }
            },
            /**
             * Function called to retransmit the character movement.
             */
            multiplayerMove: function() {
                var oldx, oldy, newx, newy;
                var jumped = false;
                switch(TYPE) {
                    case "connector":
                        this.bind("EnterFrame", function() {
                            if (this._up) {
                                jumped = true;
                            }
                            if (!this._up && jumped) {
                                Connector.sendMovement(333,333);
                                jumped = false;
                            }
                        });
                        this.bind("Moved", function() {
                            Crafty("Multiplayer")._started=true;
                            Connector.sendMovement(Math.floor(this.x),Math.floor(this.y));
                        });
                        this.bind("KeyUp", function(e) {
                            if(e.key === Crafty.keys.LEFT_ARROW) {
                                Connector.sendMovement(-666,-666);
                                this.pauseAnimation();
                                this.sprite(1,0);
                            } else if (e.key === Crafty.keys.RIGHT_ARROW) {
                                Connector.sendMovement(666,666);
                                this.sprite(0,0);
                            }
                        });
                        break;
                    case "creator":
                        this.bind("EnterFrame", function() {
                            if (this._up) {
                                jumped = true;
                            }
                            if (!this._up && jumped) {
                                Creator.sendMovement(333,333);
                                jumped = false;
                            }
                        });
                        this.bind("Moved", function() {
                            Crafty("Multiplayer")._started=true;
                            Creator.sendMovement(Math.floor(this.x),Math.floor(this.y));
                        });
                        this.bind("KeyUp", function(e) {
                            if(e.key === Crafty.keys.LEFT_ARROW) {
                                Creator.sendMovement(-666,-666);
                                this.pauseAnimation();
                                this.sprite(1,0);
                            } else if (e.key === Crafty.keys.RIGHT_ARROW) {
                                Creator.sendMovement(666,666);
                                this.sprite(0,0);
                            }
                        });
                        break;
                    default: break;
                }
            },
            /**
             * Starts the connector
             */
            connectorMode: function() {
                TYPE = "connector";
                onReceiveMovement();
                onReceiveExit();
                onReceiveDamage();
                this.multiplayerMove();
            },
            /**
             * Starts the creator
             */
            creatorMode: function() {
                TYPE = "creator";
                onReceiveMovement();
                onReceiveExit();
                onReceiveDamage();
                this.multiplayerMove();
            },
            init: function() {
                this.requires('Character');
            },
            stopMultiplayer: function() {
                Crafty("Multiplayer").destroy();
                Multi.setMultiplayer("single");
                this.removeComponent("Mimic");
            }
        });
    }
};

});