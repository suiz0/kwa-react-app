class AppProfile {
    isAuthenticated =  false;
    lang = 'en';
    langs: any[] = [];
    static Resources = {};
    client: string = "";
    isLoading: boolean = false;
    rows: any[] = [];
    headers: any[] = [];
  }

export default AppProfile;