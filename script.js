let lib = [{title:'Age of Myth', author:'Michael J. Sullivan', read:true}]
console.log(lib);

lib.forEach(bock => {
    for (const key in bock) {
        console.log(key.valueOf());
        
    }
});