import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, rateCount, link }) => {
    const stars = [];

    for (let i = 1; i <= 5; ++i) {
        if (rating >= i) {
            stars.push(<FaStar style={{color : '#DE7921'}} key={i} className="text-yellow-400" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt style={{color : '#DE7921'}} key={i} className="text-yellow-400" />);
        } else {
            stars.push(<FaRegStar style={{color : '#DE7921'}} key={i} className="text-yellow-400" />);
        }
    }

    return (
        link == null ? (<div className="flex gap-1 text-primary">{stars}{rateCount}
        </div>) : (<a href={link} className="flex gap-1 text-primary hover:">{stars}{rateCount}
        </a>));
};

export default StarRating;