$(document).ready(function() {
  //set up audio context
  audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	context = new audioContext();

  // create oscillator
  var osc1 = context.createOscillator();
  var osc2 = context.createOscillator();
  var offset = 0;

  //create gain
  var gain1 = context.createGain();
  var gain2 = context.createGain();
  var gainTot = context.createGain();
  gainTot.gain.value = 1/2;

  //wiring everything
  osc1.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(gainTot);
  gain2.connect(gainTot);
  gainTot.connect(context.destination);
  osc1.start();
  osc2.start();

  var changeGain = function(gainNode, value){
    gainNode.gain.value = Math.max(0, Math.min(1, value));
  }

  var changeFrequency = function(oscillator, value){
    oscillator.frequency.value = value;
  }

  var theremin = document.getElementById("theremin");
  $(theremin).mousemove(function(event){
    var h = this.clientHeight;
    var w = this.clientWidth;
    var y = event.clientY;
    var x = event.clientX;
    //changeGain(gain1, Math.log((y/h)*(Math.E-1)+1));
    changeFrequency(osc1, Math.round(150 + Math.log((x/w)*(Math.E-1) +1)*700));
    changeFrequency(osc2, osc1.frequency.value + offset);
  })

  theremin.addEventListener("mousewheel", function(e){
    var deltaX = e.wheelDeltaX/120;
    var deltaY = e.wheelDeltaY/120;
    changeGain(gain1, gain1.gain.value+ 0.1*deltaY);
    changeGain(gain2, gain2.gain.value+ 0.1*deltaY);
    var newOffset = (offset + deltaX);
    offset = Math.max(0, Math.min(25, newOffset));
    //changeFrequency(osc2, Math.max(150, Math.min(850, osc2.frequency.value + 25*deltaX)));
  }, false);
});
