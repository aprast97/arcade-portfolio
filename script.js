const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(frequency = 440, duration = 0.1, type = 'square') {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.pixel-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            playBeep(880, 0.05);
        });

        btn.addEventListener('click', () => {
            playBeep(440, 0.1);
        });
    });
});
