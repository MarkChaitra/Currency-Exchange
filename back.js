
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

function pp(){

    let list = document.getElementById('currenciesDropdownFrom').value;
    let list2 = document.getElementById('currenciesDropdownTo').value;

    (async () => {
        const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${list}.json`);
        const data = await res.json();


        console.log(data[list][list2]);
    
      })();

}
