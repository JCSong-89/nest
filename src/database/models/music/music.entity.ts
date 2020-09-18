import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  Unique,
  AllowNull,
  PrimaryKey,
  TableOptions,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

const tableOptions: TableOptions = {
  timestamp: true,
  tableName: 'Musics',
} as TableOptions;

@Table(tableOptions)
export class Music extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id: number;

  @AllowNull
  @Unique
  @Column
  path: string;

  @AllowNull(false)
  @Column
  artist: string;

  @AllowNull(false)
  @Column
  album: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  size: string;

  @AllowNull(false)
  @Column
  file: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  UserId: number;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
