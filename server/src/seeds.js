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
    ProfileImage.destroy({ logging: false }),
    Image.destroy({ logging: false }),
    Movie.destroy({ logging: false }),
    Sound.destroy({ logging: false }),
    User.destroy({ logging: false }),
    Post.destroy({ logging: false }),
    PostsImagesRelation.destroy({ logging: false }),
    Comment.destroy({ logging: false }),
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
