
let ipAdress = "45.137.226.243"; //my ip

const button = document.querySelector(".search-button");


button.addEventListener('click', (e) => {

    const ipAdress = document.querySelector(".search-input").value;
    let pattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
    let regexTest = pattern.test(ipAdress);
    const apiKey = "at_TmiepdpDDf3k7MpMAwnPWsvDJNAdW";
    const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ipAdress}`;
    const ip = document.querySelector(".ip");
    const location = document.querySelector(".location");
    const timezone = document.querySelector(".timezone");
    const isp = document.querySelector(".isp");
    

    if(regexTest)
    {
        fetch(url)
        .then(request => request.json())
        .then(res => {
            console.log(res);
            ip.innerText = res.ip;
            location.innerText = res.location.country +" "+ res.location.city;
            timezone.innerText = "UTC " + res.location.timezone;
            isp.innerText = res.isp;
            
            let map = L.map('map').setView([res.location.lat, res.location.lng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            let marker = L.marker([res.location.lat, res.location.lng]).addTo(map);
            marker.bindPopup("<b>Tu jesteś!</b>").openPopup();

        });
    }

})




