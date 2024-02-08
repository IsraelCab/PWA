if('serviceWorker' in navigator)
{
    console.log("Service Worker available")
    // Configuration
    navigator.serviceWorker.register('./serviceWorker.js')
        .then(res => console.log('Service worker correctly uploaded', res))
        .catch(err => console.log('Service worker can not register', err));
}
else
{
    console.log("Service worker can not be used");
}