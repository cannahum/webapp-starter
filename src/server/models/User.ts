import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum AccountType {
  email,
  google,
  facebook,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  public readonly emailAddress: string;

  @Column({
    nullable: true,
  })
  public profilePictureLink: string;

  @Column({
    nullable: false,
  })
  public username: string;

  @Column()
  public accountType: AccountType;
}
