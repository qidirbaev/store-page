(function () {
  "use strict";

  let loginForm = document.getElementById('login')
  let loginBtn = document.getElementById('login-btn')
  let parolBtn = document.getElementById('parol-btn')
  let intervalId, currentIntervalInSeconds = 0

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    loginBtn.setAttribute('disabled', true)
    parolBtn.setAttribute('disabled', true)
    loginBtn.innerHTML = `
     <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    `
    intervalId = setInterval(() => {
      currentIntervalInSeconds += 1
    }, 1000)

    let action = this.getAttribute('action')

    displayToastWithData('Orınlanbaqta...', currentIntervalInSeconds)

    let formData = new FormData(this);

    try {
      const response = await login(this, action, formData)

      if (response) {
        console.log(response)
        const data = await JSON.parse(response)
        displayToastWithData(data.message, currentIntervalInSeconds)
      }
    } catch (error) {
      console.log(error)
      displayToastWithData(error, currentIntervalInSeconds)

    }

    clearInterval(intervalId)
    loginBtn.setAttribute('disabled', false)
    parolBtn.setAttribute('disabled', false)
    loginBtn.innerHTML = `Kiriw`
  })

  async function login(form, action, formData) {
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })

    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText} ${response.url}`)

    const data = await response.text()

    form.reset()

    return data
  }

  function displayToastWithData(body, timer = '5', header = 'Buyırtpa beriw') {
    const toastContainer = document.getElementById('toastContainer')
    const newToast = document.createElement('div')

    newToast.classList.add('toast')
    newToast.setAttribute('role', 'alert')
    newToast.setAttribute('aria-live', 'assertive')
    newToast.setAttribute('aria-atomic', 'true')
    newToast.setAttribute('data-bs-delay', '5000')
    newToast.setAttribute('data-bs-autohide', 'true')
    newToast.setAttribute('data-bs-animation', 'true')

    newToast.innerHTML = `
      <div class="toast-header">
        <i class="bi bi-bell-fill me-2"></i>
        <strong id="toast-header" class="me-auto">${header}</strong>
        <small id="toast-timer">${timer} sekund aldın</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div id="toast-body" class="toast-body">
        ${body}
      </div>
    `

    toastContainer.appendChild(newToast)

    const toast = new bootstrap.Toast(newToast)

    toast.show()
  }
})()