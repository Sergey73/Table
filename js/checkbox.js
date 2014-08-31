function Checkbox () {};

Checkbox.prototype.createChek = function (td, val) {
	var self = this;
	var box = document.createElement('input');
	td.appendChild(box);
	box.type = 'checkbox';
	box.name = 'box';	
	val ? box.value = val : null;		
	box.onclick = function () { self.onOffHeadBox() }
	return box		
}

Checkbox.prototype.onOffHeadBox = function () {
	var arrayBox =  document.getElementsByName('box');
	for (i = 1; i < arrayBox.length; i++) {
		if (arrayBox[i].checked == true) {
			arrayBox[0].checked = true;
		} else {
			arrayBox[0].checked = false;
			break
		}
	}
}

Checkbox.prototype.allBox = function (event) {
	var arrayBox =  document.getElementsByName('box');
	for (i = 1; i < arrayBox.length; i++) {
		if(event) {
			event.preventDefault();
			arrayBox[0].checked = true;
			arrayBox[i].checked = true;
		} else {
			var val = arrayBox[0].checked == true ? true : false;
			arrayBox[i].checked = val;
		}
	} 
}

