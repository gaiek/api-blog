import { ArticleController } from "../../src/controller/articleController";

describe('ArticleController', () => {
    let articleController: ArticleController;
    
    beforeEach(() => {
        articleController = new ArticleController({
            getAllArticles: jest.fn(),
            createArticle: jest.fn(),
            getArticleById: jest.fn(),
            updateArticle: jest.fn(),
            deleteArticle: jest.fn(),
            addTagsToArticle: jest.fn(),
            removeTagsFromArticle: jest.fn(),
        } as any);
    });

    it('should be defined', () => {
        expect(articleController).toBeDefined();
    })

    it('should have methods', () => {
        expect(articleController.getAllArticles).toBeDefined();
        expect(articleController.createArticle).toBeDefined();
        expect(articleController.getArticleById).toBeDefined();
        expect(articleController.updateArticle).toBeDefined();
        expect(articleController.deleteArticle).toBeDefined();
        expect(articleController.addTagsToArticle).toBeDefined();
        expect(articleController.removeTagsFromArticle).toBeDefined();
    })

    it('should return 200 if getAllArticles is successful', async () => {
        const req = { params: {}, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const articles = [{ id: 1, title: 'Test', content: 'Test content', tags: [] }];
        (articleController as any).articleService.getAllArticles.mockResolvedValue(articles);

        await articleController.getAllArticles(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(articles);
    })

    it('should return 500 if getAllArticles throws an error', async () => {
        const req = { params: {}, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.getAllArticles.mockRejectedValue(new Error('Test error'));

        await articleController.getAllArticles(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 201 if createArticle is successful', async () => {
        const req = { params: {}, body: { title: 'Test', content: 'Test content', tagIds: [] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const newArticle = { id: 1, title: 'Test', content: 'Test content', tags: [] };
        (articleController as any).articleService.createArticle.mockResolvedValue(newArticle);

        await articleController.createArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newArticle);
    })

    it('should return 400 if createArticle is called with missing title or content', async () => {
        const req = { params: {}, body: { title: '', content: '', tagIds: [] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await articleController.createArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Title and content are required' });
    })

    it('should return 500 if createArticle throws an error', async () => {
        const req = { params: {}, body: { title: 'Test', content: 'Test content', tagIds: [] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.createArticle.mockRejectedValue(new Error('Test error'));

        await articleController.createArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if getArticleById is successful', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const article = { id: 1, title: 'Test', content: 'Test content', tags: [] };
        (articleController as any).articleService.getArticleById.mockResolvedValue(article);

        await articleController.getArticleById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(article);
    })

    it('should return 404 if getArticleById is called with non-existent ID', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.getArticleById.mockResolvedValue(null);

        await articleController.getArticleById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Article not found' });
    })

    it('should return 500 if getArticleById throws an error', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.getArticleById.mockRejectedValue(new Error('Test error'));

        await articleController.getArticleById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if updateArticle is successful', async () => {
        const req = { params: { id: '1' }, body: { title: 'Test', content: 'Test content' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedArticle = { id: 1, title: 'Test', content: 'Test content', tags: [] };
        (articleController as any).articleService.updateArticle.mockResolvedValue(updatedArticle);

        await articleController.updateArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedArticle);
    })

    it('should return 500 if updateArticle throws an error', async () => {
        const req = { params: { id: '1' }, body: { title: 'Test', content: 'Test content' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.updateArticle.mockRejectedValue(new Error('Test error'));

        await articleController.updateArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 204 if deleteArticle is successful', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        (articleController as any).articleService.deleteArticle.mockResolvedValue(undefined);

        await articleController.deleteArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    })

    it('should return 500 if deleteArticle throws an error', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.deleteArticle.mockRejectedValue(new Error('Test error'));

        await articleController.deleteArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if addTagsToArticle is successful', async () => {
        const req = { params: { id: '1' }, body: { tagIds: [1, 2] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedArticle = { id: 1, title: 'Test', content: 'Test content', tags: [{ id: 1, name: 'Tag1' }, { id: 2, name: 'Tag2' }] };
        (articleController as any).articleService.addTagsToArticle.mockResolvedValue(updatedArticle);

        await articleController.addTagsToArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedArticle);
    })

    it('should return 500 if addTagsToArticle throws an error', async () => {
        const req = { params: { id: '1' }, body: { tagIds: [1, 2] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.addTagsToArticle.mockRejectedValue(new Error('Test error'));

        await articleController.addTagsToArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if removeTagsFromArticle is successful', async () => {
        const req = { params: { id: '1' }, body: { tagIds: [1, 2] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedArticle = { id: 1, title: 'Test', content: 'Test content', tags: [] };
        (articleController as any).articleService.removeTagsFromArticle.mockResolvedValue(updatedArticle);

        await articleController.removeTagsFromArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedArticle);
    })

    it('should return 500 if removeTagsFromArticle throws an error', async () => {
        const req = { params: { id: '1' }, body: { tagIds: [1, 2] } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (articleController as any).articleService.removeTagsFromArticle.mockRejectedValue(new Error('Test error'));

        await articleController.removeTagsFromArticle(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })
});