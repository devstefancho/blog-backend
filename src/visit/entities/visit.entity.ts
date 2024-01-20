import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, InitialPath, SessionId, VisitedAt } from '../type/visit.type';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: Id;

  @Column()
  sessionId: SessionId;

  @Column({ type: 'timestamp' })
  visitedAt: VisitedAt;

  @Column()
  initialPath: InitialPath;
}
