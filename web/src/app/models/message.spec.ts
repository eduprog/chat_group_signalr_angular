import { Message, EMessageType } from './message';

describe('A classe Message', () => {
  it('deve ser instanciada com 2 argumentos no construtor', () => {
    expect(new Message("Conteúdo da mensagem", EMessageType.Text)).toBeTruthy();
  });

  
});
