import { useFetchPosts } from "../../infrastructure/APIHandler";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getThumbUri } from "../../application/common";
import PageWrapper from "../components/PageWrapper";
import { useParams } from "react-router-dom";

export const posts = ({
    title,
    keywords,
    description,
    categoryId,
    categorySlug,
}) => {
    const { tag } = useParams();
    const { data, loading } = useFetchPosts({
        categoryId: categoryId,
        tag: tag,
    });

    const posts = data;
    const { t, i18n } = useTranslation();
    return (
        <PageWrapper
            description={description}
            keywords={keywords}
            title={title}
            header={title ? title : tag}
            loading={loading}
        >
            <article className="w3-container w3-margin-bottom">
                {posts[0] &&
                    posts.map((post) => (
                        <section key={post.id}>
                            <div className="w3-card-4 w3-animate-left w3-margin-bottom">
                                <header className="w3-row w3-light-grey w3-padding w3-animate-opacity">
                                    {post.image && (
                                        <div className="posts__thumbnail w3-col s3 w3-mobile">
                                            <img
                                                src={getThumbUri(
                                                    "150x150",
                                                    post.image
                                                )}
                                                alt={post.slug}
                                                className="w3-round-large"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className="w3-col s8 w3-mobile">
                                        <h2>{post.title[i18n.language]}</h2>
                                        <hr />
                                        <p>
                                            {t("last update")}
                                            <time
                                                className="w3-margin"
                                                dateTime={post.updated_at}
                                            >
                                                {new Date(
                                                    post.updated_at
                                                ).toLocaleDateString(
                                                    i18n.language.replace(
                                                        "_",
                                                        "-"
                                                    )
                                                )}
                                            </time>
                                        </p>
                                    </div>
                                </header>
                                <div className="w3-container w3-padding">
                                    <p
                                        className="posts__text w3-margin"
                                        dangerouslySetInnerHTML={{
                                            __html: post.content[i18n.language],
                                        }}
                                    ></p>
                                </div>
                                <Link
                                    to={`/${post.category.slug}/${post.slug}`}
                                    className="w3-bar w3-button w3-teal"
                                >
                                    {t("more")}
                                </Link>
                            </div>
                        </section>
                    ))}
            </article>
        </PageWrapper>
    );
};

export default posts;
