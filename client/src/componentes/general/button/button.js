import { Link } from "react-router-dom"

export default function Button({text, link, type, onClick, className, disabled, style, id, image, imageWidth, imageHeight}){

    return (
        
            <button className={className} type={type} onClick={onClick} disabled={disabled} style={style} id={id}> 
                <Link to={link}>
                    {image && <img src={image} alt="" width={imageWidth} height={imageHeight} />
                    }
                    {text}</Link>
            </button>
        
    )
}