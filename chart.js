colorArr = ['#673AB7', '#3ACAFF', '#fff', '#009900'];// cor

var s = 0;
sizeArr = [0, 920, 1220, 1360, 1860];
sizeArr.forEach(function(el, i){
  if(parseFloat(document.body.clientWidth) > el){
    s = i;
  }
});

elements = document.querySelectorAll('*[data-chart="bar"]');
for (var i = 0; i < elements.length; i++) {
  el = elements[i];

  var dataWidth = el.getAttribute("data-width");
  var dataPercent = el.getAttribute("data-percent");
  if(dataPercent){
    var percentArr = dataPercent.split("/");
    dataWidth = (parseFloat(percentArr[0]) / parseFloat(percentArr[1]) * parseFloat(dataWidth));
  }
  var dataHeight = el.getAttribute("data-height");
  var dataColor = el.getAttribute("data-color");
  var dataHideRadius = el.getAttribute("data-hide-radius");

  el.style.width = dataWidth?dataWidth+"px":"50px";
  el.style.height = dataHeight?dataHeight:"14px";
  if(dataColor == "transparent"){
      el.style.border="1px solid #fff";
  }else{
      el.style.backgroundColor = dataColor?dataColor:colorArr[0];
  }
  el.style.borderTopRightRadius = dataHideRadius?"0px":"6px";
  el.style.borderBottomRightRadius = dataHideRadius?"0px":"6px";
}



//alert(document.body.clientWidth);
rArr = [80, 80, 80, 80, 120];
lineArr = [15, 15, 15, 15, 20];

elements = document.querySelectorAll('*[data-chart="donut"]');
for (var i = 0; i < elements.length; i++) {
  el = elements[i];
  var dataTitle = el.getAttribute("data-title");
  var dataText = el.getAttribute("data-text");
  var dataPercent = el.getAttribute("data-percent");
  var dataPercentArr = dataPercent.split(";");


  var canvas = document.createElement("canvas");
  canvas.setAttribute("width", rArr[s]*2+lineArr[s]+2);
  canvas.setAttribute("height", rArr[s]*2+lineArr[s]+2);
  el.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(1+rArr[s]+lineArr[s]/2,1+rArr[s]+lineArr[s]/2,1+rArr[s]-lineArr[s]/2,0,2*Math.PI);
  ctx.lineWidth=2;
  ctx.strokeStyle="#000"; //Muda a cor da linhazinha de dentro
  ctx.stroke();

  begin = -0.5;
  dataPercentArr.forEach(function(el, i){
    ctx.beginPath();
    var end = begin+el/50;
    ctx.arc(1+rArr[s]+lineArr[s]/2,1+rArr[s]+lineArr[s]/2,rArr[s],begin*Math.PI, end*Math.PI);
    ctx.lineWidth=lineArr[s];
    ctx.strokeStyle=colorArr[i];
    ctx.stroke();
    begin = end;
  })

  var donutContainer = document.createElement("div");
  donutContainer.setAttribute("class", "donut-container");
  var donutTitle = document.createElement("div");
  donutTitle.setAttribute("class", "donut-title");
  textnode = document.createTextNode(dataTitle?dataTitle:"");
  donutTitle.appendChild(textnode);
  donutContainer.appendChild(donutTitle);
  var donutText = document.createElement("div");
  donutText.setAttribute("class", "donut-text");
  donutText.innerHTML = dataText?dataText:"";
  donutContainer.appendChild(donutText);

  el.appendChild(donutContainer);
}



var vbwArr=[350, 800, 800, 800, 1200];
elements = document.querySelectorAll('*[data-chart="vertical-bar"]');
for (var i = 0; i < elements.length; i++) {
  el = elements[i];

  var dataWidth = el.getAttribute("data-width");
  dataWidth = vbwArr[s]+"px";
  var dataHeight = el.getAttribute("data-height");
  dataHeight = parseFloat(dataHeight.split("px")[0]);
  if(s == 0){
    dataHeight = dataHeight / 2;
    dataHeight += "px";
  }else{
    dataHeight += "px";
  }
  var dataPercent = el.getAttribute("data-percent");

  el.style.width = dataWidth?dataWidth:"100px";
  el.style.height = dataHeight?dataHeight:"100px";
  //el.style.backgroundColor = dataColor?dataColor:colorArr[0];
  for (var j = 0; j < el.children.length; j++) {
    var child = el.children[j];
    var childPercent = child.getAttribute("data-percent");
    var childWidth = parseFloat(dataWidth.split("px")[0]) / el.children.length - (vbwArr[s]/100) + "px";
    var childHeight = (childPercent/dataPercent * (parseFloat(dataHeight.split("px")[0])-16)) + "px";
    var childColor = child.getAttribute("data-color");

    child.style.width = childWidth;
    child.style.height = childHeight;
    child.style.bottom = "16px";
    child.style.left = j*(parseFloat(childWidth.split("px")[0])+(vbwArr[s]/100)) + "px";
    child.style.backgroundColor = childColor?childColor:"#fff";

    var childDataTitle = child.getAttribute("data-title");
    if(childDataTitle){
      var childTitle = document.createElement("div");
      childTitle.setAttribute("class", "vertical-bar-item-title");
      textnode = document.createTextNode(childDataTitle);
      childTitle.appendChild(textnode);
      childTitle.style.bottom = "-24px";
      childTitle.style.left = "-6px";
      childTitle.style.color = childColor?childColor:colorArr[1];
      childTitle.style.width = parseFloat(childWidth.split("px")[0]) + 12 + "px";
      child.appendChild(childTitle);
    }
  }
}



var hbwArr=[300, 500, 500, 600, 700];

elements = document.querySelectorAll('*[data-chart="horizontal-bar"]');
for (var i = 0; i < elements.length; i++) {
  el = elements[i];

  var dataWidth = el.getAttribute("data-width");
  dataWidth = hbwArr[s];
  var dataHeight = el.getAttribute("data-height");
  var dataPercent = el.getAttribute("data-percent");
  var dataPercentArr = dataPercent.split(";");

  el.style.width = dataWidth?dataWidth+"px":"100px";
  el.style.height = dataHeight?dataHeight+"px":"100px";
  var childBegin = -1;
  for (var j = 0; j < dataPercentArr.length; j++) {

    var childPercent = parseFloat(dataPercentArr[j]);
    var childWidth = parseFloat(childPercent / 100 * dataWidth);
    var childHeight = parseFloat(dataHeight);
    var childColor = colorArr[j];

    var child = document.createElement("div");
    child.setAttribute("class", "horizontal-bar-item");

    child.style.width = childWidth + "px";
    child.style.height = childHeight + 2 + "px";
    child.style.left = childBegin + "px";
    childBegin += childWidth;
    child.style.backgroundColor = childColor;

    el.appendChild(child);

  }
}
