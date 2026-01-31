let cat = document.querySelector('.cat')
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    console.log('Пробел нажат');

	if([...cat.classList].includes('jump')){
		cat.classList.remove('jump');

	}
	else{
		cat.classList.add('jump');
	}
    	
	
  }
});