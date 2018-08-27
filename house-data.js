console.log(data.results[0].members);

        var myTable = document.querySelector("#house-data");
//        console.log(myTable);
        myTable.classList.add("table", "table-hover");

        var myTBody = document.createElement("tbody");

        for (var i = 0; i < data.results[0].members.length; i++) {
            var myTr = document.createElement("tr");

            //alternative solution
            //            var a = [data.results[0].members[i].first_name]; 
            //            var b = [data.results[0].members[i].middle_name];
            //            var c = [data.results[0].members[i].last_name];
            //            var d = a.concat(b, c);

            var names = [data.results[0].members[i].first_name, data.results[0].members[i].middle_name, data.results[0].members[i].last_name];
            var full_name = names.join(" ");


            var url = data.results[0].members[i].url;
            var name_with_link = "<a href=\"" + url + "\">" + full_name + "</a>";
            //            console.log(name_with_link);

            myTr.insertCell().innerHTML = name_with_link;
            myTr.insertCell().innerHTML = data.results[0].members[i].party;
            myTr.insertCell().innerHTML = data.results[0].members[i].state;
            myTr.insertCell().innerHTML = data.results[0].members[i].seniority;
            myTr.insertCell().innerHTML = data.results[0].members[i].votes_with_party_pct + '%';
            myTBody.append(myTr);
        }

        myTable.append(myTBody);

        //alternative solution 
        //            var cellName = document.createElement("td");
        //            cellName.innerHTML = data.results[0].members[i].first_name;
        //            tr.append(cellName);


        //document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
