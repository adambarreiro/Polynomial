window.onload=function(){if($(".container").html()===""){var a=['<div class="menu">','<div class="separator">Cargando...</div>',"<p>Por favor, espera...</p>","</div>"].join("\n");$(".container").empty();$(".container").append(a)}};require(["./constants","./menu"],function(b,c){var a=document.cookie.indexOf("token=")+"token=".length;var d=document.cookie.indexOf(";",a);if(d<0){d=document.cookie.length}jQuery.ajaxPrefilter(function(f,e,g){if(!g.crossDomain){g.setRequestHeader("X-CSRF-Token",document.cookie.substring(a,d))}});content=$(".container");content.html(c.getGamePanel());c.menuHandler()});