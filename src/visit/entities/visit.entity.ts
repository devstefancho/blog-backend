import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  visitTime: Date;

  @Column()
  pageId: number;
}
