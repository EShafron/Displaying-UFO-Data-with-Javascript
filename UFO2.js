// Convert date strings to java date elements
data.forEach(function(sighting){
    // console.log(new Date(sighting.datetime));
    sighting.datetime=new Date(sighting.datetime);
    
})

// console.log(typeof(data[0].comments));

// Select body of table
var table = d3.select("tbody")

// Loop through each sighting in data
data.forEach(function(sighting){

    // Append new row to table
    new_row=table.append('tr');

    // Loop through key/value pairs of each sighting
    Object.values(sighting).forEach(function(value){
        // If object value is a date(type==object), the format output as a string
        if(typeof(value)=='object'){
            new_row.append('td').text(`${value.getMonth()+1}/${value.getDate()}/${value.getFullYear()}`)
        }
        else{
            new_row.append('td').text(value);
        }
        
    })
}
) 


// Select submit button
var submit = d3.select("#submit");

// Click handler for the form
submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Gather date from user input
    var dateInput=d3.select("#UFOdate").property("value");
    var inputDate=new Date(d3.select("#UFOdate").property("value"));
    // Check that the input was picked up
    console.log(`Date requested: ${inputDate}`);

    // Gather state from user input
    var inputState=d3.select('#UFOstate').property("value");
    // Check that the input was picked up
    console.log(`State requested: ${inputState}`);

    // Gather city from user input
    var inputCity=d3.select('#UFOcity').property("value");
    // Check that the input was picked up
    console.log(`City requested: ${inputCity}`);

    // Gather country from user input
    var inputCountry=d3.select('#UFOcountry').property("value");
    console.log(`Country requested: ${inputCountry}`);

    // Gather shape from user input
    var inputShape=d3.select('#UFOshape').property("value");
    console.log(`Shape requested: ${inputShape}`);

    // Remove rows from table
    d3.selectAll("td").remove();

    // Append rows that match the input criteria

    // Start by selecting only rows whose date corresponds to the date entered
    // Use filter
    // function dateSelect(sighting){
    //     return sighting.datetime.getTime() == inputDate.getTime();
    //     // console.log(sighting.datetime == inputDate);
    // }

    function sightingSelect(sighting){
        return (sighting.datetime.getTime() == inputDate.getTime() || dateInput=="")
        && (sighting.city == inputCity || inputCity=="")
        && (sighting.state == inputState || inputState=="")
        && (sighting.country == inputCountry || inputCountry=="")
        && (sighting.shape == inputShape || inputShape=="")
        // console.log(sighting.datetime == inputDate);
    }

    // var dateMatches = data.filter(dateSelect);
    var matches = data.filter(sightingSelect);

    
    // Loop through each sighting in matching data
    matches.forEach(function(sighting){

        // Append new row to table
        new_row=table.append('tr');

        // Loop through key/value pairs of each sighting
        Object.values(sighting).forEach(function(value){
            // If object value is a date(type==object), the format output as a string
            if(typeof(value)=='object'){
                new_row.append('td').text(`${value.getMonth()+1}/${value.getDate()}/${value.getFullYear()}`)
            }
            else{
                new_row.append('td').text(value);
            }
            
        })
    }
) 

})

