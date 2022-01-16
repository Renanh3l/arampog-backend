import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

import bcrypt from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  mmr: number;

  @Column()
  inQueue: boolean;

  // TODO: inMatch?

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
