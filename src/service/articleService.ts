import { prismaClient } from "../lib/database";


export class ArticleService {

    async getAllArticles() {
        try {
            const articles = await prismaClient.article.findMany();
            return articles;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async createArticle(title: string, content: string) {
        try {
            const newArticle = await prismaClient.article.create({
                data: {
                    title,
                    content,
                },
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
            });
            return article;
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
    
    async updateArticle(id: number, title: string, content: string) {
        try {
            const updateArticle = await prismaClient.article.update({
                where: { id },
                data: {
                    title,
                    content,
                },
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
}