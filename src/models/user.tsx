class User {
    public Name: string;
    public Password:string;
    public IsAdmin: boolean;

    constructor(_name:string, _isadmin?: boolean)
    {
        this.Name= _name;
        this.Password="";
        this.IsAdmin = _isadmin !== undefined ? _isadmin : false;
    }

    static NewAdmin():User
    {
        return new User('sm', true);
    }
}

export default User;