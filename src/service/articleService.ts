import { prismaClient } from "../lib/database";


export class ArticleService {

    async getAllArticles() {
        try {
            const articles = await prismaClient.article.findMany({
                include: {
                    article_tags: {
                        include: {
                            tag: true,
                        }
                    }
                }
            });
            return articles;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async createArticle(title: string, content: string, tagIds?: number[]) {
        try {
            const newArticle = await prismaClient.article.create({
                data: {
                    title,
                    content,
                    article_tags: tagIds && tagIds.length > 0 ? {
                        create: tagIds.map(tagId => ({
                            tag_id: tagId,
                        })),
                    } : undefined,
                },
                include: {
                    article_tags: {
                        include: {
                            tag: true,
                        }
                    }
                }
            });
            return newArticle;
        } catch (error: any) {
            if (error.message) {
                console.log('error message -->', error.message);
                throw new Error(error.message);
            }
            throw new Error('Internal Server Error');
        }
    }

    async getArticleById(id: number) {
        try {
            const article = await prismaClient.article.findUnique({
                where: { id },
                include: {
                    article_tags: {
                        include: {
                            tag: true,
                        }
                    }
                }
            });
            return article;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
    
    async updateArticle(id: number, title: string, content: string, tagIds?: number[]) {
        try {
            await prismaClient.articleTag.deleteMany({
                where: { article_id: id },
            });

            const updateArticle = await prismaClient.article.update({
                where: { id },
                data: {
                    title,
                    content,
                    article_tags: tagIds && tagIds.length > 0 ? {
                        create: tagIds.map(tagId => ({
                            tag_id: tagId,
                        })),
                    } : undefined,
                },
                include: {
                    article_tags: {
                        include: {
                            tag: true,
                        }
                    }
                }
            });
            return updateArticle;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async deleteArticle(id: number) {
        try { 
            await prismaClient.article.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async addTagsToArticle(articleId: number, tagIds: number[]) {
        try {
            await prismaClient.articleTag.createMany({
                data: tagIds.map(tagId => ({
                    article_id: articleId,
                    tag_id: tagId,
                })),
                skipDuplicates: true
            });

            return await prismaClient.article.findUnique({
                where: { id: articleId },
                include: {
                    article_tags: {
                        include: {
                            tag: true
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async removeTagsFromArticle(articleId: number, tagIds: number[]) {
        try {
            await prismaClient.articleTag.deleteMany({
                where: {
                    article_id: articleId,
                    tag_id: {
                        in: tagIds
                    }
                }
            })

            return await prismaClient.article.findUnique({
                where: { id: articleId },
                include: {
                    article_tags: {
                        include: {
                            tag: true
                        }
                    }
                }
            })
        } catch (error: any) {
            throw new Error(error.message || 'Internal service error')
        }
    }
}