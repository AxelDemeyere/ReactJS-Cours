import {Filter} from "../../components/filters/Filter.jsx";
import {Card} from "../../components/card/Card.jsx";
import {IMAGES} from "../../data/data.js";
import {useEffect, useState} from "react";

export const Home = () => {

    const [images, setImages] = useState(IMAGES); // Remplacer 'IMAGES' par 'undefined' pour simuler une erreur de chargement
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const allCategories = IMAGES.flatMap(image => image.categories);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);

        setTimeout(() => setLoading(false), 2000);
    }, []);

    const handleCategorySelect = (category) => {
        if (category === null) {
            setSelectedCategories([]);

            return;
        }

        // Gestion spéciale du bouton "Aucune photo"
        if (category === 'none') {
            setSelectedCategories(['none']);
            setImages([]);
            return;
        }

        let newSelected;
        if (selectedCategories.includes(category)) {
            // Si déjà sélectionnée, on la retire
            newSelected = selectedCategories.filter(c => c !== category);
        } else {
            // Sinon, on l'ajoute (et on retire 'none' si elle était sélectionnée)
            newSelected = [...selectedCategories.filter(c => c !== 'none'), category];
        }
        setSelectedCategories(newSelected);

        if (newSelected.length === 0) {
            setImages(IMAGES);
        } else {
            const filteredImages = IMAGES.filter(image =>
                image.categories.some(cat => newSelected.includes(cat))
            );
            setImages(filteredImages);
        }
    }
    return (

        <>
            <header>
                <h1>Galerie d'Images</h1>
                <Filter
                    categories={categories}
                    onCategorySelect={handleCategorySelect}
                    selectedCategories={selectedCategories}
                ></Filter>
            </header>

            <main>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    images === undefined ? (
                        <>
                            <div className="error">
                                <h1>Vide</h1>
                                <div>Erreur impossible de charger les images.</div>
                            </div>
                        </>
                    ) : (
                        <Card images={images}></Card>
                    )
                )}
            </main>
        </>
    )
}
