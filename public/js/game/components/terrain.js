define(["./terrain/abyss","./terrain/floor1","./terrain/floor2","./terrain/floor3","./terrain/floor4","./terrain/floor5"],function(c,b,a,g,f,e){function d(h){c.registerComponent(h);b.registerComponent(h);a.registerComponent(h);g.registerComponent(h);f.registerComponent(h);e.registerComponent(h)}return{registerComponent:function(h){Crafty.c("Terrain",{init:function(){this.requires("Grid")}});d(h)}}});