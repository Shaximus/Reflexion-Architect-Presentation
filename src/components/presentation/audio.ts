let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: OscillatorNode[] = [];

export function startDrone() {
  if (typeof window === "undefined") return;
  if (ctx) {
    void ctx.resume();
    if (master) master.gain.value = 0.045;
    return;
  }
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AudioCtx();
  master = ctx.createGain();
  master.gain.value = 0.045;
  master.connect(ctx.destination);

  const make = (freq: number, type: OscillatorType, gain: number) => {
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(master);
    osc.start();
    nodes.push(osc);
  };

  make(55, "sine", 0.7);
  make(82.5, "sine", 0.22);
  make(110, "triangle", 0.08);
}

export function setDroneMuted(muted: boolean) {
  if (!master || !ctx) return;
  master.gain.setTargetAtTime(muted ? 0 : 0.045, ctx.currentTime, 0.08);
}

export function stopDrone() {
  nodes.forEach((n) => {
    try {
      n.stop();
    } catch {
      /* ignore */
    }
  });
  nodes = [];
  void ctx?.close();
  ctx = null;
  master = null;
}
