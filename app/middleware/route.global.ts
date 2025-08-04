export default defineNuxtRouteMiddleware(to => {
    const selectedStation = useStation()
    if (to.path !== '/' && !selectedStation.value) {
        // Redirect to the home page if no station is selected
        return navigateTo({ path: '/' })
    }
})