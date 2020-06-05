class AppProfile {
    isAuthenticated= false;
    lang= 'en';
    services= [
      { 
        "key": "aperture",
        "url": 'http://localhost:300/api/aperture'
      }
    ];
  
    static Resources={}
  }

  export default AppProfile;