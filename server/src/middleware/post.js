import { isValidObjectId } from 'mongoose';

export const validatePost = (req, res, next) => {
    try {
        const { title, authorName, authorId, image } = req.body;
        const data = { ...req.body, image: image ? image : null };

        if (!title || !authorId || !authorName) {
            return res.json({
                err: 1,
                mess: 'Incomplete data!',
            });
        }
        req.body.data = data;
        next();
    } catch (error) {
        return res.json({
            err: 1,
            mess: 'Incomplete data!',
            error,
        });
    }
};

export const validateId = (req, res, next) => {
    const { idPost } = req.body;
    const data = { ...req.body, idPost };

    if (!idPost) {
        return res.json({
            err: 1,
            mess: 'Not empty id !',
        });
    }

    if (!isValidObjectId(idPost)) {
        return res.json({
            err: 1,
            mess: 'Invalid id !',
        });
    }

    req.body.data = data;
    next();
};
