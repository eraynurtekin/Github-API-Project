// Elementleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched)

    //Sayfa yenilendiğinde kayıtları getirir.
    document.addEventListener("DOMContentLoaded",getAllSearch);
}

function getData(e){

    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı...");
            }
            else{
                 ui.addSearchedUserToUI(username);
                 Storage.addSearchedUserToStorage(username);
                 ui.showUserInfo(response.user);
                 ui.showRepoInfo(response.repo);
            }
            
            })
        .catch(err => ui.showError(err));
    }

     ui.clearInput(); //Inputumuzu temizledik.
    e.preventDefault();
}

function clearAllSearched(e){
    //Tüm arananları temizle
    if(confirm("Emin Misiniz ?"))
    //Silme
    Storage.clearAllSearchedUsersFromStorage(); //Storagedan Temizleme
    ui.clearAllSearchedFromUI();
}

function getAllSearch(){
    //Arananları storagetan al UI'ye ekle

    let users = Storage.getSearchedUsersFromStorage();


    let result = "";
    users.forEach(user => {
        
        result += `<li class="list-group-item">${user}</li>`


    });

    lastUsers.innerHTML = result;

}