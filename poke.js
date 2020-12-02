
const svg = d3.select("body").append("svg");


function size_name(name){
  if (name.length >= 17){
    return 15 ;
  }
  else if (name.length >= 15){
    return 16;
  }
  else {
    return 18;
  }
}



function joinDeDatos(datos) {
  svg.selectAll("*").remove();
  d3.select("body").selectAll("div.tooltip").remove();

  var tipo = {
    'Bug': "#A8B820",
    'Dark': "#A29288",
    'Dragon': "#A27DFA",
    'Electric': "#F8D030",
    'Fairy': "#EE99AC",
    'Fighting': "#C03028",
    'Fire': "#F08030",
    'Flying': "#A890F0",
    'Ghost': "#705898",
    'Grass': "#78C850",
    'Ground': "#E0C068",
    'Ice': "#98D8D8",
    'Normal': "#A8A878",
    'Poison': "#C183C1",
    'Psychic': "#F85888",
    'Rock': "#B8A038",
    'Steel': "#B8B8D0",
    'Water': "#6890F0"
  };


  var yRange = d3.scaleLinear()
                      .domain([0, 255])
                      .range([190, 0]);
  var xRange = d3.scaleBand()
                      .domain(['HP','ATK','DEF','SP ATK','SP DEF','SPEED'])
                      .range([0, 300]);

  var y_axis = d3.axisLeft(yRange);
  var x_axis = d3.axisBottom(xRange);

  svg.attr("width", 1500).attr("height",  500 + (datos.length / 6) * 300);

  var node = svg.selectAll("g.node")
    .data(datos);

  let div = d3.select("body").append("div")	
  .attr("class", "tooltip")
  .attr("id", "tooltip")				
  .style("opacity", 0); 

  var nodeEnter = node.enter()
    .append("svg:g")
    .attr("class", "node")
    .attr("id", function(d) { return "id"+ d.id;})
    .on("mouseover", function(d) {
      div.style("opacity", .9)
      .style("background", tipo[d.type_1]);		
      if(d.type_number == 1) {div.html("Pokedex Number: " + d.pokedex_number
      + "</br>" +  "Name: " + d.name
      + "</br>" + "Type: " + d.type_1
      + "</br>" + "Height: " + d.height_m + "m"
      + "</br>" + "Weight: " + d.weight_kg + "kg"
      + "</br>" + "Species: " + d.species
      + "</br>" + "Total Base Points: " + d.total_points)
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY) + "px");	
      }
    else{
      {div.html("Pokedex Number: " + d.pokedex_number
      + "</br>" + "Name: " + d.name 
      + "</br>" + "Type 1: " + d.type_1
      + "</br>" + "Type 2: " + d.type_2
      + "</br>" + "Height: " + d.height_m + "m"
      + "</br>" + "Weight: " + d.weight_kg + "kg"
      + "</br>" + "Species: " + d.species
      + "</br>" + "Total Base Points: " + d.total_points)
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY) + "px");	
      }}

      var barChart = d3.select("#tooltip")
      .append("svg")
      .attr("width", 350)
      .attr("height", 225);

      var bar = barChart.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 16);

      bar
      .append("g")
      .attr("class","x axis")
      .style("font-size","12px")
      .attr("transform","translate("+30+","+205+")")
      .call(x_axis);
      
      bar
      .append("g")
      .attr("class","y axis")
      .style("font-size","12px")
      .attr("transform","translate("+30+","+15+")")
      .call(y_axis);
      
      bar.append("text")
      .attr("x", 180)
      .attr("text-anchor", "middle")
      .attr("y", 19)
      .attr("font-size", 16)
      .text("Stats");

    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 45)
      .attr("width", 20)
      .attr("height", 190 - yRange(d.hp))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");

    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 95)
      .attr("width", 20)
      .attr("height", 190 -  yRange(d.attack))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");
    
    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 145)
      .attr("width", 20)
      .attr("height", 190 -  yRange(d.defense))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");

    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 195)
      .attr("width", 20)
      .attr("height", 190 - yRange(d.sp_attack))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");

    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 245)
      .attr("width", 20)
      .attr("height", 190 - yRange(d.sp_defense))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");

    bar.append("rect")
    	.attr("y", 160)
      .attr("x", 295)
      .attr("width", 20)
      .attr("height", 190 - yRange(d.speed))
      .attr('transform'," translate(0,365) scale(1 -1)")
      .attr("fill", "white");
    })

    .on("mouseout", function(d) {		
      div.style("opacity", 0);	
    });
  
var defs = nodeEnter.append("defs");

nodeEnter
.append("svg:image")
.attr("xlink:href",(d) => "pokeball.png")
.attr("x", (d, i) => 105 + (i % 6) * 210)
.attr("y", (d, i) => 0 + Math.floor(i/6) * 300)
.attr("width", 230)
.attr("height", 230);

