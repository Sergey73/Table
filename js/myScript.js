window.onload = function () {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    var div2 = document.createElement( 'div');
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
    button1.title = 'Ctrl+1';
    button2.onclick = function () { addList() }
    button2.title = 'Ctrl+2';
    button3.onclick = function () { delSelected() }
    button3.title = 'Del';
    button4.onclick = function () { removeAll() }
    button4.title = 'Ctrl+3';
		
    document.body.appendChild(fragment); 
   
    var table;
    var removeAll = function (event) {
		event ? event.preventDefault() : null;
		localStorage.removeItem(store.key);
		location.reload();
	}
    
    var addList = function (event) {
		event ? event.preventDefault() : null;
        if (input.value == '') {
            alert('Поле не заполнено!');
        } else {
            store.put({ name: input.value });
            table = new Table({ data: store.data });
        }
        input.value = '';
        return false
    }
    
    var delSelected = function (event) {
		event ? event.preventDefault() : null;
        var arrayBox = document.getElementsByName('box');
        var count = arrayBox.length - 1;
        for (i = count; i > 0; i--) {	
            if (arrayBox[i].checked == true) {
                var valBox = arrayBox[i].value;
                store.remove(valBox);
                var tr = arrayBox[i].parentNode.parentNode.sectionRowIndex;
                document.getElementsByTagName('table')[0].tBodies[0].deleteRow(tr);
            }
        }
    }
    
    function search (event) {
		event ? event.preventDefault() : null;
        var valTxt = input.value;
        var arraySearch = store.search(valTxt);
        table = new Table({ data: arraySearch });		
        
    }
    
    var store = new Store();
    if (localStorage[store.key]) {
		store.add();
	} else {
		myData.forEach( function (obj) { store.put(obj) });
	}
	
    table = new Table({ data: store.data });
    
	document.onkeydown = function (event) {
		var el = div3.getElementsByClassName('click')[0];
		var code = event.keyCode;
		var cKey = event.ctrlKey;
		code == 40 ? el ? key( el.nextSibling ) : null : null;	// down
		code == 38 ? el ? key( el.previousSibling ) : null : null;	// up
		code == 13 ? el ? table._clickTr(el, event): null : null;	// Enter
		code == 46 ? delSelected(event) : null;	// del
		cKey && code == 49 ? search(event) : null;	// ctrl + 1
		cKey && code == 50 ? addList(event) : null;	// ctrl + 2
		cKey && code == 51 ? removeAll(event) : null;	// ctrl + 3
		cKey && code == 65 ? allBox(event) : null;	// ctrl + A
		
		function allBox (event) {
			event.preventDefault();
			var arrayBox = document.getElementsByName('box');
			for (i = 0; i < arrayBox.length; i++) {
				arrayBox[i].checked = true;
			} 
		}
		
		function key( nextOrPrevious ) {
		event.preventDefault();
		var bound = div3.getBoundingClientRect();
			if ( nextOrPrevious !== null ) {
				el.className = '';
				el = nextOrPrevious;
				el.className = 'click';
				var boundElem = el.getBoundingClientRect();
				if ( event.keyCode == 40 ) {
					boundElem.bottom > bound.bottom ? div3.scrollTop += 30 : null;
				} else if ( event.keyCode == 38 ) {
					boundElem.top < bound.top ? div3.scrollTop -= 30 : null;
				}
			}
		}
	} 	
}




