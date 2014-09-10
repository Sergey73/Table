function Table (options) {
	var self = this;
	this._funcDefaultOptions(options);
	this.key = this.container + 'Key';
	this.store = new Store({
		jsonData: self.myData,
		key: self.key
	});
	
	this.data = this.store.data;
	this.searchData = [];		
	this.flag = 0;				

	this._createTable();
	this.form = new Form(this.generalDiv);
	this.createTbody(this.data);
	this._createThead();
	
	this._tableKeydown();
	this._tableButton();
	this.scrolling();
	
	return this
}

Table.prototype.defaultOptions = {
	myData: [],
	container: "list",
	columns: {
		checkbox: {},
		id: {label: 'Код'},
		name: {label: 'Наименование документа'}
	}
};

Table.prototype._funcDefaultOptions = function (options) {
	var self = this;
	var defaultOptions = this.defaultOptions;
	for (var option in defaultOptions) {
		if (options && options[option] !==undefined) {	
				this[option] = options[option];					
		} else {												
			this[option] = defaultOptions[option]				
		}
	}
}

Table.prototype._createTable = function () {			
	var container = this.container;
	var userDiv = document.getElementById(container);
	this.userDiv = userDiv;
	
	var generalDiv = document.createElement('div');
	userDiv.appendChild(generalDiv);
	generalDiv.id = container + 'GeneralDiv';
	this.generalDiv = generalDiv;
	
	var tableDiv = document.createElement('div');
	generalDiv.appendChild(tableDiv);
	tableDiv.id = container + 'TableDiv';
	this.tableDiv = tableDiv;
	
	var bodyDiv = document.createElement('div');
	tableDiv.appendChild(bodyDiv);
	bodyDiv.className = 'bodyDiv';
	this.bodyDiv= bodyDiv;
	
	var headDiv = document.createElement('div');
	tableDiv.appendChild(headDiv);
	headDiv.className = 'headDiv';
	this.headDiv = headDiv;
	
	bodyDiv.innerHTML = '';
	
	var tBody = document.createElement('table');
	bodyDiv.appendChild(tBody);
	this.tBody = tBody
	
	var tHead = document.createElement('table');
	headDiv.appendChild(tHead);	
	this.tHead = tHead;
}

Table.prototype._createThead = function () {
	var self = this;
	var columns = this.columns;	
	var tHead = this.tHead;	
	var trHead = tHead.insertRow(0);
	trHead.className = 'tr';	
	for (var key in columns) {
		var valCol = columns[key];				
		var tdHead = trHead.insertCell(-1);
			tdHead.onclick = function () { self._clickSort(this) };
		if (key == 'checkbox') {
			var input = this.createChek(tdHead);
			input.id = this.container + 'HeadBox';
			input.onclick = function () { self.allBox(input.checked, this) }
		} else {
			var label = valCol.label !== undefined ? valCol['label'] : key;
			this._createText(tdHead, label);
		}
	}
	
	tHead.className = 'table';
	trHead.childNodes[0].className = 'firstTd';
	trHead.childNodes[1].className = 'secondTd';
	trHead.childNodes[2].className = 'firdTd'; 
}

Table.prototype.createTbody = function (data) {
	var self = this;
	var tBody = this.tBody;
    var data = data || this.data;
	var columns = this.columns;
	data.forEach(function (obj) {
		var trBody = tBody.insertRow(-1);
		trBody.onclick = function (event) { self._clickTr(trBody, event) }
		for (var key in columns) {
			var tdBody = trBody.insertCell(-1);
			if (key == 'checkbox'){
				self.createChek(tdBody, obj['id'], obj['checkbox']);
			} else {
				self._createText(tdBody, obj[key]);
			} 
		}
		tBody.className = 'table';
		trBody.childNodes[0].className = 'firstTd';
		trBody.childNodes[1].className = 'secondTd';
		trBody.childNodes[2].className = 'firdTd'; 
	});
}

Table.prototype.newDate = function (data) {
	var tBody = this.tBody;
	tBody.innerHTML = '';
	this.createTbody(data);
}

Table.prototype._clickTr = function (tr, event) {
	var tBody = this.tBody;
	var strings = tBody.childNodes[0].childNodes;
	for ( key in strings ) {
		var elem = strings[key];
		elem.className == 'click' ? elem.className = '' : null;
	};
	tr.className = 'click';
	var checkbox = tr.getElementsByTagName('input').box;
	if (event.type == 'keydown' || event.target.type !== 'checkbox') { 
		event.preventDefault();
		checkbox.checked == false ? checkbox.checked = true : checkbox.checked = false;
	}
	for (i = 0; i < this.data.length; i++) {
		var obj = this.data[i];
		if (obj.id == checkbox.value) {
			this.data[i].checkbox = checkbox.checked;
		}
	}
	this.onOffHeadBox();
}

Table.prototype._createText = function (teg, val) {
	var text = document.createTextNode(val);
	teg.appendChild(text);
}

