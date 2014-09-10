function Form (formDiv) {
	this._form(formDiv);
	return this
}

Form.prototype._form = function (formDiv) {
	
	var fragment = document.createDocumentFragment();
    var form = document.createElement('form');
    var input = document.createElement('input');
    var button1 = document.createElement('button');
    var text1 = document.createTextNode('Найти');
    var button2 = document.createElement('button');
    var text2 = document.createTextNode('Добавить');
    var button3 = document.createElement('button');
    var text3 = document.createTextNode('Удалить');
    var button4 = document.createElement('button');
    var text4 = document.createTextNode('Очистить localStorage');
	
	this.form = form;
	this.input = input;
	this.butSearch = button1;
	this.butAdd = button2;
	this.butRemove = button3;
	this.butRemoveAll = button4;
	
    fragment.appendChild(form);
			form.appendChild(button1);
				button1.appendChild(text1);
			form.appendChild(input);
			form.appendChild(button2);
				button2.appendChild(text2);
			form.appendChild(button3);
				button3.appendChild(text3);
			form.appendChild(button4);
				button4.appendChild(text4);

   	form.className = 'myForm';
    button1.type = 'button';
    button2.type = 'button';
    button3.type = 'button';
	
    formDiv.appendChild(fragment);  
}
