function openTab(tab, event){
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  if(event && event.target) event.target.classList.add('active');
}

// Pan & zoom 2D
function init2DPanZoom() {
  const img = document.getElementById('pcb2D-img');
  if(!img) return;

  let scale = 1, posX = 0, posY = 0, isDragging = false, startX, startY;

  img.addEventListener('wheel', e => {
    e.preventDefault();
    scale = e.deltaY < 0 ? scale+0.1 : Math.max(0.5, scale-0.1);
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  });

  img.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    img.style.cursor='grabbing';
  });

  window.addEventListener('mousemove', e => {
    if(!isDragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  });

  window.addEventListener('mouseup', e => {
    isDragging = false;
    img.style.cursor='grab';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  init2DPanZoom();
});
