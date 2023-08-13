function do_everything(freq){

  var audioCtx =  new (window.AudioContext || window.webkitAudioContext)();
 	var time = 0
  var osc = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  var filter = audioCtx.createBiquadFilter()

  osc.frequency.value=freq
  osc.type = "sawtooth"


  // amplitude envelope values
  var ampAtk = 0.1;
  var ampSus = 2;
  var ampDec = 0.4;
  
  filter.type = "low-pass"
	filter.frequency.value=1000	



  // amplitude envelope
  gainNode.gain.value=0.05;
  gainNode.gain.setValueAtTime(0.001, time);
  // gain.gain.setTargetAtTime(0.1, time + 0.01, 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.5, time + ampAtk);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + ampSus + ampDec);
  // add small padding at the end (0.01) to prevent clipping when oscillator stops
  
  osc.connect(filter)
  
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination)
  osc.start()
	osc.stop(time + ampSus + ampDec + 0.1);
}
