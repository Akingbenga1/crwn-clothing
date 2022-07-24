
import './category-item.style.scss'

const CategoryItem= ({category}) =>
{
    return (
        <div key={category.id} className="category-container">
            <div  style={{backgroundImage: `url(${category.imageUrl})`}} className='background-image' />

            <div className='category-body-container'>
                <h2> {category.title} </h2>
                <p> Shop Now </p>
            </div>
        </div>
    )
}

export default CategoryItem;