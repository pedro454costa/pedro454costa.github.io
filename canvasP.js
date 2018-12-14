var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 100, 70, -0.5 * Math.PI, 2 * Math.PI);
ctx.lineWidth = 4;
ctx.strokeStyle = '#80808030'; /*cor da linha*/

//ctx.addColorSet('#3CB371');
ctx.stroke();


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 100, 70, -0.5 * Math.PI, 1 * Math.PI);
ctx.lineWidth = 4;
ctx.strokeStyle = 'orange'; /*cor da linha*/

//ctx.addColorSet('#3CB371');
ctx.stroke();

ctx.lineWidth = 2;
ctx.font = "20px serif";
ctx.textBaseline = "hanging";
ctx.strokeText("Hello world", 50, 100);
ctx.stroke();
