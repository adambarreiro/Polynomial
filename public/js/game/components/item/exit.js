define(["require","../../scenes"],function(a){return{registerComponent:function(b){Crafty.c("Exit",{multiplayerExit:function(){if(Crafty("Multiplayer").length>0){Crafty("Character").multiplayerExit()}},stopExit:function(){this.removeComponent("Collision");this.unbind("EnterFrame")},startExit:function(){var c=a("../../scenes");this.addComponent("Collision");this.bind("EnterFrame",function(d){if(this.hit("Character")){Crafty("Character").stopAll();this.multiplayerExit();c.nextLevel()}})},init:function(){this.requires("Item, spr_exit");if(!b){this.startExit()}}})}}});