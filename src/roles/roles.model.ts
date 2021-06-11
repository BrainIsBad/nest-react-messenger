import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { UserRole } from './user-role.model';


@Table({tableName: 'roles'})
export class Role extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id:number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value:string;

  @Column({type: DataType.STRING, allowNull: true})
  description:string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}