//load database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./databases/data.db');

const fetch = require("node-fetch");

async function getStats() {
    //fetch the stats
    let result = await fetch("http://localhost:4442/api/getTotalStats")
    
    let json = await result.json();

    let currentTime = Date.now();

    db.prepare("INSERT INTO data VALUES(?, ?, ?, ?, ?)").run(currentTime, json.userCount, json.viewCount, json.totalSubmissions, json.minutesSaved);
}

//get stats every 20 seconds
setInterval(getStats, 20000);