import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export function StayDetailsSkeleton() {

    return (
        <>
            <div className="skeleton-stay-header">
                <h1><Skeleton height={30} width={600} /></h1>
            </div>

            <div className="skeleton-stay-img-gallery">
                {Array(6).fill(0).map((img, idx) => {
                    if (idx <= 5) {
                        return (
                            <Skeleton key={idx} width={idx === 0 ? 620 : 310} height={idx === 0 ? 550 : 270} />
                        )
                    }
                    return null
                })}
            </div>

            <div className="skeleton-main-desc">
                <div className="skeleton-stay-desc">
                    <div className="skeleton-with-sticky-order">
                        <div>
                            <div>
                                <h2><Skeleton height={20} width={400} /></h2>
                                <p><Skeleton height={20} width={300} /></p>
                            </div>
                        </div>
                        <div className="skeleton-order-stay">
                            <h2><Skeleton height={20} width={200} /></h2>
                            <p><Skeleton height={50} width={350} /></p>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
