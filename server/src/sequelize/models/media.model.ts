import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import UserModel from "./user.model";
import { MediaEnum } from "../../modules/media/media.enum";

@Table({
  modelName: "medias",
})
export default class MediaModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING, defaultValue: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.TEXT,
  })
  url: string;

  @Column({
    type: DataType.STRING,
  })
  type: MediaEnum;

  @Column({
    type: DataType.TEXT,
  })
  domain: string;

  @Column({
    type: DataType.JSON,
  })
  metadata?: JSON;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at?: Date;

  @BelongsTo(() => UserModel, "user_id")
  user: UserModel;

  transformToResponse() {
    const detail = JSON.parse(JSON.stringify(this));
    return detail;
  }
}

export class CreateMediaDto {
  user_id: string;
  domain: string;
  type: MediaEnum;
  url: string;
  metadata?: any;
}