Table.prototype._clickSort = function (tdHead) {
	var sortCell = tdHead.cellIndex;
	var sortBy;
	var array = [];
	var count=0;
	
	for (key in this.columns) {
		sortCell == count ? sortBy = key : null;
		count++
	}
	if (sortBy !== 'checkbox') { 
		for (i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			var elemSort = obj[sortBy];
			var ar = [elemSort, obj];
			array.push(ar);
		}
		function compareNumeric(a, b)  {
			if (!isNaN (+a[0]) && !isNaN (+b[0])) {
				return (+a[0]) > (+b[0]) ? 1 : -1
			} else {
				return a[0].toString() > b[0].toString() ? 1 : -1
			}
		}	
		var arr = array.sort(compareNumeric);
		if (this.flag == 0) {
			var sortArray = arr;
			this.flag = 1;
		} else {
			var sortArray = arr.reverse();
			this.flag = 0;
		} 
		var j = [];
		sortArray.forEach (function (obj) { j.push(obj[1]) });
		this.newDate(j);
	}
} 

Table.prototype.createChek = function (td, val, checkbox) {
	var box = document.createElement('input');
	td.appendChild(box);
	box.type = 'checkbox';
	box.name = 'box';	
	checkbox == true ? box.checked = true : null;
	val ? box.value = val : null;		
	return box		
}

Table.prototype.allBox = function (bool, event) {
	if (event.type == 'keydown') { 
		event.preventDefault();
		var checkbox = this.tHead.getElementsByTagName('input')[0];
		checkbox.checked = true;
	}
	var tBody = this.tBody.getElementsByTagName('input');
	for ( var i = tBody.length; i--; ) {
		tBody[i].checked = bool	
	}
}

Table.prototype.onOffHeadBox = function () {
	var headBox = this.tHead.getElementsByTagName('input')[0];
	var data = this.data;
	for (i = 0; i < data.length; i++) {
		var obj = data[i];
		if (obj.checkbox == true) {
			headBox.checked = true;
		} else {
			headBox.checked = false;
			break
		}
	}
}

Table.prototype.delSelected = function (event) {
	event ? event.preventDefault() : null;
	var tBody = this.tBody;
	var arrayBox = tBody.getElementsByTagName('input');
	var count = arrayBox.length;
	for (i = count; i--;) {	
		if (arrayBox[i].checked == true) {
			var valBox = arrayBox[i].value;
			this.store.remove(valBox);
		}
	}
	this.newDate(this.data);
}

Table.prototype.search = function (event) {
	var input = this.form.input;
	event ? event.preventDefault() : null;
	var arraySearch = this.store.search(input.value);
	this.newDate(arraySearch);	
}

Table.prototype.addList = function (event) {
		var input = this.form.input;
		event ? event.preventDefault() : null;
        if (input.value == '') {
            alert('Поле не заполнено!');
        } else {
			var obj = {name: input.value};
			this.store.put(obj);
			this.newDate(this.data);
        }
        value = '';
        return false
    }

Table.prototype.removeAll = function (event) {
	event ? event.preventDefault() : null;
	this.store.removeAll();
}


Table.prototype._tableButton = function () {
	var self = this;
	var form = self.form;
	console.dir(form);
    form.butSearch.onclick = function () { self.search() }
    form.butSearch.title = 'Ctrl+1';
	form.butAdd.onclick = function () { self.addList() }
    form.butAdd.title = 'Ctrl+2';
	form.butRemove.onclick = function () { self.delSelected() }
    form.butRemove.title = 'Del';
    form.butRemoveAll.onclick = function () { self.removeAll() }
    form.butRemoveAll.title = 'Ctrl+3';	
}

Table.prototype._tableKeydown = function () {
	var self = this;
	self.userDiv.tabIndex = 1;
	self.userDiv.onkeydown = function (event) {
		var bodyDiv = self.bodyDiv;
		var el = bodyDiv.getElementsByClassName('click')[0];
		var code = event.keyCode;
		var cKey = event.ctrlKey;
		code == 40 ? el ? key( el.nextSibling ) : null : null;	// down
		code == 38 ? el ? key( el.previousSibling ) : null : null;	// up
		code == 13 ? el ? self._clickTr(el, event): null : null;	// Enter
		code == 46 ? self.delSelected(event) : null;	// del
		cKey && code == 49 ? self.search(event) : null;	// ctrl + 1
		cKey && code == 50 ? self.addList(event) : null;	// ctrl + 2
		cKey && code == 51 ? self.removeAll(event) : null;	// ctrl + 3
		cKey && code == 65 ? self.allBox(true, event) : null;	// ctrl + A
		
		function key(nextOrPrevious) {
		event.preventDefault();
		var bound = bodyDiv.getBoundingClientRect();
			if ( nextOrPrevious !== null ) {
				el.className = '';
				el = nextOrPrevious;
				var elHeight = el.clientHeight;
				el.className = 'click';
				var boundElem = el.getBoundingClientRect();
				if (event.keyCode == 40) {
					boundElem.bottom > bound.bottom ? bodyDiv.scrollTop += elHeight : null;
				} else if (event.keyCode == 38) {
					boundElem.top < bound.top ? bodyDiv.scrollTop -= elHeight : null;
				}
			}
		}
	}
}


Table.prototype.scrolling = function () {
	var self = this;
	self.userDiv.tabIndex = 1;
	var bodyDiv = self.bodyDiv;
	bodyDiv.onscroll = function () {
		var scrollTop = bodyDiv.scrollTop;
		var hDiv = bodyDiv.offsetHeight;
		var hScroll = bodyDiv.scrollHeight;
		var h = hScroll - hDiv;
		scrollTop > 0 && scrollTop > h ? self.createTbody() : null;
	}
}


