import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import './main.scss';
// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({
  rankdir: 'LR',
  // ranker: 'longest-path',
});

// States and transitions from RFC 793
const places = [];
for(let i = 1; i <= 15; i++) {
  places.push(i);
}
// Automatically label each of the nodes
places.forEach(function(place) { g.setNode(place, { 
  label: place,
  x:0,
  y:0,
 }); });
g.nodes().forEach(v=>console.log(g.node(v)));
// [起点，终点，距离，颜色]
const simpleInfo = [
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
  [10,12,5,4],
];
// Set up the edge
simpleInfo.forEach((arr) => {
  g.setEdge(arr[0], arr[1], { label: arr[2] + 'km'})
});


// Set some general styles
g.nodes().forEach(function(v) {
  var node = g.node(v);
  node.rx = node.ry = 5;
});



var svg = d3.select("svg"),
    inner = svg.select("g");


// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
// var initialScale = 0.75;
// svg.call(zoom.transform, d3.zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));

// svg.attr('height', g.graph().height * initialScale + 40);


function draw(arr){

}
/*
arr = [
  [1,2],
  [2,5],
  [5,6]
]

*/