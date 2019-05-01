import { ContenderGateway } from './contender.gateway';
import { Contender } from './dto/Contender';
import * as rxjs from 'rxjs';
import { NO_CONTENDER_MESSAGE } from './constants';

describe('ContenderGateway', () => {
  let sut: ContenderGateway;
  let clientMock: any;

  beforeEach(() => {
    clientMock = {
      emit: jasmine.createSpy('emit'),
    };

    sut = new ContenderGateway();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('handleDisconnect', () => {
    it('should remove contender by client', () => {
      spyOn(sut, 'removeContenderByClient');
      sut.handleDisconnect('client' as any);

      expect(sut.removeContenderByClient)
        .toHaveBeenCalledWith('client');
    });
  });

  describe('onJoin', () => {
    beforeEach(() => {
      spyOn(sut, 'addContender');

      sut.onJoin(clientMock, { login: 'login', sessionURL: '' });
    });

    it('should add contender', () => {
      expect(sut.addContender)
        .toHaveBeenCalledWith(new Contender('login', clientMock));
    });

    it('should respnd to client', () => {
      expect(clientMock.emit)
        .toHaveBeenCalled();
    });
  });

  describe('getAnswer', () => {
    const mockContenderEmail = 'some.email@of.contender';
    const mockQuestion = 'what is the meening of life and everything?';

    beforeEach(() => {
      sut.getContenderByEmail = jasmine.createSpy('getContenderByEmail')
        .and.returnValue({ client: clientMock });
    });

    it('should throw error if no contender', () => {
      (sut as any).getContenderByEmail
        .and.returnValue(undefined);
      (rxjs as any).throwError = jasmine.createSpy('throwError');

      sut.getAnswer(mockContenderEmail, mockQuestion);

      expect(rxjs.throwError)
        .toHaveBeenCalledWith(NO_CONTENDER_MESSAGE);
    });

    it('should emit question', () => {
      sut.getAnswer(mockContenderEmail, mockQuestion);

      expect(clientMock.emit)
        .toHaveBeenCalled();
    });
  });

  describe('removeContenderByClient', () => {
    it('should remove contender', () => {
      (sut as any).contenders = [
        { client: clientMock },
        { client: {} },
      ];
      sut.removeContenderByClient(clientMock);

      expect((sut as any).contenders)
        .toEqual([{ client: {} }]);
    });
  });

  describe('removeContenderByEmail', () => {
    it('should remove contender', () => {
      (sut as any).contenders = [
        { email: 'email1' },
        { email: 'email2' },
      ];
      sut.removeContenderByEmail('email1');

      expect((sut as any).contenders)
        .toEqual([{ email: 'email2' }]);
    });
  });

});
