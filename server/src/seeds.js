import comments from '../seeds/comments.json';
import images from '../seeds/images.json';
import movies from '../seeds/movies.json';
import posts from '../seeds/posts.json';
import postsImagesRelation from '../seeds/postsImagesRelation.json';
import profileImages from '../seeds/profileImages.json';
import sounds from '../seeds/sounds.json';
import users from '../seeds/users.json';

import { Comment, Image, Movie, Post, PostsImagesRelation, ProfileImage, Sound, User } from './models';

async function insertSeeds() {
  await Promise.all([
    Comment.destroy({ truncate: true, logging: false }),
    PostsImagesRelation.destroy({ truncate: true, logging: false }),
    Post.destroy({ truncate: true, logging: false }),
    User.destroy({ truncate: true, logging: false }),
    Sound.destroy({ truncate: true, logging: false }),
    Movie.destroy({ truncate: true, logging: false }),
    Image.destroy({ truncate: true, logging: false }),
    ProfileImage.destroy({ truncate: true, logging: false }),
  ]);
  await ProfileImage.bulkCreate(profileImages, { logging: false });
  await Image.bulkCreate(images, { logging: false });
  await Movie.bulkCreate(movies, { logging: false });
  await Sound.bulkCreate(sounds, { logging: false });
  await User.bulkCreate(users, { logging: false });
  await Post.bulkCreate(posts, { logging: false });
  await PostsImagesRelation.bulkCreate(postsImagesRelation, { logging: false });
  await Comment.bulkCreate(comments, { logging: false });
}

export { insertSeeds };
