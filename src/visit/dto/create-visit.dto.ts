import { InitialPath, SessionId, VisitedAt } from '../type/visit.type';

export class CreateVisitDto {
  sessionId: SessionId;
  visitedAt: VisitedAt;
  initialPath: InitialPath;
}
