import { Router } from 'express';
import { ArticleController } from '../controller/articleController';
import { ArticleService } from '../service/articleService';
import { TagService } from '../service/tagService';
import { TagController } from '../controller/tagController';

const router = Router();

const articleService = new ArticleService();
const articleController = new ArticleController(articleService);

const tagService = new TagService();
const tagController = new TagController(tagService);

router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createTag);
router.get('/tags/:id', tagController.getTagById);
router.put('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

router.get('/articles', articleController.getAllArticles);
router.post('/articles', articleController.createArticle);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);
router.put('/articles/:id/tags', articleController.addTagsToArticle);
router.delete('/articles/:id/tags', articleController.removeTagsFromArticle);
router.get('/tags/:tagId/articles', articleController.getArticlesByTagId);

export default router;