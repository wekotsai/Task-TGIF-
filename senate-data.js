
var data;

//onload = (function(){


let myTable = document.querySelector("#senate-data");
myTable.classList.add("table", "table-hover");

let myTBody = document.createElement("tbody");

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        headers: new Headers({
            "X-API-Key": "vtWikQYFzHHmeKCeyC4McaUxPPDQGDGuSxjOOLFc"
        })
    })
//    .then(json => json.json())
//    .then(data => {
    .then(response => response.json())
    .then(jsonData => {
    
        data = jsonData;
         
        myFirstVueObject(jsonData.results[0].members)
        handleChange();

        //1. all states with duplicates
        var allStates = data.results[0].members.map(oneMember => oneMember.state);
        //2. remove duplicates
        var allStatesNoDupes = [];
        allStates.forEach(oneState => {
            if (!allStatesNoDupes.includes(oneState)) {
                allStatesNoDupes.push(oneState);
            }
        });

        var selector = document.getElementById("stateSelect");

        allStatesNoDupes.sort();
        allStatesNoDupes.forEach(aState => {

            var newOption = document.createElement("option");
            newOption.innerHTML = aState;
            selector.append(newOption);
        })
})
//});

function myFirstVueObject(myData){
    
    console.log(myData);
    
    new Vue({
      el: '#app',
      data: {
          myVueMembers: myData,
      }
    })
}

//function handleChange() {
//
//            myTBody.innerHTML = "";
//
//            let myChecked = Array.from(document.querySelectorAll('input.party:checked'));
//
//            let myCheckedValues = [];
//            myChecked.forEach(checkbox => {
//                myCheckedValues.push(checkbox.value);
//            });
//
//            let selector = document.getElementById("stateSelect");
//
//
//            data.results[0].members.forEach(member => {
//
//                let partyFilter = myCheckedValues.includes(member.party) || myCheckedValues.length == 0;
//                let statesFilter = (member.state == selector.value) || selector.value == "all";
//
//                if (partyFilter && statesFilter) {
//                    var myTr = document.createElement("tr");
//                    var names = [member.first_name, member.middle_name, member.last_name];
//                    var full_name = names.join(" ");
//                    var url = member.url;
//
//                    myTr.insertCell().innerHTML = full_name.link(url);
//                    myTr.insertCell().innerHTML = member.party;
//                    myTr.insertCell().innerHTML = member.state;
//                    myTr.insertCell().innerHTML = member.seniority;
//                    myTr.insertCell().innerHTML = member.votes_with_party_pct + '%';
//                    myTBody.append(myTr);
//                }
//            });
//
//            myTable.append(myTBody);
//
//
//        }

    
//function filterByParty() {
//  return document.getElementsByClassName("party").checked;
//}
//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
