import axios from "axios"


const api_url = "http://localhost:4000/";



const getAllProducts = async () => {
    const res = await axios.get(api_url);

    console.log(res);

    return res.categories.name.all;
}

const getAllClothes = async () => {
    const res = await axios.get(api_url);

    console.log(res);

    return res.categories.name.clothes;
}

const getAllTech = async () => {
    const res = await axios.get(api_url);

    console.log(res);

    return res.categories.name.tech;
}

const productService = {
    getAllProducts,
    getAllClothes,
    getAllTech
}

export default productService 