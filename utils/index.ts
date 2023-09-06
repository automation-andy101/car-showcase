export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': 'f5d0571133msh671010ca4e019ffp1797fejsnd6c9cefc5acd',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
        headers: headers
    });

    const result = await response.json();

    return result;
}