var statistics = {
    
    "numberOfRep":0,
    "numberOfDem":0,
    "numberOfIndi":0,
    "repVotedWPty":0,
    "demVotedWPty":0,
    "indiVotedWPty":0,
    "totalVotedWPty":0,
    "leastEngaged": [],
    "mostEngaged": []
 
};

var members = data.results[0].members;
//glance - calculate numbers of members
calculateNos();

function calculateNos() {
    
var repArr = [];
var demArr = [];
var indiArr = [];    
    


        for (var i = 0; i < members.length; i++ ) {
            
        if (members[i].party === "R"){
            repArr.push(members[i]);
          }
        else if (members[i].party === "D"){
            demArr.push(members[i]);
          }
        else if (members[i].party === "I"){
            indiArr.push(members[i]);
          } 
        }
    
    statistics.numberOfDem = demArr.length;
    statistics.numberOfRep = repArr.length;
    statistics.numberOfIndi = indiArr.length;
    
//    console.log(calculatePct(demArr))
    
    statistics.demVotedWPty = calculatePct(demArr);
    statistics.repVotedWPty = calculatePct(repArr);
    statistics.indiVotedWPty = calculatePct(indiArr);
    statistics.totalVotedWPty = calculatePct(members);
}

//glance - calculate votes w party %
function calculatePct(myArr){
    var mySum = 0; 
    
    for (var k = 0; k < myArr.length; k++){
        mySum = mySum + myArr[k].votes_with_party_pct; 
    }
    return Math.round(mySum / myArr.length);   
}

//29.08 least voted table
//sort the votes
sortVotes();
function sortVotes(){

    var leastMissedVotes =[];
    var mostMissedVotes =[];   
//    console.log(members.map(a => a.missed_votes))
    
//    from the lowest
    members.sort((a, b) => a.missed_votes - b.missed_votes);
//    console.log(members.map(a => a.missed_votes))
    let tenPrc = Math.round(members.length/10);
//    console.log(tenPrc);
    leastMissedVotes = members.slice(0, 45);
    statistics.mostEngaged = leastMissedVotes;
//    console.log(leastMissedVotes.length)  

    
    //from the highest
    members.sort((a, b) => b.missed_votes - a.missed_votes);
//    console.log(members.map(a => a.missed_votes))
    mostMissedVotes = members.slice(0, 45);
    statistics.leastEngaged = mostMissedVotes;
}


//append to table
var atAGlance = document.querySelector("#glance");
//style the table
atAGlance.classList.add("table", "table-bordered");

var myTBody = document.querySelector("#glanceTB");

var glanceTr = ["Democrats","Republicans","Indepedents","Totals"];

glanceTr.forEach(row => {

            var myTr = document.createElement("tr");

            myTr.insertCell().innerHTML = row;
    if(row === "Democrats"){
        myTr.insertCell().innerHTML = statistics.numberOfDem;
        myTr.insertCell().innerHTML = statistics.demVotedWPty;
    } else if(row === "Republicans") {
        myTr.insertCell().innerHTML = statistics.numberOfRep;
        myTr.insertCell().innerHTML = statistics.repVotedWPty;
    } else if(row === "Indepedents") {
        myTr.insertCell().innerHTML = statistics.numberOfIndi;
        myTr.insertCell().innerHTML = statistics.indiVotedWPty;
    } else {
        myTr.insertCell().innerHTML = data.results[0].members.length;
        myTr.insertCell().innerHTML = statistics.totalVotedWPty;
    }
    
            myTBody.append(myTr);
    
});
    atAGlance.append(myTBody);


var leastEngaged = document.querySelector("#leastEng");
leastEngaged.classList.add("table", "table-bordered");
var leastTB = document.querySelector("#leastTB");
var mostEngaged = document.querySelector("#mostEng");
mostEngaged.classList.add("table", "table-bordered");
var mostTB = document.querySelector("#mostTB");



createLeftTable(statistics.leastEngaged, leastTB);


function createLeftTable(myArray, tbodyName){
    
    myArray.forEach(oneGuy => {
        var names = [oneGuy.first_name, oneGuy.middle_name, oneGuy.last_name];
        var full_name = names.join(" ");
        var url = oneGuy.url;
        
        var newTr = document.createElement("tr");
            newTr.insertCell().innerHTML = full_name.link(url);
            newTr.insertCell().innerHTML = oneGuy.missed_votes;
            newTr.insertCell().innerHTML = oneGuy.missed_votes_pct;
        leastEngaged.append(newTr);
    });
   leastEngaged.append(leastTB);
}

createRightTable(statistics.mostEngaged, mostTB);

function createRightTable(myArray, tbodyName){
    
    myArray.forEach(oneGuy => {
        var names = [oneGuy.first_name, oneGuy.middle_name, oneGuy.last_name];
        var full_name = names.join(" ");
        var url = oneGuy.url;
        
        var newTr = document.createElement("tr");
            newTr.insertCell().innerHTML = full_name.link(url);
            newTr.insertCell().innerHTML = oneGuy.missed_votes;
            newTr.insertCell().innerHTML = oneGuy.missed_votes_pct;
        mostEngaged.append(newTr);
    });
   mostEngaged.append(mostTB);
}
