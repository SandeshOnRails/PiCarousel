module.exports =   function (searchKey, tag) {

  let count = 0

     for(let i =0; i < tag.length; i++) {

           if(searchKey[i]) {
                
                if(tag[i]===searchKey[i]) count++
           }
     }

     if (searchKey.length > tag.length) return (count/searchKey.length * 100)
      else  return (count/tag.length * 100)
     
   }

