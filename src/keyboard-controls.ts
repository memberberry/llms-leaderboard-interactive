export function initControls(action){

    window.addEventListener('keydown', (event) => {
        if (event.key === 'z') action()
    });

}
