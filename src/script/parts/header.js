const logoUrl = `logo-sony.svg`;

export function header() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo">
            <div class="logo__image">
                <img src="../image/` + logoUrl + `">
            </div>
        </div>
    `
}
export function headerSecond() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo">
            <div class="logo__image">
                <img src="../../image/` + logoUrl + `">
            </div>
        </div>
    `
}

export function headerThird() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="logo">
            <div class="logo__image">
                <img src="../../image/` + logoUrl + `">
            </div>
        </div>
    `
}
