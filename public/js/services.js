function makeCategorieEditable(id, categorie){
	
	
	document.getElementById("categorie"+id).innerHTML = "<td><form id=\"editcategorie\" method=\"post\">"+
	"<input type=\"text\" name=\"fname\" value=\""+categorie+"\">"+
	"</form></td><td><a href=\"#\" onclick=\"saveCategorieEditable("+id+",'"+categorie+"');\" >submit</a> <a href=\"#\" onclick=\"cancelCategorieEditable("+id+",'"+categorie+"');\" >cancel</a></td>"; 
}
function cancelCategorieEditable(id, categorie){
	
	
	document.getElementById("categorie"+id).innerHTML = "<td ><a onclick=\"makeCategorieEditable("+id+",'"+categorie+"');\" href=\"#"+id+"\">"+categorie+"</a></td><td><a  href=\"#categorie\">delete<a/></td>";
}
function saveCategorieEditable(id, categorie){
	
	
	alert("will save soon");
}