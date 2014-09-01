function Table (options) {
	var defaultOptions = this.defaultOptions;
	for (var option in defaultOptions) {
		if (options && options[option] !==undefined) {	
				this[option] = options[option];					
		} else {												
			this[option] = defaultOptions[option]				
		}
	}
	
	this.flag = 0;
	this._createTable();
	this._createThead();
	this.createTbody();
	
	var str = navigator.userAgent.toLowerCase();
    var valReg = /firefox/.exec(str)
    if (valReg !== null) {
		this.tHead.childNodes[0].childNodes[1].className = 'mozTheadSecondTd';
		this.tBody.className = 'mozTbody'
	} else {
		this.tHead.childNodes[0].childNodes[1].className = 'theadSecondTd';
	}
	return this
}

Table.prototype.defaultOptions = {
	data: [],
	container: "list",
	columns: {
		checkbox: {},
		id: {label: 'Код'},
		name: {label: 'Наименование документа'}
	}
};

Table.prototype._createTable = function () {			
	var container = document.getElementById(this.container);
	container.innerHTML = '';
	this.tab = document.createElement('table');
	this.tHead = document.createElement('thead');
	this.tBody = document.createElement('tbody');
	var tab = this.tab;
	var tHead = this.tHead;
	var tBody = this.tBody;
	container.appendChild(tab);
	tab.appendChild(tHead);
	tab.appendChild(tBody);
	tab.className = 'myTable';
}

Table.prototype._createThead = function () {
	var self = this;
	var columns = this.columns;		
	var tHead = this.tHead;	
	var trHead = tHead.insertRow(0);	
	for (var key in columns) {
		var valCol = columns[key];				
		var tdHead = trHead.insertCell(-1);
			tdHead.onclick = function () { self._clickSort(this) };
		if (key == 'checkbox') {
			var input = this.createChek(tdHead);
			input.id = 'headBox';
			input.onclick = function () { self.allBox(input.checked, this) }
		} else {
			var label = valCol.label !== undefined ? valCol['label'] : key;
			this._createText(tdHead, label);
		}
	}
	trHead.childNodes[0].className = 'firstTd';
	trHead.childNodes[1].className = 'secondTd';
	trHead.childNodes[2].className = 'firdTd'; 
}

Table.prototype.createTbody = function () {
	var self = this;
	var tBody = this.tBody;
  	var data = this.data;
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
		trBody.childNodes[0].className = 'firstTd';
		trBody.childNodes[1].className = 'secondTd';
		trBody.childNodes[2].className = 'firdTd'; 
	});
}

Table.prototype.newDate = function (data) {
	var tBody = this.tBody;
	tBody.innerHTML = '';
	this.data = data;
	this.createTbody();
}

Table.prototype._clickTr = function (tr, event) {
	var tBody = this.tBody;
	for ( key in tBody.childNodes ) {
		var elem = tBody.childNodes[key];
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
		obj.id == checkbox.value ? this.data[i].checkbox = checkbox.checked : null;
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
	for (i = 0; i < this.data.length; i++) {
		this.data[i].checkbox = bool
	}
	this.newDate(this.data);
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

