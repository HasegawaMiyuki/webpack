export function loading() {
    const loader = document.querySelector('#loader');
    loader.innerHTML = `
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
    `
    window.onload = function () {
        const loader = document.getElementById('loader');
        loader.classList.add('loaded');
    }
}
