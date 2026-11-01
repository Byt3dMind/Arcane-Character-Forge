// Web Audio API Sound Synthesizer for Fantasy Character Generator

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function initAudio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('fcg_sound_enabled');
    if (stored !== null) {
      soundEnabled = stored === 'true';
    }
  }
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('fcg_sound_enabled', enabled ? 'true' : 'false');
  }
}

// Gentle magical chime + roll sound for character generation
export function playGenerateSound() {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Dice rattle rumble
  for (let i = 0; i < 4; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 80, now + i * 0.04);
    osc.frequency.exponentialRampToValueAtTime(70, now + i * 0.04 + 0.05);

    gain.gain.setValueAtTime(0.06, now + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.04);
    osc.stop(now + i * 0.04 + 0.07);
  }

  // Harmonic chord resolution (Arpeggiated pentatonic chord)
  const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + 0.12 + idx * 0.04);

    gain.gain.setValueAtTime(0.08, now + 0.12 + idx * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.12 + idx * 0.04 + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + 0.12 + idx * 0.04);
    osc.stop(now + 0.12 + idx * 0.04 + 0.5);
  });
}

// Crisp UI click / toggle sound
export function playClickSound() {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

// Favorite/Save chime
export function playSaveSound() {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [587.33, 880]; // D5, A5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.06);

    gain.gain.setValueAtTime(0.07, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.35);
  });
}
