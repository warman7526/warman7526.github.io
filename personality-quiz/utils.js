var $ = (q) => document.querySelector(q);
var $title = (q) => $("title").innerHTML = q;
var $reload = () => document.location.reload();
var $relocate = (q) => document.location.href = q;
var $hide = (q) => $(q).hidden = !$(q).hidden;