defs.append('pattern')
  .attr("id", function(d) { return "image"+ d.id;}  )
  .attr("width", 1)
  .attr("height", 1)
  .append("svg:image")
  .attr("xlink:href",(d) => "sprites/" + encodeURI((d.name).toLowerCase()) + '.png')
  .attr("width", 180)
  .attr("height", 135);

  nodeEnter.append("svg:circle")
  .attr("cx", (d, i) => 220 + (i % 6) * 210)
  .attr("cy", (d, i) => 95 + Math.floor(i/6) * 300)
  .attr("fill",function(d) { return "url(#image"+ d.id +")" }  )
  .attr("r", 90)

  nodeEnter
  .append("text")
  .append('tspan')
  .attr("x", (d, i) => 155 + (i % 6) * 210)
  .attr("y", (d, i) => 160 + Math.floor(i/6) * 300)
  .attr("font-size",(d) => size_name(d.name))
  .attr("fill", "black")
  .text(function(d) { if (d.name.length  >= 28 ) {return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1] }
    else if (d.name.length  >= 25 && d.name.split(' ').length == 3 ) {return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1]}
    else if (d.name.length  >= 25) {return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1] + ' ' + d.name.split(' ')[2] }
    else if (d.name.length  >= 19 && d.name.split(' ').length == 2 ) {return  d.name.split(' ')[0]}
    else if (d.name.length  >= 19) {return  d.name.split(' ')[0] + ' ' + d.name.split(' ')[1]}
    else if (d.name.length >= 17 && d.name.split(' ').length == 3 ) {return  d.name.split(' ')[0] + ' ' + d.name.split(' ')[1]}
    else if (d.name.length  >= 12 && d.name.split(' ').length == 3 ) {return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1] + ' ' + d.name.split(' ')[2] }
    else if (d.name.length  >= 8 && d.name.split(' ').length == 2 ) {return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1]}
    else { return d.name.split(' ')[0]}}  )

  .append('tspan')
  .attr("x", (d, i) => 165 + (i % 6) * 210)
  .attr("y", (d, i) => 175 + Math.floor(i/6) * 300)
  .attr("font-size",(d) => size_name(d.name))
  .attr("fill", "black")
  .text(function(d) { if (d.name.length  >= 28 && d.name.split(' ').length == 5) {return d.name.split(' ')[2] + ' ' + d.name.split(' ')[3] + ' ' + d.name.split(' ')[4]}
    else if (d.name.length  >= 28) {return d.name.split(' ')[2] + ' ' + d.name.split(' ')[3]}
    else if (d.name.length  >= 25 && d.name.split(' ').length == 3 ) {return d.name.split(' ')[2]}
    else if (d.name.length  >= 25) {return d.name.split(' ')[3] + ' ' + d.name.split(' ')[4] }
    else if (d.name.length  >= 19 && d.name.split(' ').length == 4 ) {return  d.name.split(' ')[2] + ' ' + d.name.split(' ')[3]} 
    else if (d.name.length  >= 19 && d.name.split(' ').length == 3 ) {return  d.name.split(' ')[2]}
    else if (d.name.length  >= 19 && d.name.split(' ').length == 2 ) {return  d.name.split(' ')[1]}
    else if (d.name.length  >= 17 && d.name.split(' ').length == 3 ) {return  d.name.split(' ')[2]}
    else if (d.name.length  >= 17) {return  d.name.split(' ')[2]}
    else if (d.name.length  >= 15) {return ''}
    else if (d.name.length  >= 8 && d.name.split(' ').length == 2 ) {return ''}
    else { return  ''};});
    


  return svg.node();
  
}

d3.csv("pokedex.csv")
.then((datos) => {

  //dropdown actualizable inspirado de https://www.d3-graph-gallery.com/graph/line_filter.html
  //Carga todos al principio
  joinDeDatos(datos);
  // Opciones al boton generacion
  gens = d3.map(datos, function(d){return(d.generation)}).keys()
  gens.unshift(0)
  d3.select("#selectGen")
  .selectAll('myOptionsG')
  .data(gens)
  .enter()
  .append('option')
  .text(function (d) {if(d == 0){
    return 'All'}
    else{return d; }}) 
  .attr("value", function (d) { return d; })
  // Opciones al boton tipo
  types = d3.map(datos, function(d){return(d.type_1)}).keys()
  types.unshift(0)
  d3.select("#selectType")
  .selectAll('myOptionsT')
  .data(types)
  .enter()
  .append('option')
  .text(function (d) {if(d == 0){
    return 'All'}
    else{return d; }}) 
  .attr("value", function (d) { return d; })

    // Funcion para actualizar los pokemones mostrados por region
    function update(selectedGen, selectedType) {
      // Nueva data
      if (selectedGen == 0 && selectedType == 0 ){
        joinDeDatos(datos)}
      else if (selectedGen == 0 && selectedType != 0){
        var dataFilter = datos.filter(function(d){return (d.type_1==selectedType || d.type_2==selectedType )})
        joinDeDatos(dataFilter)}
      else if (selectedGen != 0 && selectedType == 0){
        var dataFilter = datos.filter(function(d){return (d.generation==selectedGen )})
        joinDeDatos(dataFilter)}
      else {
        var dataFilter = datos.filter(function(d){return d.generation==selectedGen && (d.type_1==selectedType || d.type_2==selectedType )})
        joinDeDatos(dataFilter)}
      }

  // Actualizar seleccion
  selectedGen = d3.select("#selectGen").on("change", function(d) {
    var selectedGen = d3.select(this).property("value")
    // Actualizar la pagina
    update(selectedGen,selectedType.property("value"))
    return selectedGen
  })
  selectedType = d3.select("#selectType").on("change", function(d) {
    var selectedType = d3.select(this).property("value")
    // Actualizar la pagina
    update(selectedGen.property("value"), selectedType)
    return selectedType
  })  
})  
.catch((error) => console.log(error));

//Boton Para subir inspirado de https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 3000 || document.documentElement.scrollTop > 3000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 3200;
}