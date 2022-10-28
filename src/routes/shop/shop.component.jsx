import  './shop.styles.scss'
import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/categories/category.action";
import {useEffect} from "react";


const Shop = () => {

    const dispatch = useDispatch();
    useEffect(() =>
    {
        const getCategoriesMap =  async() =>
        {
            const categoryArray = await getCategoriesAndDocuments('categories');
            // console.log("categoryArray  ==>", categoryArray);
           dispatch(setCategories(categoryArray));
        }

        getCategoriesMap();

    }, []);

    return (
                <Routes>
                        <Route index element={<CategoriesPreview />} />
                        <Route path=":category" element={<Category />} />
                </Routes>
           );
}

export default Shop;