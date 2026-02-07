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

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Lista todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
router.get('/tags', tagController.getAllTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da tag
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *       400:
 *         description: Nome é obrigatório
 */
router.post('/tags', tagController.createTag);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Busca uma tag por ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Tag encontrada
 *       404:
 *         description: Tag não encontrada
 */
router.get('/tags/:id', tagController.getTagById);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Atualiza uma tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 */
router.put('/tags/:id', tagController.updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Deleta uma tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag deletada com sucesso
 */
router.delete('/tags/:id', tagController.deleteTag);

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Lista todos os artigos
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Lista de artigos retornada com sucesso
 */
router.get('/articles', articleController.getAllArticles);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Cria um novo artigo
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Artigo criado com sucesso
 *       400:
 *         description: Título e conteúdo são obrigatórios
 */
router.post('/articles', articleController.createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Busca um artigo por ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artigo encontrado
 *       404:
 *         description: Artigo não encontrado
 */
router.get('/articles/:id', articleController.getArticleById);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Atualiza um artigo
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Artigo atualizado com sucesso
 */
router.put('/articles/:id', articleController.updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Deleta um artigo
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Artigo deletado com sucesso
 */
router.delete('/articles/:id', articleController.deleteArticle);

/**
 * @swagger
 * /articles/{id}/tags:
 *   put:
 *     summary: Adiciona tags a um artigo
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagIds
 *             properties:
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array de IDs das tags
 *     responses:
 *       200:
 *         description: Tags adicionadas com sucesso
 */
router.put('/articles/:id/tags', articleController.addTagsToArticle);

/**
 * @swagger
 * /articles/{id}/tags:
 *   delete:
 *     summary: Remove tags de um artigo
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagIds
 *             properties:
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Tags removidas com sucesso
 */
router.delete('/articles/:id/tags', articleController.removeTagsFromArticle);

/**
 * @swagger
 * /tags/{tagId}/articles:
 *   get:
 *     summary: Busca artigos por ID da tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Lista de artigos com a tag especificada
 */
router.get('/tags/:tagId/articles', articleController.getArticlesByTagId);

export default router;