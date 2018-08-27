console.log(data.results[0].members);

        var myTable = document.querySelector("#senate-data");
        myTable.classList.add("table", "table-hover");

        var myTBody = document.createElement("tbody");

        for (var i = 0; i < data.results[0].members.length; i++) {
            var everyMember = data.results[0].members[i];
            var myTr = document.createElement("tr");

            //alternative solution
            //            var a = [data.results[0].members[i].first_name]; 
            //            var b = [data.results[0].members[i].middle_name];
            //            var c = [data.results[0].members[i].last_name];
            //            var d = a.concat(b, c);

            var names = [everyMember.first_name, everyMember.middle_name, everyMember.last_name];
            var full_name = names.join(" ");


            var url = everyMember.url;
            var name_with_link = "<a href=\"" + url + "\">" + full_name + "</a>";
            //            console.log(name_with_link);

            myTr.insertCell().innerHTML = name_with_link;
            myTr.insertCell().innerHTML = everyMember.party;
            myTr.insertCell().innerHTML = everyMember.state;
            myTr.insertCell().innerHTML = everyMember.seniority;
            myTr.insertCell().innerHTML = everyMember.votes_with_party_pct + '%';
            myTBody.append(myTr);
        }

        myTable.append(myTBody);

//checkbox
//document.getElementById("rep").addEventListener("click", selectParty);
//
//function selectParty() {
//    document.getElementById("result").innerHTML = JSON.stringify(array);
//}

function handleChange() {
    
    var myChecked = Array.from(document.querySelectorAll('input.party:checked'));
    
    var myCheckedValues = [];
    myChecked.forEach(checkbox => {
        myCheckedValues.push(checkbox.value);
    });
    console.log(myCheckedValues);
    
    myTBody.innerHTML = "";
    
    data.results[0].members.forEach(member => {
        
        if(myCheckedValues.includes(member.party) || myCheckedValues.length == 0){
            var myTr = document.createElement("tr");
            var names = [member.first_name, member.middle_name, member.last_name];
            var full_name = names.join(" ");

            var url = member.url;
            var name_with_link = "<a href=\"" + url + "\">" + full_name + "</a>";

            myTr.insertCell().innerHTML = name_with_link;
            myTr.insertCell().innerHTML = member.party;
            myTr.insertCell().innerHTML = member.state;
            myTr.insertCell().innerHTML = member.seniority;
            myTr.insertCell().innerHTML = member.votes_with_party_pct + '%';
            myTBody.append(myTr);
        }
    })
    
    
    
    
}

//function filterByParty() {
//  return document.getElementsByClassName("party").checked;
//}



        //alternative solution 
        //            var cellName = document.createElement("td");
        //            cellName.innerHTML = data.results[0].members[i].first_name;
        //            tr.append(cellName);


        //document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
