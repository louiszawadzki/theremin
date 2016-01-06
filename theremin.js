$(document).ready(function() {
  //set up audio context
  audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	context = new audioContext();

  // create oscillator
  var osc1 = context.createOscillator();
  var osc2 = context.createOscillator();

  //create gain
  var gain1 = context.createGain();
  var gain2 = context.createGain();
  var gainTot = context.createGain();
  gainTot.gain.value = Math.sqrt(1/2);

  //wiring everything
  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(gainTot);
  gain2.connect(gainTot);
  gainTot.connect(context.destination);
  osc1.start();
  osc2.start();



  var thereminSurface = document.getElementById("theremin");
  $(theremin).mousemove(function(event){
    var h = this.clientHeight;
    var w = this.clientWidth;
    var y = event.clientY;
    var x = event.clientX;
    gain1.gain.value = Math.log((y/h)*(Math.E-1)+1)/Math.sqrt(2);
    osc1.frequency.value = Math.round(150 + Math.log((x/w)*(Math.E-1) +1)*700);
  })

  theremin.addEventListener("mousewheel", function(e){
    var deltaX = e.wheelDeltaX/120;
    var deltaY = e.wheelDeltaY/120;
    gain2.gain.value = Math.max(0,Math.min(1, gain2.gain.value+ 0.1*deltaY));
    osc2.frequency.value = Math.max(150, Math.min(850, osc2.frequency.value + 25*deltaX));
  }, false);
});
