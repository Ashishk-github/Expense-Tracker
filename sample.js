if(localStorage===null){
    var z=0;
}else{
    var z=0;
    for(x of Object.keys(localStorage)){
        if(z<parseInt(x)){
            z=parseInt(x);
        }
    }
}

function saveToLocalStorage(event) {
    event.preventDefault();
    const amt = event.target.amt.value;
    const des = event.target.des.value;
    const cat = event.target.cat.value;
    const obj = {amt,des,cat,z}
    z++
    localStorage.setItem(obj.z, JSON.stringify(obj))
    showExpenseList(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    z++;
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const expenseList = localStorageObj[key];
        const expenseListObj = JSON.parse(expenseList);
        showExpenseList(expenseListObj)
    }
})

function showExpenseList(expense){
    document.getElementById('des').value = '';
    document.getElementById('amt').value = '';
    document.getElementById('cat').value ='';
    if(localStorage.getItem(expense.z) !== null){
        removeExpense(expense.z)
    }

    const parentNode = document.getElementById('expenseList1');
    const childHTML = `<li id=${expense.z}> ${expense.amt} - ${expense.des} -${expense.cat}
                            <button onclick=deleteExpense('${expense.z}')> Delete User </button>
                            <button onclick=editExpense('${expense.des}','${expense.amt}','${expense.cat}',${expense.z})>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function editExpense(des, amt, cat,z){

    document.getElementById('des').value = des;
    document.getElementById('amt').value = amt;
    document.getElementById('cat').value =cat;


    deleteExp(z)
 }


function deleteExpense(z){
    console.log(z)
    localStorage.removeItem(z);
    removeExpense(z);

}

function removeExpense(z){
    const parentNode = document.getElementById('expenseList1');
    const childNodeToBeDeleted = document.getElementById(z);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}



