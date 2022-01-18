import {
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  mmr: number;

  @Column()
  inQueue: boolean;

  // TODO: inMatch?
}

export default User;
