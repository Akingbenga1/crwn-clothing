
import './directory-item.style.scss'

const DirectoryItem = ({category}) =>
{
    return (
        <div key={category.id} className="directory-item-container">
            <div  style={{backgroundImage: `url(${category.imageUrl})`}} className='background-image' />

            <div className='body'>
                <h2> {category.title} </h2>
                <p> Shop Now </p>
            </div>
        </div>
    )
}


export default DirectoryItem;