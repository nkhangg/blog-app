import Post from '../model/postShema.js';

export const getPosts = (req, res) =>
    new Promise(async (resolve, reject) => {
        try {
            const respose = await Post.find({});

            resolve(
                res.json({
                    err: respose.length > 0 ? 0 : 1,
                    mess: respose.length > 0 ? 'sucessfuly !' : 'failsure !',
                    data: respose.length > 0 ? respose : null,
                }),
            );
        } catch (error) {
            reject(
                res.json({
                    err: 1,
                    mess: 'failsure !',
                }),
            );
        }
    });

export const getPost = (req, res) =>
    new Promise(async (resolve, reject) => {
        try {
            const respose = await Post.findOne({ _id: req.query.id });

            resolve(
                res.json({
                    err: respose ? 0 : 1,
                    mess: respose ? 'Sucessfuly !' : 'Failsure !',
                    data: respose ? respose : null,
                }),
            );
        } catch (error) {
            reject(
                res.json({
                    err: 1,
                    mess: 'Failsure !',
                }),
            );
        }
    });

export const getPostForUser = async (req, res) => {
    try {
        const { id } = req.query;
        const responce = await Post.find({ authorId: id });
        res.json({
            err: responce ? 0 : 1,
            mess: responce ? 'Get post successfuly !' : 'Get post failsure !',
            data: responce ? responce : null,
        });
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Get post failsure !',
            data: null,
        });
    }
};

export const createPost = (req, res) =>
    new Promise(async (resolve, reject) => {
        try {
            const data = req.body.data;
            const respose = await Post.create({ ...data });
            resolve(
                res.json({
                    err: respose ? 0 : 1,
                    mess: respose ? 'Created sucessfuly !' : 'Created failsure !',
                }),
            );
        } catch (error) {
            reject(
                res.json({
                    err: 1,
                    mess: 'Created failsure !',
                }),
            );
        }
    });

export const updatePost = (req, res) =>
    new Promise(async (resolve, reject) => {
        try {
            const { idPost, ...data } = req.body.data;
            const respose = await Post.findByIdAndUpdate(idPost, data);
            resolve(
                res.json({
                    err: respose ? 0 : 1,
                    mess: respose ? 'Updated sucessfuly !' : 'Updated failsure !',
                }),
            );
        } catch (error) {
            reject(
                res.json({
                    err: 1,
                    mess: 'Updated failsure !',
                }),
            );
        }
    });

export const deletePost = (req, res) =>
    new Promise(async (resolve, reject) => {
        try {
            const { idPost } = req.body.data;
            const respose = await Post.findByIdAndDelete(idPost);
            resolve(
                res.json({
                    err: respose ? 0 : 1,
                    mess: respose ? 'Deleted sucessfuly !' : 'Deleted failsure !',
                }),
            );
        } catch (error) {
            console.log(error);
            reject(
                res.json({
                    err: 1,
                    mess: 'Deleted failsure !',
                }),
            );
        }
    });

export const updateLike = async (req, res) => {
    try {
        const { idPost, id } = req.body;
        const post = await Post.findById(idPost);
        if (post) {
            const { likeId } = post;

            if (!likeId.includes(id)) {
                const newLikeId = [...likeId, id];
                const newPost = { ...post._doc, like: post.like + 1, likeId: newLikeId };
                const postUpdate = await Post.findByIdAndUpdate(idPost, newPost, { new: true });
                res.json({
                    err: 0,
                    mess: 'Like successfuly !',
                    data: postUpdate,
                });
            } else {
                res.json({
                    err: 1,
                    mess: 'Like failsure !',
                });
            }
        }
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Like failsure !',
        });
    }
};

export const updateDisLike = async (req, res) => {
    try {
        const { idPost, id } = req.body;
        const post = await Post.findById(idPost);
        if (post) {
            const { likeId } = post;

            if (likeId.includes(id)) {
                const index = likeId.indexOf(id);
                if (index > -1) {
                    likeId.splice(index, 1);

                    const newPost = { ...post._doc, like: post.like <= 0 ? 0 : post.like - 1, likeId };
                    const postUpdate = await Post.findByIdAndUpdate(idPost, newPost, { new: true });
                    res.json({
                        err: 0,
                        mess: 'Dis like successfuly !',
                        data: postUpdate,
                    });
                }
            } else {
                res.json({
                    err: 1,
                    mess: 'Dis like failsure !',
                });
            }
        }
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Dis like failsure !',
        });
    }
};
