function Store (options) {
	var defaultOptions = this.defaultOptions;
	for (var option in defaultOptions) {
		if (options && options[option]!==undefined) {			
			this[option] = options[option];						
		} else {												
			this[option] = defaultOptions[option];				
		}
	}
}

Store.prototype.defaultOptions = {
	data: [],
	key: 'my_table'
};

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
