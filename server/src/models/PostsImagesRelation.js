import { DataTypes } from 'sequelize';
import { ulid } from 'ulid';

import { sequelize } from '../sequelize';

import { Image } from './Image';
import { Post } from './Post';

const PostsImagesRelation = sequelize.define('PostsImagesRelation', {
  id: {
    allowNull: false,
    defaultValue: () => ulid(),
    primaryKey: true,
    type: DataTypes.STRING,
  },
  imageId: {
    references: {
      model: Image,
    },
    type: DataTypes.STRING,
  },
  postId: {
    references: {
      model: Post,
    },
    type: DataTypes.STRING,
  },
});

export { PostsImagesRelation };
