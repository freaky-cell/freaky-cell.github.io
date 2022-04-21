const getCoinRate = async (coinName) => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/' + coinName);
    
    const rate = response.data.market_data.current_price.usd;
    const high = response.data.market_data.high_24h.usd;
    const low = response.data.market_data.low_24h.usd;
    const mc = response.data.market_data.market_cap.btc;
    const pc = response.data.market_data.price_change_percentage_1h_in_currency.usd;
    const pc2 = response.data.market_data.price_change_percentage_24h_in_currency.usd;
    assignProperties(rate, high, low, mc, pc, pc2);
}


function assignProperties(rate, high, low, mc, pc, pc2) {
    if(pc<0){
        document.getElementById('pc').style.color = 'red';
    }
    else{
        document.getElementById('pc').style.color = 'green';
    }
    if(pc2<0){
        document.getElementById('pc2').style.color = 'red';
    }
    else{
        document.getElementById('pc2').style.color = 'green';
    }
    document.getElementById('price').innerHTML = "$"+rate;
    document.getElementById('high').innerHTML = "$"+high;
    document.getElementById('low').innerHTML = "$"+low;
    document.getElementById('mc').innerHTML = mc;
    document.getElementById('pc').innerHTML = pc+"%";
    document.getElementById('pc2').innerHTML = pc2+"%";
}

const bitcoin = document.getElementById("bitcoin");
const eth = document.getElementById("ethereum");
const solana = document.getElementById("solana");
const doge = document.getElementById("dogecoin");
const cardano = document.getElementById("cardano");
let x = false;

bitcoin.addEventListener("click", function(){
    getCoinRate("bitcoin");
    getRate("bitcoin");
});
eth.addEventListener("click", function(){
    getCoinRate("ethereum");
    getRate("ethereum");
});
solana.addEventListener("click", function(){
    getCoinRate("solana");
    getRate("solana");
});
doge.addEventListener("click", function(){
    getCoinRate("dogecoin");
    getRate("dogecoin");
});
cardano.addEventListener("click", function(){
    getCoinRate("cardano");
    getRate("cardano");
});


document.getElementById('darkmode').addEventListener("click", function(){
    if (x == false) {
        document.body.style.background = "#2c2c2c";
        document.body.style.color = "#fff";
        x = true;
    }
    else{
        document.body.style.background = "linear-gradient(to bottom, #fdfbfd 0%, #d8d6d8 100%) no-repeat fixed";
        document.body.style.color = "#000";
        x = false;
    }
});

getCoinRate("bitcoin");


/////////////   THE CHART   //////////////


//var dlr = [];
var priceYear = [];
var days = [];


const getRate = async (coinName) => {
    const response2 = await axios.get('https://api.coingecko.com/api/v3/coins/'+coinName+'/market_chart/range?vs_currency=usd&from='+(Math.round((new Date()).getTime() / 1000)-31556926)+'&to='+ Math.round((new Date()).getTime() / 1000));
    //dlr.length = 0;
    priceYear.length = 0;
    days.length = 0;
    for(var i = 0,j=1; i<response2.data.prices.length; i++,j++){
        priceYear.push(response2.data.prices[i][1].toFixed(2));
        //dlr.push('$' + response2.data.prices[i][1]);
        days.push(new Date(response2.data.prices[i][0]).toLocaleString());
    }
    myChart.update()
}

getRate("bitcoin");





//for(var i=1;i<priceYear.length;i++){
//    days.push(i);
//}




const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'price',
            data: priceYear,
            borderWidth: 1,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            pointStyle: 'circle',
            pointRadius: 1

        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            },
            x: {
                display: false
            }
        },
        plugins: {
            legend: {
              display: false
            },
            title: {
                display: true,
                text: 'Price over the last year'
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});