const dataFetch = true;

function fetchData(dataFetch){

    const asyncOp = new Promise( (resolve , reject) => {
        setTimeout( () => {
            //busy pretend

            if(dataFetch == true){
                resolve('data fetched successfully');
            }
            else{
                reject('error!failed to fetch data');
            }

        } , 2000);

    })

    return asyncOp;
}

fetchData(dataFetch).then( (data) => {console.log(data)})
                    .catch( (err) => {console.log(err)});