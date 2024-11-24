import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import MediaModel from "./media.model";

@Table({
  modelName: "users",
})
export default class UserModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.JSON,
  })
  urls_tracking: JSON;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at?: Date;

  @HasMany(() => MediaModel, "user_id")
  medias: MediaModel;

  transformToResponse() {
    const detail = JSON.parse(JSON.stringify(this));
    delete detail.password;
    return detail;
  }
}
