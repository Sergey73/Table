window.onload = function () {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    var div2 = document.createElement('div');
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
    var div3 = document.createElement('div');
 
    fragment.appendChild(div);
		div.appendChild(form);
			form.appendChild(button1);
				button1.appendChild(text1);
			form.appendChild(input);
			form.appendChild(button2);
				button2.appendChild(text2);
			form.appendChild(button3);
				button3.appendChild(text3);
			form.appendChild(button4);
				button4.appendChild(text4);
		div.appendChild(div2);
		div.appendChild(div3);
   
    div.id = 'container';
    div2.className = 'border'
    form.id = 'myForm';
    input.id = 'myTxt';
    button1.type = 'button';
    button2.type = 'button';
    button3.type = 'button';
    div3.id = 'list';
   
    button1.onclick = function () { search() }
    button2.onclick = function () { addList() }
    button3.onclick = function () { delSelected() }
    button4.onclick = function () { removeAll() }
    
    document.body.appendChild(fragment); 
    
    var removeAll = function () {
		localStorage.removeItem(store.key);
	}
    
    var addList = function () {
        if (input.value == '') {
            alert('Поле не заполнено!');
        } else {
            store.put({ name: input.value });
            new Table({ data: store.data });
        }
        input.value = '';
        return false
    }
    
    var delSelected = function () {
        var arrayBox = document.getElementsByName('box');
        var count = arrayBox.length - 1;
        for (i = count; i > 0; i--) {	
            if (arrayBox[i].checked == true) {
                var valBox = arrayBox[i].value;
                store.remove(valBox);
                var tr = arrayBox[i].parentNode.parentNode.sectionRowIndex;
                document.getElementsByTagName('table') [0].tBodies[0].deleteRow(tr);
            }
        }
    }
    
    var search = function () {
        var valTxt = input.value;
        var arraySearch = store.search(valTxt);
        new Table({ data: arraySearch });		
        
    }
    
    var store = new Store();
    if (localStorage[store.key]) {
		store.add();
	} else {
		myData.forEach(function (obj) {store.put(obj)});
	}
    new Table({ data: store.data });
}
