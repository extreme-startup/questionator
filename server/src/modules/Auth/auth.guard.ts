import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionService } from '../Session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SessionService)
    private readonly sessionService: SessionService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.session && req.sessionID) {
        return this.sessionService.validateSession(req.sessionID)
          .then(isValid  => {
            return isValid;
          });
      }
    }
}
