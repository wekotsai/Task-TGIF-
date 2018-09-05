function main() { 
    
    let myTable = document.querySelector("#senate-data");
    myTable.classList.add("table", "table-hover");

    let myTBody = document.createElement("tbody");

    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
            headers: new Headers({
                "X-API-Key": "vtWikQYFzHHmeKCeyC4McaUxPPDQGDGuSxjOOLFc"
            })
        })
    
        .then(response => response.json())
        .then(jsonData => {

            myFirstVueObject(jsonData.results[0].members)
        })
}


function myFirstVueObject(myData) {

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
        // use || to restore the table after unchecking
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
                        }
                    })
                }
            }
    })
}
