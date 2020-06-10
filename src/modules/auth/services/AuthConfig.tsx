const Config={
    servicekey: "aperture"
}

export default Config;
export function MergeValid(source) {
    Object.keys(Config).forEach((key)=>{
        if(source[key]) {
            Config[key] = source[key];
        }
    })
}