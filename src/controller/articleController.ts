import { Request, Response } from "express";
import { ArticleService } from "../service/articleService";

export class ArticleController {
    constructor(private articleService: ArticleService) { }

    getAllArticles = async (_: Request, res: Response) => {
        try {
            const articles = await this.articleService.getAllArticles();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' }); 
        }
    }

    createArticle = async (req: Request, res: Response) => {
        try {
            const { title, content, tagIds } = req.body;

            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content are required' });
            }

            const newArticle = await this.articleService.createArticle(title, content, tagIds);
            console.log('passei pelo controller -->', newArticle);
            res.status(201).json(newArticle);
        } catch (error: any) {
            console.error('error -->', error);
            res.status(500).json({ message: 'Internal Server Error', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
        }
    }

    getArticleById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const article = await this.articleService.getArticleById(Number(id));
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    updateArticle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, content, tagIds } = req.body;
            const updatedArticle = await this.articleService.updateArticle(Number(id), title, content, tagIds);
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deleteArticle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.articleService.deleteArticle(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}