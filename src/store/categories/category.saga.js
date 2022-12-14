import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from "./category.action";
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {takeLatest, all, call, put} from 'redux-saga/effects';


export function* categoriesSaga(){
    yield all([onFetchCategories]);
}

export function* fetchCategoriesAsync() {
    try
    {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error)
    {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories()
{

    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync );
}