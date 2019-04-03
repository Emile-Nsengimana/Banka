const btnCreateAcct = document.getElementById('btn-create-account');
const btnSaveAcct = document.getElementById('btn-add-acct');
const btnCloseCreateAcct = document.getElementById('close');

btnCreateAcct.addEventListener('click', () => {
    document.getElementById('modal-account').style.display = 'block';
    document.getElementById('all').style.opacity = 0.3;
});
let i = 2;
btnSaveAcct.addEventListener('click', () => {
    i = i+1;
    document.getElementById('acctInfo').innerHTML  += `
    <h3>Account ${i}</h3>
                <div class="form-group">
                    <label for="">Account type:</label>
                    <input class="inp2" type="text" value=${document.getElementById('slct-acct-type').value}>
                </div>
                <div class="form-group">
                <label for="">Account No.:</label>
                <input class="inp2" type="text" value="123-456-878-345">
        </div>
        <div  class="form-group">
            <label for="">Account balance:</label>
            <input class="inp2" type="text" value="1 000 000">
        </div>
    `;
});
btnCloseCreateAcct.addEventListener('click', () => {
    document.getElementById('modal-account').style.display = 'none';
    document.getElementById('all').style.opacity = 1;
});
// ========================================== CLIENT LOG-OUT ============================================
const btnClientLogout = document.getElementById('btn-client-logout');
btnClientLogout.addEventListener('click', () => {
    location.href = 'index.html';
});