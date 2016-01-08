function setTheremin() {
  //set up audio context
  audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	context = new audioContext();

  // create oscillator
  osc1 = context.createOscillator();
  osc2 = context.createOscillator();

  //create gain
  gain1 = context.createGain();
  gain2 = context.createGain();
  var gainTot = context.createGain();
  gainTot.gain.value = 1/2;

  // create lowpass filters
  filter1 = context.createBiquadFilter();
  filter2 = context.createBiquadFilter();
  filter1.frequency.value = 1200;
  filter1.Q.value = 0.4;
  filter2.frequency.value = 1200;
  filter2.Q.value = 0.4;

  //wiring everything
  osc1.connect(filter1);
  osc2.connect(filter2);
  filter1.connect(gain1);
  filter2.connect(gain2);
  gain1.connect(gainTot);
  gain2.connect(gainTot);
  gainTot.connect(context.destination);
  osc1.start();
  osc2.start();
}
//useful functions
changeGain = function(gainNode, value){
  gainNode.gain.value = Math.max(0, Math.min(1, value));
};
changeFrequency = function(oscillator, value){
  oscillator.frequency.value = value;
};
var harmonics = [0.0, 1.0, 0.06, 0.01, 0.04, 0.1, 0.06, 0.02];
generateWave = function(value){
  var numHarm = 8;
  var real = new Float32Array(numHarm);
  var imag = new Float32Array(numHarm);
  real[0] = 0;
  imag[0] = 0;
  for (h=1; h<numHarm; h++) {
    real[h] = Math.exp((1-h)*(1-value))*Math.cos(h-1)*harmonics[h];
    imag[h] = Math.exp((1-h)*(1-value))*Math.sin(h-1)*harmonics[h];
  }
  return context.createPeriodicWave(real, imag, {disableNormalization: true});
};

effectChangeParam = function(){return true;};
effectReset = function(){return true;};
