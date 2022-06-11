function saveTocrudcrud(event) {
    event.preventDefault();
    const amt = event.target.amt.value;
    const des = event.target.des.value;
    const cat = event.target.cat.value;
    const obj = {amt,des,cat}
    axios.post('https://crudcrud.com/api/4969ccf98cf84542bdb0f8dc292b78ca/Expenses',obj)
    .then((res)=>showExpenseList(res.data))
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/4969ccf98cf84542bdb0f8dc292b78ca/Expenses')
    .then((res)=>{
    for(var i =0; i< res.data.length; i++){
        showExpenseList(res.data[i])
    }
})})

function showExpenseList(expense){
    document.getElementById('des').value = '';
    document.getElementById('amt').value = '';
    document.getElementById('cat').value ='Miscellaneous';

    const parentNode = document.getElementById('expenseList1');
    const childHTML = `<li id=${expense._id}> ${expense.amt} - ${expense.des} -${expense.cat}
                            <button onclick=deleteExp('${expense._id}')><img src="del.png" width=15 depth=15></button>
                            <button onclick=editExpense('${expense.des}','${expense.amt}','${expense.cat}','${expense._id}')><img src="edit.png" width=15 depth=15></button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function editExpense(des, amt, cat,z){

    document.getElementById('des').value = des;
    document.getElementById('amt').value = amt;
    document.getElementById('cat').value =cat;
    deleteExp(z)
 }


function deleteExp(z){
    url='https://crudcrud.com/api/4969ccf98cf84542bdb0f8dc292b78ca/Expenses/'+z
    axios.delete(url);
    removeExpense(z);

}

function removeExpense(z){
    const parentNode = document.getElementById('expenseList1');
    const childNodeToBeDeleted = document.getElementById(z);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}



