import styles from './filter.module.css';

export const Filter = ({ categories, onCategorySelect, selectedCategories }) => {
    if (categories.length === 0 ) {
        return <div>Aucune catégorie disponible</div>;
    }

    return (
        <section className={styles['filter-container']}>
            <button
                className={selectedCategories.length === 0 ? styles['filter-button-active'] : styles['filter-button']}
                onClick={() => onCategorySelect(null)}
            >
                Toutes
            </button>
            {categories.map((category, index) => (
                <button
                    className={selectedCategories.includes(category) ? styles['filter-button-active'] : styles['filter-button']}
                    key={index}
                    onClick={() => onCategorySelect(category)}
                >
                    {category}
                </button>
            ))}
            <button
                className={selectedCategories.includes('none') ? styles['filter-button-active'] : styles['filter-button']}
                onClick={() => onCategorySelect('none')}
            >
                sombre
            </button>
        </section>
    );
};
