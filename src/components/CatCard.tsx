import { CatImage } from "../features/cats/catsSlice";

export function CatCard({cat}: { cat: CatImage }) {
    return (
        <div className="group cursor-pointer relative rounded-lg overflow-hidden">
            <img className="object-cover object-center w-full h-72 max-w-full rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                 src={cat.url}
                 alt="cute cat"/>
        </div>
    )
}