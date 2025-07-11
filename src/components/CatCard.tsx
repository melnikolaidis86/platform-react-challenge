import { Link } from "react-router-dom";
import { CatImage } from "../features/cats";

export function CatCard({cat}: { cat: CatImage }) {
    return (
        <div className="group cursor-pointer relative rounded-lg overflow-hidden">
            <Link to={`/cats/${cat.id}`}>
                <img
                    className="object-cover object-top w-full h-96 max-w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    src={cat.url}
                    alt="cute cat"/>
            </Link>
        </div>
    )
}