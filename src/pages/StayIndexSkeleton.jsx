import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function StaysIndexSkeleton({ count }) {

    return (
        <>
            <div className="skeleton-list">
                {Array(count).fill(0).map((card, idx) =>
                    <div className="skeleton-card" key={idx}>
                        <div className="slides">
                            <div className="slide">
                                <Skeleton className="img" />
                            </div>
                        </div>

                        <div className="stay-info">
                            <p className="location"><Skeleton width={150} height={20}/></p>
                            <p className="distance"><Skeleton width={100} height={20}/></p>
                            <p className="dates"><Skeleton width={70} height={20}/></p>
                            <p className="price"><Skeleton width={70} height={20}/></p>

                            <div className="rate">
                                <p><Skeleton width={40} height={20} /></p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </>
    );
}
