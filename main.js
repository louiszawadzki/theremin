$(document).ready(function(){
  var offset = 0;
  setTheremin();
  webGLStart();

  $(document).keypress(function(e){
    // activates tremolo
    if (event.which == 116) {
      effectChangeParam = function (deltaX) {
        var newOffset = (offset + deltaX);
        offset = Math.max(0, Math.min(25, newOffset));
        changeFrequency(osc2, osc1.frequency.value + offset);
        setBackgroundPulse(offset);
      }
      effectReset = function (){
        offset = 0;
        changeFrequency(osc2, osc1.frequency.value);
        setBackgroundPulse(0);
      }
    }
    // effect reset
    if (event.which == 32) {
      effectReset();
    }
  });

  var theremin = document.getElementById("visuals");
  $(theremin).mousemove(function(event){
    // values
    var h = this.clientHeight;
    var w = this.clientWidth;
    var y = event.clientY;
    var x = event.clientX;

    // sound effects
    var wave = generateWave(y/h);
    osc1.setPeriodicWave(wave);
    osc2.setPeriodicWave(wave);
    changeFrequency(osc1, Math.round(150 + Math.log((x/w)*(Math.E-1) +1)*700));
    changeFrequency(osc2, osc1.frequency.value + offset);

    //visual effects
    rX = 25 + (x/6);
    setBackgroundColor(Math.sqrt(y/h));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(setColors(color)), gl.STATIC_DRAW);
  })

  theremin.addEventListener("mousewheel", function(e){
    var deltaX = e.wheelDeltaX/120;
    var deltaY = e.wheelDeltaY/120;
    changeGain(gain1, gain1.gain.value+ 0.1*deltaY);
    changeGain(gain2, gain2.gain.value+ 0.1*deltaY);
    effectChangeParam(deltaX);
  }, false);

});
