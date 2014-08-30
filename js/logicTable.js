
// добавление ребенка в родителя
function appendIfNode(parent, subNode){
	if(subNode && subNode.nodeType){
		parent.appendChild(subNode);
	}
}
tr = put(tbody, "tr");
// put ????????
if(subRow.className){
	put(tr, "." + subRow.className);
}



-функция разбора 
		column: function(target){
			// summary:
			//		Get the column object by node, or event, or a columnId
			if(typeof target != "object"){
				return this.columns[target];
			}else{
				return this.cell(target).column;
			}
		},
		
- берем объект смотрим в нем каждый элемент. Если функция - то-то, а если
объект - то-то( значит здесь названия столбцов)
