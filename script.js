const searchBtn = document.getElementById('btn');
const input = document.getElementById('input');
let image = document.querySelector('img')
let playerName = document.querySelector('h3')
let playNumber = document.querySelector('.number')
const stats = document.querySelector('.stats')
const gamesPlayed = document.querySelector('.gamesPlayed')
const seasonPts = document.querySelector('.seasonPts')
const seasonAst = document.querySelector('.seasonAst')
const seasonBlks = document.querySelector('.seasonBlks')
const container = document.querySelector('.infoContainer')

searchBtn.addEventListener('click', function () {
  container.classList.remove('hide')
	gamesPlayed.textContent = ''
	seasonAst.textContent = ''
	seasonPts.textContent = ''
	seasonBlks.textContent = ''
	fetch(`https://www.balldontlie.io/api/v1/players?search=${input.value}`)
		.then(function (response) {
			return response.json()
		}).then(function (data) {
			console.log(data)
			playerName.textContent = [data.data[0].first_name, data.data[0].last_name].join(' ')
		})
  localStorage.setItem('player', input.value)
	let array = [];
	let playerSearch = input.value
	let arrayPlayerSearch = playerSearch.split(' ')

	return fetch('https://data.nba.net/data/10s/prod/v1/2021/players.json')
		.then(function (response) {
			return response.json()
		}).then(function (data) {
			array.push(data.league.standard)
			for (i = 0; i < array[0].length; i++) {
				let firstNameLower = array[0][i].firstName.toLowerCase()
				let lastNameLower = array[0][i].lastName.toLowerCase()
				let firstNameSearchLower = arrayPlayerSearch[0].toLowerCase()
				let lastNameSearchLower = arrayPlayerSearch[1].toLowerCase()
				if (firstNameLower === firstNameSearchLower && lastNameLower === lastNameSearchLower) {
					let playerId = array[0][i].personId
					image.src = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + playerId + ".png"
					playNumber.textContent = '#' + array[0][i].jersey
				}
				else { }
			}
		})
})

const statsContainer = document.querySelector('.statsContainer')

stats.addEventListener('click', function () {
  statsContainer.classList.remove('hide')
	let statsArray = []
	let playerId;
  let playerSearch2 = localStorage.getItem('player')
console.log(playerSearch2)
	let arrayPlayerSearch = playerSearch2.split(' ')
console.log(arrayPlayerSearch)
	fetch("https://www.balldontlie.io/api/v1/players?per_page=100&search=" + arrayPlayerSearch[1] + "")
		.then(function (response) {
			return response.json()
		}).then(function (data) {
			console.log(data)
			statsArray.push(data.data)
			console.log(statsArray)
			for (i = 0; i < statsArray[0].length; i++) {
				let firstNameLower = statsArray[0][i].first_name.toLowerCase()
				let lastNameLower = statsArray[0][i].last_name.toLowerCase()
				let firstNameSearchLower = arrayPlayerSearch[0].toLowerCase()
				let lastNameSearchLower = arrayPlayerSearch[1].toLowerCase()
				if (firstNameLower === firstNameSearchLower && lastNameLower === lastNameSearchLower) {
					playerId = statsArray[0][i].id
					console.log(playerId)


				}
				else { }
			}

			fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`)
				.then(function (response) {
					return response.json()
				}).then(function (data) {
					console.log(data)
					gamesPlayed.textContent = data.data[0].games_played
					seasonPts.textContent =  data.data[0].pts
					seasonAst.textContent =  data.data[0].ast
					seasonBlks.textContent = data.data[0].blk
				})
		})

})


// fetch("https://www.balldontlie.io/api/v1/teams")
// .then(function(response){
// 	return response.json()
// })
// .then(function(data){
// 	console.log(data)
// })

// fetch("https://www.balldontlie.io/api/v1/games?page=2&per_page=100&seasons[]=2013&team_ids[]=27")
// .then(function(response){
// 	return response.json()
// })
// .then(function(data){
// 	console.log(data)
// })
