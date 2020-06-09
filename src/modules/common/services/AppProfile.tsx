class AppProfile {
    isAuthenticated: boolean =  false;
    lang: string = 'en';
    langs: any[] = [];
    static Resources = {};
    client: string = "";
    isLoading: boolean = false;
  }

export default AppProfile;