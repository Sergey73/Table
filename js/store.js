function Store (options) {
	this._funcDefaultOptions(options);
	this._dataFunc(this.jsonData);
	return this
}

Store.prototype.defaultOptions = {
	jsonData: [],
	data: [],
	key: 'listTestKey'
}

Store.prototype._funcDefaultOptions = function (options) {
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

Store.prototype._dataFunc = function (jsonData) {
	var self = this;
	if (window.localStorage[self.key]) {
		self.add();
	} else {
		jsonData.forEach( function (obj) { self.put(obj) });
	}	
}

Store.prototype.search = function (str) {
	var array = this.data;
	 array = array.filter(function (obj) {
			var valName = obj['name'];
			var reg = new RegExp(str, "i");
			var valReg = valName.match(reg);
			return str == '' ? obj : valReg 
		});
		return array
}

Store.prototype.remove = function (valId) {
	var array = this.data;
	var count = 0;
	for (var key in array) {
		array[key].id == valId ? array.splice(count,1) : null;
		count++
	}
	localStorage[this.key] = JSON.stringify(array);    
}

Store.prototype.add = function () {
	var datajson = localStorage[this.key];
	this.data = JSON.parse(datajson);	
}

Store.prototype.removeAll = function () {
		localStorage.removeItem(this.key);
		location.reload();
}

Store.prototype.put = function (obj) {
	var array = this.data;
	obj.id = this._id();
	obj.checkbox = 'false';
	this.data.push(obj);
	localStorage[this.key] = JSON.stringify(array);	
}

Store.prototype._id = function() {
	var afterId = 0;
	var id = "id";
	var arrayStore = this.data;
	arrayStore.forEach(function (obj){
		obj[id] > afterId ? afterId = obj[id] : null;
	});
	return afterId + 1;
}

