const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1') //accessing id using #
const messageTwo = document.querySelector('#message-2') //accessing id using #


weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    e.preventDefault()

    const url = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch(url).then((response) => {
        response.json().then(({ error, forecast, location, address } = {}) => {

            if (error) {
                messageOne.textContent = error
                return

            }
            messageOne.textContent = forecast
            messageTwo.textContent = location
            return

        })
    })

})