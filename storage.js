class Storage {

    static getSearchedUsersFromStorage(){
        //Tüm kullanıcıları al

        let users;

        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"))

        }
        return users;

    }

    static addSearchedUserToStorage(username){
        let users = this.getSearchedUsersFromStorage(); //this i Storage class yerine kullandık

        //IndexOf --> var mı yok mu diye sorgulamak için -1 se yoktur.

        if(users.indexOf(username) === -1){
            users.push(username);
        }

        localStorage.setItem("searched",JSON.stringify(users));

    }

    static clearAllSearchedUsersFromStorage(){
        //Tüm kullanıcıları sil

        localStorage.removeItem("searched");

    }

}