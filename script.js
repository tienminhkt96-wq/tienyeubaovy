// Configuration
const lines = Array.from(document.querySelectorAll('.line'));
const finalBox = document.getElementById('final');
const finalText = document.querySelector('.final-text');
const heartsContainer = document.getElementById('hearts');
const ytIframe = document.getElementById('yt-iframe');

// YouTube embed for "Perfect - Ed Sheeran" piano-ish (use official video id or piano cover embed id)
const youtubeEmbed = "https://www.youtube.com/embed/2Vv-BfVoq4g?autoplay=1&rel=0&modestbranding=1&controls=0";

// Auto-run when page loads
window.addEventListener('load', ()=> {
  tryStartMusic();
  startHearts();
  revealLinesSequentially();
});


// Attempt to start YouTube autoplay by setting iframe src
function tryStartMusic(){
  // set iframe src (browser may block autoplay if not allowed)
  const iframe = document.getElementById('yt-iframe');
  iframe.src = youtubeEmbed;
  // Also try to play with Audio fallback (will likely be blocked if not user gesture)
  // Note: Many browsers block autoplay with sound; in that case visitor can press Play manually.
}

// Hearts spawning
let heartInterval;
function spawnHeart(){
  const h = document.createElement('div');
  h.className = 'heart';
  const size = Math.floor(Math.random() * 18) + 12;
  h.style.width = `${size}px`;
  h.style.height = `${size}px`;
  h.style.left = (Math.random() * 100) + '%';
  h.style.bottom = '-30px';
  h.style.opacity = (0.7 + Math.random()*0.3);
  h.style.animationDuration = (6 + Math.random() * 6) + 's';
  heartsContainer.appendChild(h);
  setTimeout(()=> h.remove(), 12000);
}
function startHearts(){ heartInterval = setInterval(spawnHeart, 450); setTimeout(()=> clearInterval(heartInterval), 25000); }

// Reveal lines one by one
function revealLinesSequentially(){
  lines.forEach((el, idx)=>{
    setTimeout(()=>{
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      // small pulse for each line
      el.animate([{transform:'translateY(6px)'},{transform:'translateY(0)'}],{duration:700,fill:'forwards'});
      // when last line appears, show final message
      if(idx === lines.length -1){
        setTimeout(showFinalMessage, 1600);
      }
    }, 900 + idx * 1600);
  });
}

// Final message reveal with exploding hearts
function showFinalMessage(){
  finalBox.classList.remove('hidden');
  finalBox.classList.add('show');
  finalText.style.opacity = 1;
  finalText.style.transform = 'scale(1)';
  // burst more hearts
  for(let i=0;i<30;i++){ setTimeout(spawnHeart, i*80); }
  // tiny pulse animation
  finalText.animate([{transform:'scale(0.95)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:1200,iterations:2});
}

// Accessibility: if autoplay blocked, allow click to start (not shown visually but works)
document.addEventListener('click', ()=>{
  // if music already set, it's fine; else try set iframe src to trigger play
  const iframe = document.getElementById('yt-iframe');
  if(!iframe.src) iframe.src = youtubeEmbed;
});

// Prevent scrolling during animation
document.addEventListener('touchmove', function(e){ e.preventDefault(); }, {passive:false});