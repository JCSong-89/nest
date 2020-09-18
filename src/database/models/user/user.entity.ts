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
  Length,
  TableOptions,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  timestamp: true,
  tableName: 'Users',
} as TableOptions;

@Table(tableOptions)
export class User extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id: number;

  @Length({ min: 3, max: 300 })
  @AllowNull
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  password: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
