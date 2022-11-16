import  './shop.styles.scss'
import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useDispatch} from "react-redux";
import { fetchCategoriesStart} from "../../store/categories/category.action";
import {useEffect} from "react";
import {categoriesSaga, fetchCategoriesAsync, onFetchCategories} from "../../store/categories/category.saga";

const Shop = () => {

    const dispatch = useDispatch();
    useEffect( () =>
    {
        dispatch(fetchCategoriesStart());
    }, []);

    return (
                <Routes>
                        <Route index element={<CategoriesPreview />} />
                        <Route path=":category" element={<Category />} />
                </Routes>
           );
}

export default Shop;