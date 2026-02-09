import { TagController } from "../../src/controller/tagController";

describe('TagController', () => {
    let tagController: TagController;

    beforeEach(() => {
        tagController = new TagController({
            getAllTags: jest.fn(),
            createTag: jest.fn(),
            getTagById: jest.fn(),
            updateTag: jest.fn(),
            deleteTag: jest.fn(),
            getArticlesByTagId: jest.fn(),
        } as any);

    });

    it('should be defined', () => {
        expect(tagController).toBeDefined();
    })

    it('should have methods', () => {
        expect(tagController.getAllTags).toBeDefined();
        expect(tagController.createTag).toBeDefined();
        expect(tagController.getTagById).toBeDefined();
        expect(tagController.updateTag).toBeDefined();
        expect(tagController.deleteTag).toBeDefined();
        expect(tagController.getArticlesByTagId).toBeDefined();
    })

    it('should return 200 if getAllTags is successful', async () => {
        const req = { params: {}, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const tags = [{ id: 1, name: 'Tag1' }];
        (tagController as any).tagService.getAllTags.mockResolvedValue(tags);

        await tagController.getAllTags(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(tags);
    })

    it('should return 500 if getAllTags throws an error', async () => {
        const req = { params: {}, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.getAllTags.mockRejectedValue(new Error('Test error'));

        await tagController.getAllTags(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 201 if createTag is successful', async () => {
        const req = { params: {}, body: { name: 'Test Tag' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const newTag = { id: 1, name: 'Test Tag' };
        (tagController as any).tagService.createTag.mockResolvedValue(newTag);

        await tagController.createTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newTag);
    })

    it('should return 400 if createTag is called with missing name', async () => {
        const req = { params: {}, body: { name: '' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await tagController.createTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Name is required' });
    })

    it('should return 500 if createTag throws an error', async () => {
        const req = { params: {}, body: { name: 'Test Tag' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.createTag.mockRejectedValue(new Error('Test error'));

        await tagController.createTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if getTagById is successful', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const tag = { id: 1, name: 'Test Tag' };
        (tagController as any).tagService.getTagById.mockResolvedValue(tag);

        await tagController.getTagById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(tag);
    })

    it('should return 404 if getTagById is called with non-existent ID', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.getTagById.mockResolvedValue(null);

        await tagController.getTagById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Tag not found' });
    })

    it('should return 500 if getTagById throws an error', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.getTagById.mockRejectedValue(new Error('Test error'));

        await tagController.getTagById(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if updateTag is successful', async () => {
        const req = { params: { id: '1' }, body: { name: 'Updated Tag Name' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const updatedTag = { id: 1, name: 'Updated Tag Name' };
        (tagController as any).tagService.updateTag.mockResolvedValue(updatedTag);

        await tagController.updateTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedTag);
    })

    it('should return 500 if updateTag throws an error', async () => {
        const req = { params: { id: '1' }, body: { name: 'Updated Tag Name' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.updateTag.mockRejectedValue(new Error('Test error'));

        await tagController.updateTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 204 if deleteTag is successful', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        (tagController as any).tagService.deleteTag.mockResolvedValue(undefined);

        await tagController.deleteTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    })

    it('should return 500 if deleteTag throws an error', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.deleteTag.mockRejectedValue(new Error('Test error'));

        await tagController.deleteTag(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })

    it('should return 200 if getArticlesByTagId is successful', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const articles = [{ id: 1, title: 'Test Article', content: 'Test Content' }];
        (tagController as any).tagService.getArticlesByTagId.mockResolvedValue(articles);

        await tagController.getArticlesByTagId(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(articles);
    })

    it('should return 500 if getArticlesByTagId throws an error', async () => {
        const req = { params: { id: '1' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        (tagController as any).tagService.getArticlesByTagId.mockRejectedValue(new Error('Test error'));

        await tagController.getArticlesByTagId(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    })
});