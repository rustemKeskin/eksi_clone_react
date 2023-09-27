
function toggleColor(el) {

  if (el.id == 'baslik') {    
    document.querySelector('#icerik').style.color = 'black';
    document.querySelector('#icerik').style.border = 'none';
    document.querySelector('#baslik').style.borderBottom = '3px solid green';
    document.querySelector('#baslik').style.color = 'green';
  } else {
    document.querySelector('#baslik').style.color = 'black';
    document.querySelector('#baslik').style.border = 'none';
    document.querySelector('#icerik').style.borderBottom = '3px solid green';
    document.querySelector('#icerik').style.color = 'green';
  }
}


function toggleContent(el) {

  if (el.id == 'baslik') {
    document.querySelector('#main').style.display = 'none';
    document.querySelector('aside').style.display = 'block';
  } else {
    document.querySelector('#main').style.display = 'block';
    document.querySelector('aside').style.display = 'none';
  }
}


export default { toggleColor, toggleContent}

