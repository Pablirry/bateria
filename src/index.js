const keys = document.querySelectorAll('.key');

function playSound(e) {
    const keyCode = e.type === 'keydown' ? e.keyCode : this.dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    if (!audio || !key) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing', 'active-key');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing', 'active-key');
}

// Elimina el efecto al soltar la tecla
window.addEventListener('keyup', function(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (key) key.classList.remove('playing', 'active-key');
});

keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('mousedown', function () {
        playSound.call(this, { type: 'click', keyCode: this.dataset.key });
    });
    key.addEventListener('mouseup', function () {
        this.classList.remove('playing', 'active-key');
    });
    key.addEventListener('mouseleave', function () {
        this.classList.remove('playing', 'active-key');
    });
});

// Soporte para teclado
window.addEventListener('keydown', function(e) {
    if (e.repeat) return;
    playSound(e);
});