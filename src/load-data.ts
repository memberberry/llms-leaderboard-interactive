const API_URL = 'http://localhost';
const PORT = 8000
const ENDPOINT = 'llm_benchmarks/trustbit'
export async function loadDataFromAPI(){
    let response = await fetch(`${API_URL}:${PORT}/${ENDPOINT}`);
    return response;
}