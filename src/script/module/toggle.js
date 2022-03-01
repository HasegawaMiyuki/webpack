export function classToggle() {
    const dropdown = document.querySelectorAll('.toggle');
    console.log(dropdown.length)
    for (let index = 0; index < dropdown.length; index++) {
        dropdown[index].addEventListener('click', function () {
            dropdown[index].classList.toggle('open');
        });
    }
}
