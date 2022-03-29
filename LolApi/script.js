var request_path = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" //Arcessam?api_key=
var username = "lecodeurfr"
var api_Key = "RGAPI-7c30aa88-fff6-4709-88c3-b7767c0fcb1a" // ?api_key=RGAPI-7c30aa88-fff6-4709-88c3-b7767c0fcb1a
var summonerID;
var accountID;
var puuid;
var profileIcon;
var summonerLVL;
var nbShowChamp = 3;

document.getElementById("playerName").innerText = username;
document.getElementById("search").value = username

function search(){
    username = document.getElementById("search").value
    document.getElementById("playerName").innerText = username;
    document.getElementById("search").value = username
    get_id()
}

function get_id(){
    var request = new XMLHttpRequest()
    request.open('GET', request_path + username + "?api_key=" + api_Key, true )
    request.onload = function (){
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400){
            get_masteries(data.id)
        }else{
            alert("error")
        }
    }
    request.send()
}
get_id()

var mastery_path = "https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"

var nbChamp = 0

function get_masteries(summ_id){
    var request = new XMLHttpRequest()
    request.open('GET', `${mastery_path + arguments[0]}?api_key=${api_Key}`, true)
    request.onload = function (){
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400){
            console.log(data)
            get_champ_mastery(data[nbChamp], data[nbChamp].championLevel, data[nbChamp].championPoints)
        }else{
            alert("error")
        }
    }
    request.send()
}

var champion_path = "https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json"
var image_path = "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"

function get_champ_mastery(champData, lvl, points){
    console.log(champData)
    var request = new XMLHttpRequest()
    request.open('GET', champion_path, true)
    request.onload = function (){
        var list = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400){
            console.log(list.data)
            for(var i in list.data){
                if(list.data[i].key == champData.championId){
                    var name = list.data[i].name

                    var img = image_path + name + "_0.jpg"
                    document.getElementById("imgChamp").setAttribute("src", img)
                    document.getElementById("champion").innerText = name
                    document.getElementById("masteryIcon").setAttribute("src", './img/mastery/' + lvl + ".webp")
                    document.getElementById("masteryLVL").innerText = "Niveau : " + lvl
                    document.getElementById("masteryPoints").innerText = points + " pts"
                }
            }
        }else{
            alert("error")
        }
    }
    request.send()
}


