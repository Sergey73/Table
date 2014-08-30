/*
function F () {};
F.prototype = Store.prototype;
Table.prototype = new F();
*/
var check = new Checkbox();
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
		//	var input = this.createChek(tdHead);
			var input = check.createChek(tdHead);
			input.id = 'headBox';
			//input.onclick = function () { self.allBox() }
			input.onclick = function () { check.allBox() }
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
	//tBody.innerHTML = '';
  	var data = this.data;
	console.dir(data)
	var columns = this.columns;
	data.forEach(function (obj) {
		var trBody = tBody.insertRow(-1);
		trBody.onclick = function (event) { self._clickTr(trBody, event) }
		for (var key in columns) {
			var tdBody = trBody.insertCell(-1);
			if (key == 'checkbox'){
				//self.createChek(tdBody, obj['id']);
				check.createChek(tdBody, obj['id']);
			} else {
				self._createText(tdBody, obj[key]);
			} 
		}
		trBody.childNodes[0].className = 'firstTd';
		trBody.childNodes[1].className = 'secondTd';
		trBody.childNodes[2].className = 'firdTd'; 
	});
}

Table.prototype.newDate = function (ndata) {
	var tBody = this.tBody;
	tBody.innerHTML = '';
	this.data = ndata
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
	if ( event.type == 'keydown' || event.target.type !== 'checkbox') { 
		event.preventDefault();
		checkbox.checked == false ? checkbox.checked = true : checkbox.checked = false;
	}
}

Table.prototype._createText = function (teg, val) {
	var text = document.createTextNode(val);
	teg.appendChild(text);
}

/*
Table.prototype.addRow = function (tr,) {
// добавить в начало или конец
* }
Table.prototype.dellRow = function () {
// удалить из начала или конца 
}
* 

Table.prototype.sort = function () {
// показывать только те данные, которые удовлетворяют условиям
}
*/

Table.prototype._clickSort = function (tdHead) {
	var tBody = this.tBody;
	var sortCell = tdHead.cellIndex;		
	var array = [];
	var rows = tBody.rows;
	var element = tdHead.childNodes[0].type;
	if (element !== 'checkbox') { 	
		for (i=0; i < rows.length; i++) {
			var sortTd =rows[i].cells[sortCell];
			var str = sortTd.innerHTML;
			var ar = [str, rows[i]];
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
		for (i = 0; i < rows.length; i++) {
			tBody.appendChild(sortArray[i][1]);
		} 
	}	
} 
