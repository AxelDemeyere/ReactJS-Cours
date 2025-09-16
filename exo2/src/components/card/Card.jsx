import styles from './card.module.css'

export const Card = ({ images }) => {

    if (!images || images.length === 0) {
        return <div className={styles['no-images']}>Aucune image à afficher</div>;
    }

    return (
        <>
            <article className={styles['card-list']}>
                {
                    images.map((image) => (
                        <section className={styles['card-container']} key={image.id}>
                            <div className={styles['card-header']}>
                                <img src={image.url} alt={image.title}/>
                            </div>
                            <div className={styles['card-content']}>
                                <p className={styles['card-content-title']}>
                                    {image.title}
                                </p>
                                <span className={styles['card-content-author']}>
                                    Auteur: {image.author}
                                </span>
                                <div className={styles['card-content-categories-container']}>
                                    <span className={styles['card-content-categories']}>
                                        {image.categories.map((category, index) => (
                                            <span key={index} className={styles['card-content-category']}>
                                                {category}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </section>
                    ))
                }
            </article>
        </>
    )
}