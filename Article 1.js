// Students by level of study  2000/01 to 2016/17

d3.csv("../data/Article 1/full-time total.csv",function(Data){
    console.log(Data)
    var data = Data.columns.slice(1,5).map(function(id) {

      return {
        id: id,
        Values: Data.map(function(d){
          return {
            year: d.Year,
            value:parseFloat(d[id])
          };
        })
      };
    });
    console.log('data:', data);

        var width = 455;
        var height = 260;

        var main_chart = d3.select('#chart_1')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

        var margin = {
        top: 60,
        left: 60,
        right: 120,
        bottom: 40
      };

      width = width - margin.left - margin.right;
      height = height - margin.top - margin.bottom;
      ///////////  Year datas  ////////////////////

      var svg = main_chart.append('g')
          .attr('class','line_content')
          .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

      // title
    svg.append("text")
        .attr("x", 160 )
        .attr("y", -25)
        .attr("class","title")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .text("Chart 2: Full-time students by level of study in the UK 2000/01 to 2016/17");


      var x_scale = d3.scalePoint()
                  .range([0, width]);


      var y_scale = d3.scaleLinear()
            .range([height,0]);

      var colour =["rgb(128, 177, 211)","rgb(179, 222, 105)","rgb(253, 180, 98)","rgb(251, 128, 114)"]
      var z = d3.scaleOrdinal(colour);;

      var xAxis = d3.axisBottom(x_scale);

      var yAxis = d3.axisLeft(y_scale);


      x_scale.domain(Data.map(function(d) { return d.Year; }));

      // console.log(x_scale.domain());
      //define y axis
      y_scale.domain([0,	d3.max(data, function(c) {
          return d3.max(c.Values, function(d) {
            return d.value;
          });
        })
      ]);
      //define z scale
      z.domain(data.map(function(c) {
        return c.id;
      }));

     /////////////////////////////
     //append x Axis
      svg.append("g")
         .attr("class", "axis axis-x")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis)
         .selectAll("text")
         .attr("y", 15)
         .attr("x", 5)
         .attr("dy", ".35em")
         .attr("transform", "rotate(-40)")
         .style("text-anchor", "end")
         .append("text")
         .attr("fill", "#000")
         .text("Year");

       //append y axis
      svg.append("g")
         .attr("class", "axis axis-y")
         .call(yAxis.ticks(null, "s"))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -45)
         .attr("x", -25)
         .attr("dy", "0.38em")
         .attr("fill", "#000")
         .attr("class","billion")
         .text("Number of student");

       // Draw the legend
       var legend = svg.selectAll('line_content')
           .data(data)
           .enter()
           .append('g')
           .attr('class', 'legend');

          legend.append('rect')
             .attr('x', width + 50)
             .attr('y', function(d, i) { return height / 2 - (i + 1) * 20; })
             .attr('width', 10)
             .attr('height', 10)
             .style('fill', function(d) { return z(d.id); });

          legend.append('text')
             .attr('x', width + 65)
             .attr('y', function(d, i) { return height / 2 - (i + 1) * 20 + 10; })
             .text(function(d) { return d.id; });

         //setting line
      let line = d3.line()
        .x(function(d) {return x_scale(d.year);})
        .y(function(d) {return y_scale(d.value);})
        .curve(d3.curveCatmullRom);

      var path = svg.selectAll(".line")
          .data(data)
          .enter()
          .append("g");

          // append line path to svg
          path.append("path")
            .attr("class", "line")
            .attr("d", function(d){
              return line(d.Values);
            })
            .attr('id',function(d){
                return 'line-' + d.id;
            })
            .style("stroke", function(d) {return z(d.id);})
            .attr("opacity", 1);

        // // append line labels to svg
        //     path.append("text")
        //       .datum(function(d) { return {id: d.id, value: d.Values[d.Values.length - 1]}; })
        //       .attr("transform", function(d) { return "translate(" + x_scale(d.value.year) + "," + y_scale(d.value.value) + ")"; })
        //       .attr("x", 20)
        //       .attr("dy", "0.38em")
        //       .style("font", "15px sans-serif")
        //       .style("fill", function(d) {return z(d.id);})
        //       .attr("opacity", 1)
        //       .text(function(d) { return d.id; })
        //       .attr("class", "label")
        //       .attr('id',function(d){
        //           return 'label-' + d.id;
        //       });

      // Draw the empty value for every point
      var points = svg.selectAll('.points')
              .data(data)
              .enter()
              .append('g')
              .attr('class', 'points')
              .append('text')
              .style("font", "15px sans-serif")
              .attr("opacity", 1)
              .attr('id',function(d){ return 'dot-' + d.id;});

      // Draw the circle
      path
        .selectAll("circle.line")
        .data(function(d){ return d.Values })
        .enter()
        .append("circle")
        .attr("r", 0)
        .style("stroke-width", 3)
        .attr("cx", function(d) { return x_scale(d.year); })
        .attr("cy", function(d) { return y_scale(d.value); });

       svg.select('.x.axis')
             .call(xAxis);

       svg.select('.y.axis')
             .call(yAxis);

    //////////////  mouseover line  //////////////////  reference: https://codepen.io/savemuse/pen/bgQQxp
    //creat the mouseover line data;
    var yyy = data.map(function(s){
      return s.Values.map(function(d){
        return d.value
      })
    })

    var yyy0 = yyy[0];
    var yyy1 = yyy[1];
    var yyy2 = yyy[2];
    console.log("under",yyy[0]);
    console.log("post",yyy[1]);
    console.log("total",yyy[2])

    var year =["2007/08","2008/09","2009/10","2010/11","2011/12","2012/13","2013/14","2014/15","2015/16","2016/17"];
    var tip_data =[]
    for (let e = 0; e < year.length; e++){
      tip_data.push( {"year": year[e],"ynder": yyy0[e],"post":yyy1[e],"total":yyy2[e]})
    }
    MouseLine(tip_data)
    // console.log(tip_data)
  function MouseLine(tip_data){
    var focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('y1' , 0)
      .attr('y2', height);

    svg.append('rect')
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousemove", mousemove);

      var timeScales = tip_data.map(function(d) { return x_scale(d.year); });
      console.log(timeScales)

      function mouseover() {
        focus.style("display", null);
        d3.selectAll('.points text').style("display", null);
      }
      function mouseout() {
        focus.style("display", "none");
        d3.selectAll('.points text').style("display", "none");
      }
      function mousemove() {
        var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
        // console.log(i)
        var di = tip_data[i-1];
        // console.log(di)
        focus.attr("transform", "translate(" + x_scale(di.year) + ",0)");
        d3.selectAll('.points text')
          .attr('x', function(d) { return x_scale(di.year)+10; })
          .attr('y', function(d) { return y_scale(d.Values[i-1].value)-10; })
          .text(function(d) { return (d.Values[i-1].value/1000000).toFixed(2)+"m"; })
          .style('fill', function(d) { return z(d.id); })
          .style('font', '10px');
      }
  }
})


///////////button ////////////
const docStyle = document.documentElement.style
const aElem = document.querySelector('a')
const boundingClientRect = aElem.getBoundingClientRect()

aElem.onmousemove = function(e) {

	const x = e.clientX - boundingClientRect.left
	const y = e.clientY - boundingClientRect.top

	const xc = boundingClientRect.width/2
	const yc = boundingClientRect.height/2

	const dx = x - xc
	const dy = y - yc

	docStyle.setProperty('--rx', `${ dy/-1 }deg`)
	docStyle.setProperty('--ry', `${ dx/10 }deg`)

}

aElem.onmouseleave = function(e) {

	docStyle.setProperty('--ty', '0')
	docStyle.setProperty('--rx', '0')
	docStyle.setProperty('--ry', '0')

}

aElem.onmousedown = function(e) {

	docStyle.setProperty('--tz', '-25px')

}

document.body.onmouseup = function(e) {

	docStyle.setProperty('--tz', '-12px')

}
