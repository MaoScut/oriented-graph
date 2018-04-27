const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 500;
const canvasHeight = 800;
// {
//   x:,
//   y:,
//   r,
//   color,
//   text,
// }

// 画节点函数，目前仅支持圆
function drawNode(node) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI),
  // ctx.fillStyle = 'blue';
  // ctx.fill();
  ctx.stroke();
  ctx.closePath();
  const fontSize = 30;
  ctx.font = fontSize + 'px';
  ctx.strokeText(node.text, node.x - fontSize/4, node.y + fontSize/4);
}

// 用折线连接两个节点
function link(startNode, endNode, corner, color) {
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
  const arr = [startPoint, ...corner, endPoint];
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
  for (let i = 0; i < arr.length - 1; i++) {
    if (i == arr.length - 2) {
      drawArrowLine(arr[i], arr[i+1]);
    }
    else {
      ctx.moveTo(arr[i].x, arr[i].y);
      ctx.lineTo(arr[i + 1].x, arr[i + 1].y);
      ctx.stroke();
    }
  }
  ctx.closePath();
}

// 画带有箭头的直线
function drawArrowLine(startPoint, endPoint) {
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

const simpleInfo = [
  [20, 220],
  [20, 120],
  [20, 20],
  [120, 220],
  [120, 120],
  [120, 20],
  [220, 220],
  [220, 120],
  [220, 20],
  [320, 220],
  [320, 120],
  [320, 20],
  [420, 220],
  [420, 120],
  [420, 20],
]
const nodeArr = simpleInfo.map((arr, index) =>({
  x: arr[0] + 100,
  y: arr[1] + 100,
  r: 20,
  text: index + 1 + '',
}));
nodeArr.forEach(node => drawNode(node));
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
const colors = [
  'pink',
  'blue',
  'red',
  'black',
  'green',
  'yellow',
];
edgeInfo.forEach(arr => {
  const index1 = arr[0] - 1;
  const index2 = arr[1] - 1;
  const color = colors[arr[3] - 1];
  link(nodeArr[index1], nodeArr[index2],[],color);
})
// const node1 = {
//   x: 50,
//   y: 50,
//   r: 20,
//   text: '1',
// };
// const node2 = {
//   x: 100,
//   y: 100,
//   r: 20,
//   text: '2',
// };
// const node3 = {
//   x: 300,
//   y: 0,
//   r: 20,
//   text: '3',
// }

// drawNode(node1);
// drawNode(node2);
// drawNode(node3);

// link(node1, node2, [{x:50,y:10}, {x:100, y: 10}], 'red');
// // link(node1, node2, [],0,2,'red');
// link(node2, node3, [], 'blue');

// drawArrowLine({x:200,y:0}, {x:0, y: 200});

