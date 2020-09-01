import { UserInfo } from './user-info';

describe('A classe UserInfo', () => {
  it('deve aceitar 2 argumentos no construtor', () => {
    expect(new UserInfo("GroupName", "UserName")).toBeTruthy();
  });

  it('deve receber um nome de grupo', () => {
    const model = new UserInfo("nomeGrupo", "username");

    expect(model.groupName).toBe("nomeGrupo");
  });

  it('deve receber um nome de usuario', () => {
    const model = new UserInfo("nomeGrupo", "nomeUsuario");
    expect(model.userName).toBe("nomeUsuario");
  });
});
