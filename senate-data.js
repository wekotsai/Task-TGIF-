//console.log(data.results[0].members);
//dropdown filter
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


//table
let myTable = document.querySelector("#senate-data");
myTable.classList.add("table", "table-hover");

let myTBody = document.createElement("tbody");

handleChange();

//for (var i = 0; i < data.results[0].members.length; i++) {
//    var everyMember = data.results[0].members[i];
//    var myTr = document.createElement("tr");
//
//    var names = [everyMember.first_name, everyMember.middle_name, everyMember.last_name];
//    var full_name = names.join(" ");
//
//
//    var url = everyMember.url;
//    var name_with_link = "<a href=\"" + url + "\">" + full_name + "</a>";
//    //            console.log(name_with_link);
//
//    myTr.insertCell().innerHTML = name_with_link;
//    myTr.insertCell().innerHTML = everyMember.party;
//    myTr.insertCell().innerHTML = everyMember.state;
//    myTr.insertCell().innerHTML = everyMember.seniority;
//    myTr.insertCell().innerHTML = everyMember.votes_with_party_pct + '%';
//    myTBody.append(myTr);
//}
//
//myTable.append(myTBody);

//checkbox
//document.getElementById("rep").addEventListener("click", selectParty);
//
//function selectParty() {
//    document.getElementById("result").innerHTML = JSON.stringify(array);
//}

//1. all states with duplicates
var allStates = data.results[0].members.map(oneMember => oneMember.state);
//console.log(allStates);
//2. remove duplicates
var allStatesNoDupes = [];
allStates.forEach(oneState =>{
    if(!allStatesNoDupes.includes(oneState)){
        allStatesNoDupes.push(oneState);
    }
});

var selector = document.getElementById("stateSelect");

allStatesNoDupes.sort();
allStatesNoDupes.forEach(aState =>{
    
    var newOption = document.createElement("option");
    //console.log('one done')
    newOption.innerHTML = aState;
    selector.append(newOption);
})


function handleChange() {
    
    myTBody.innerHTML = "";

    let myChecked = Array.from(document.querySelectorAll('input.party:checked'));

    let myCheckedValues = [];
    myChecked.forEach(checkbox => {
        myCheckedValues.push(checkbox.value);
    });
    
    let selector = document.getElementById("stateSelect");


    data.results[0].members.forEach(member => {

        let partyFilter = myCheckedValues.includes(member.party) || myCheckedValues.length == 0;
        let statesFilter = (member.state == selector.value) || selector.value == "all";

        if (partyFilter && statesFilter) {
            var myTr = document.createElement("tr");
            var names = [member.first_name, member.middle_name, member.last_name];
            var full_name = names.join(" ");
            var url = member.url;

            myTr.insertCell().innerHTML = full_name.link(url);
            myTr.insertCell().innerHTML = member.party;
            myTr.insertCell().innerHTML = member.state;
            myTr.insertCell().innerHTML = member.seniority;
            myTr.insertCell().innerHTML = member.votes_with_party_pct + '%';
            myTBody.append(myTr);
        }
    });
    
    myTable.append(myTBody);
    

}

//function filterByParty() {
//  return document.getElementsByClassName("party").checked;
//}



//alternative solution 
//            var cellName = document.createElement("td");
//            cellName.innerHTML = data.results[0].members[i].first_name;
//            tr.append(cellName);


//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
