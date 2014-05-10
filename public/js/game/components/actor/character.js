define(["./character/battle","./character/bonus","./character/camera","./character/damage","./character/detection","./character/movement","./character/lava","./character/mimic"],function(d,b,c,e,g,h,j,f){var a;function i(){c.createComponent();b.createComponent();d.createComponent();e.createComponent();j.createComponent();h.createComponent();g.createComponent();f.createComponent()}return{registerComponent:function(k){Crafty.c("Character",{_orientation:"right",_health:100,_shield:0,_clocks:0,_power:0,stopAll:function(){Crafty("Exit").each(function(){this.stopExit()});Crafty("Enemy").each(function(){this.stopEnemy()});this.removeComponent("Camera");this.removeComponent("Detection");this.removeComponent("Lava");this.removeComponent("Bonus");this.removeComponent("Battle");this.removeComponent("Movement");this.unbind("EnterFrame");this.unbind("Moved");this.unbind("KeyDown")},startAll:function(){this.addComponent("Camera");this.addComponent("Detection");this.addComponent("Bonus");this.addComponent("Lava");this.addComponent("Battle");this.addComponent("Movement");if(this.has("Mimic")){Crafty("Character").restartMimic()}Crafty("Enemy").each(function(){this.startEnemy()});Crafty("Exit").each(function(){this.startExit()})},startCharacter:function(){this.addComponent("Camera");this.addComponent("Bonus");this.addComponent("Damage");this.addComponent("Lava");this.addComponent("Movement");this.addComponent("Detection");this.addComponent("Battle");Crafty.trigger("InvalidateViewport")},init:function(){this.requires("Actor, Keyboard, Multiway, spr_char");this.z=2;if(!k){this.reel("CharMoveLeft",800,0,1,8);this.reel("CharMoveRight",800,0,2,8);this.startCharacter()}}});i()}}});