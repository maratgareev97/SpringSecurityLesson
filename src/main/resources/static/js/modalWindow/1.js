let divs = document.getElementById("diva");
console.log(divs);
let button = document.getElementById("add");
let id = 0;


// button.addEventListener('click', function()
async function add_string() {
    // alert("!!!!!!!!!!!!!1")
    await fetch('http://localhost:8080/admin/test').then(
        respj => {
            let respr = respj.text();
            console.log(respr);
            return respr;
        }
    ).then(
        text1 => {
            console.log(text1);
            id += 1;

            let tableRef = document.getElementById("my-table");

            // Insert a row at the end of the table
            let newRow = tableRef.insertRow(-1);
            newRow.id = "id_col_" + id;

            // Insert a cell in the row at index 0
            let newCell = newRow.insertCell(0);

            let newDiv = document.createElement('div')
            newDiv.id = "div_" + id;
            newDiv.innerHTML="fffff"

            // Append a text node to the cell
            // let newText = document.createTextNode(`<div id=${id}>${id}: ${text1}</div>`);
            newCell.appendChild(newDiv);
            return newCell.appendChild(newDiv);
        }
    ).then(
        dele => {
            // var parent = document.getElementById("main");
            // var child = document.getElementById("id1");
            // parent.removeChild(child);
            console.log("delete   " + dele)
        }
    )

    // });
}



function delStr() {
    document.getElementById("id_col_2").remove();
}

function editStr(){
    let text = document.getElementById("div_2")
    text.innerHTML="ddddd"
}