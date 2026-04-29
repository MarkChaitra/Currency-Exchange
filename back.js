
let currencies;

(async () => {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const data = await res.json();

    currencies = data

    let list = document.getElementById('currenciesDropdownFrom');
    let list2 = document.getElementById('currenciesDropdownTo');

    for(const cur in data){
        let listItem = document.createElement('option');

        if(data[cur] != ""){
            listItem.text = data[cur];
            listItem.value = cur;
            list.appendChild(listItem);
            const listItem2 = listItem.cloneNode(true);
            list2.appendChild(listItem2);
        }
    }

  })();


function c(){
    console.log(currencies);
    console.log(currencies.cad);
}

async function convert(){

    let cur1 = document.getElementById('currenciesDropdownFrom').value;
    let cur2 = document.getElementById('currenciesDropdownTo').value;
    let amount = document.getElementById('moneyFrom').value;
    let exchangeValBox = document.getElementsByClassName('convertedValues')[0];

    const res1 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${cur1}.json`);
    const data1 = await res1.json();
    exchangeRate = data1[cur1][cur2];

    const res2 = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${cur2}.json`);
    const data2 = await res2.json();
    exchangeRate2 = data2[cur2][cur1];

    exchangeValBox.textContent = amount != "" ? "$" + amount + " " + cur1 + " = $" + (exchangeRate*amount) + " " + cur2: "$" + 1 + " " + cur1 + " = $" + (exchangeRate*1) + " " + cur2;
    
    const table1 = createTable(cur1, cur2, exchangeRate);
    const table2 = createTable(cur2, cur1, exchangeRate2);

    document.getElementsByClassName('currencyTables')[0].textContent = "";
    document.getElementsByClassName('currencyTables')[0].appendChild(table1);
    document.getElementsByClassName('currencyTables')[0].appendChild(table2);

};

function createTable(cur1, cur2, exchangeRate){

    let table = document.createElement('table');
    let tableRowHead = document.createElement('tr');
    table.appendChild(tableRowHead);
    
    let rowHead1 = document.createElement('th');
    rowHead1.textContent = cur1;
    tableRowHead.appendChild(rowHead1);
    
    let rowHead2 = document.createElement('th');
    rowHead2.textContent = cur2;
    tableRowHead.appendChild(rowHead2);

    exchangeNums = [1,5,10,25,50,100,500,1000,5000,10000];
    for(let i of exchangeNums){
        let row = document.createElement('tr');

        let rowData1 = document.createElement('td');
        rowData1.textContent = i;
        row.appendChild(rowData1);

        let rowData2 = document.createElement('td');
        rowData2.textContent = (i*exchangeRate).toFixed(4);
        row.appendChild(rowData2);

        table.appendChild(row);
    }

    return table;
}

