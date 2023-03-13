const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne =document.querySelector('#message-1')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading ...'

    fetch('/weather?address='+search.value).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.official_name + " Weather: " + data.forecastData.weather + " " + data.forecastData.current
            }
        })
    })
})
