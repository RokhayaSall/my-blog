import ArticleList from "../../components/article_list/ArticleList";
import './HomePage.css';
const HomePage = () => {
    return (
        <main>
            <section className="home-intro" style={{ textAlign: 'center', margin: '30px 0' }}>
                <h1>Bienvenue sur Mon Blog</h1>
                <p>Découvrez nos derniers articles sur la nature et les oiseaux.</p>
            </section>
            <ArticleList />
        </main>
    );
};

export default HomePage;