onload = (function(){
    
//    var myVar = setTimeout(showPage, 3000);
    
    if(document.title.includes("Senate")){
       var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
    } else {
       var url = "https://api.propublica.org/congress/v1/113/house/members.json"
    }
    
    fetch(url, {
        headers: new Headers({
                "X-API-Key": "vtWikQYFzHHmeKCeyC4McaUxPPDQGDGuSxjOOLFc"
            })
        })
        .then(response => response.json())
        .then(jsonData => {
            showPage();
            if(document.title.includes("Data")){
                myFirstVueObject(jsonData.results[0].members);
            } else {
                myStatistics(jsonData);
            } 
        })
    

})();

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function myFirstVueObject(myData) {
    
    let myTable = document.querySelector("#senate-data");
    myTable.classList.add("table", "table-hover");

    console.log(myData);

    new Vue({
            el: '#app',
            data: {
                myVueMembers: myData,
                backupMembers: myData,
                filteredMembers: [],
                checkedNames: [],
                stateNameArray: [],
                stateValue: 'all'
            },
            created() {
                this.createStateNameArray();
            },
            methods: {
                partyFilter: function () {
        // use 'backupMembers' to store the originl array 
                    this.myVueMembers = this.backupMembers.filter(member => {
        // use || to restore the table after unchecking boxes
                        let partyFilter = this.checkedNames.includes(member.party) || this.checkedNames.length == 0;
                        let stateFilter = this.stateValue == member.state || this.stateValue == 'all';

                        return partyFilter && stateFilter;
                    });

                },
                createStateNameArray: function(){
                    let dupsArray = this.myVueMembers.map(member => member.state);
                    dupsArray.forEach(stateName => {
                        if(!this.stateNameArray.includes(stateName)){
                            this.stateNameArray.push(stateName);
                            this.stateNameArray.sort();
                        }
                    })
                }
            }
    })
}
