
        fetch( 'http://localhost:8000/api/products' )
        .then(response => response.json())
        .then(data =>console.log(data))