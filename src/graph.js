/**
 * 创建一个有向图对象
 * 
 * @param {number} width 画布的宽度
 * @param {number} height 画布的高度
 * @param {dom} canvas 画布文档节点
 * @param {Array} colorMap 将数字映射为颜色
 */
function Graph(width, height, canvas, colorMap) {
  this.width = width;
  this.height = height;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.nodes = [];
  this.edges = [];
  this.colorMap = colorMap;
}
/**
 * 根据参数生成node
 * 
 * @param {any} x 节点与画布左上顶点的横向距离=x%*画布宽度
 * @param {any} y 节点与画布左上顶点的纵向距离=y%*画布宽度
 * @param {any} r 节点的半径
 * @param {any} text 节点中的文字
 */
Graph.prototype.createNode = function (x, y, r, text) {
  return {
    text: text,
    x: (x / 100 ) * this.width,
    y: (y / 100 ) * this.width,
    // 将百分比半径转化为真实px半径
    r: (r / 100 ) * this.width,
  }
}
/**
 * 将节点加入到实例对象的nodes数组中
 * 
 * @param {any} node 包含节点坐标，半径，文字
 */
Graph.prototype.addNode = function (node) {
  this.nodes.push(node)
}
/**
 * 将边加入到实例对象中的edges数组中
 * 
 * @param {any} edge 包含起点，终点，权重，颜色
 */
Graph.prototype.addEdge = function (edge) {
  this.edges.push(edge);
}
/**
 * 在画布中画出一个节点
 * 
 * @param {any} node 节点对象
 * @param {any} ctx 目标画布的context对象
 */
function drawNode(node, ctx) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI),
  ctx.stroke();
  ctx.closePath();
  const fontSize = node.r;
  ctx.font = node.r + 'px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeText(node.text, node.x, node.y);
}
/**
 * 画出所有节点
 * 
 */
Graph.prototype.drawNode = function () {
  const ctx = this.ctx;
  this.nodes.forEach(node => drawNode(node,ctx));
}
/**
 * 画出所有边
 * 
 */
Graph.prototype.drawEdge = function () {
  const ctx = this.ctx;
  const nodeArr = this.nodes;
  this.edges.forEach(edge => link(ctx, nodeArr[edge.from - 1], nodeArr[edge.to - 1], edge.color))
}
/**
 * 用带箭头的指定颜色的线连接两个节点
 * 
 * @param {any} ctx 
 * @param {any} startNode 
 * @param {any} endNode 
 * @param {any} color 
 */
function link(ctx,startNode, endNode, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  const startPoint = {
    x: startNode.x,
    y: startNode.y,
  };
  const endPoint = {
    x: endNode.x,
    y: endNode.y,
  };
  const arr = [startPoint, endPoint];
  // 起点半径内不画线
  const vectorS = {
    x: arr[1].x - arr[0].x,
    y: arr[1].y - arr[0].y,
  };
  const xiebianS = Math.sqrt(vectorS.x * vectorS.x + vectorS.y * vectorS.y);
  const cosS = vectorS.x / xiebianS;
  const sinS = vectorS.y / xiebianS;
  arr[0] = {
    x: startPoint.x + startNode.r * cosS,
    y: startPoint.y + startNode.r * sinS,
  };
  // 终点半径不画线
  const vectorE = {
    x: arr[arr.length - 2].x - arr[arr.length-1].x,
    y: arr[arr.length - 2].y - arr[arr.length-1].y,
  };
  console.log(vectorE);
  const hypotenuse = Math.sqrt(vectorE.x * vectorE.x + vectorE.y * vectorE.y);
  const cosE = vectorE.x / hypotenuse;
  const sinE = vectorE.y / hypotenuse;
  arr[arr.length - 1] = {
    x: endPoint.x + endNode.r * cosE,
    y: endPoint.y + endNode.r * sinE,
  };
  // 终
  console.log(endPoint);
  drawArrowLine(ctx,arr[0], arr[1]);
  ctx.closePath();
}
/**
 * 根据起始点和末尾点画出箭头
 * 
 * @param {any} ctx 
 * @param {any} startPoint 
 * @param {any} endPoint 
 */
function drawArrowLine(ctx,startPoint, endPoint) {
  const arrowRadius = 5;
  const vector = {
    x: endPoint.x - startPoint.x,
    y: endPoint.y - startPoint.y,
  };
  const hypotenuse = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const cos = vector.x / hypotenuse;
  const sin = vector.y / hypotenuse;
  let arrowEndPoint1 = {
    x: endPoint.x - (Math.sin(Math.PI/4)*cos -Math.cos(Math.PI/4)*sin)*arrowRadius,
    y: endPoint.y - (Math.cos(Math.PI/4)*cos + Math.sin(Math.PI/4)*sin)*arrowRadius,
  };
  let arrowEndPoint2 = {
    x: endPoint.x - (Math.cos(Math.PI/4)*cos + Math.sin(Math.PI/4)*sin)*arrowRadius,
    y: endPoint.y + (Math.sin(Math.PI/4)*cos -Math.cos(Math.PI/4)*sin)*arrowRadius,
  };

  console.log(arrowEndPoint1,arrowEndPoint2);
  // 画线
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.stroke();
  // 画箭头的一边
  ctx.moveTo(endPoint.x, endPoint.y);
  ctx.lineTo(arrowEndPoint1.x, arrowEndPoint1.y)
  ctx.stroke();
  // 画箭头的另一边
  ctx.moveTo(endPoint.x, endPoint.y);
  ctx.lineTo(arrowEndPoint2.x, arrowEndPoint2.y)
  ctx.stroke();
}


// test
const simpleInfo = [
  [10, 55],
  [10, 35],
  [10, 15],
  [30, 55],
  [30, 35],
  [30, 15],
  [50, 55],
  [50, 35],
  [50, 15],
  [70, 55],
  [70, 35],
  [70, 15],
  [90, 55],
  [90, 35],
  [90, 15],
]
const nodeArr = simpleInfo.map((arr, index) =>({
  x: arr[0],
  y: arr[1],
  r: 5,
  text: index + 1 + '',
}));
const edgeInfo = [
  [1,2,6,1],
  [2,1,6,1],
  [2,3,5,1],
  [1,4,3,4],
  [4,1,3,4],
  [2,5,7,2],
  [5,6,9,3],
  [6,5,9,3],
  [5,8,2,2],
  [8,5,2,2],
  [5,7,9,3],
  [4,7,4,4],
  [7,4,4,4],
  [8,9,3,2],
  [9,12,38,2],
  [12,9,38,2],
  [12,15,7,2],
  [11,12,6,5],
  [11,14,3,5],
  [14,11,3,5],
  [13,14,5,5],
  [8,10,9,6],
  [10,8,9,6],
  [7,10,6,4],
  [10,13,5,4],
];
const colorMap = ['blue', 'green', 'red', 'purple', 'DarkGoldenrod', 'SaddleBrown']

const edgeArr = edgeInfo.map(arr => ({
  from: arr[0],
  to: arr[1],
  weight: arr[2],
  color: colorMap[arr[3] - 1],
}));

const g = new Graph(720, 500, document.getElementById('canvas'), colorMap);
// nodeArr.forEach(node => g.addNode(node.x));
simpleInfo.forEach((arr, index) => g.addNode(g.createNode(arr[0], arr[1], 5, index + 1 + '')));
edgeArr.forEach(edge => g.addEdge(edge));
console.log(g.nodes);
g.drawNode();
g.drawEdge();