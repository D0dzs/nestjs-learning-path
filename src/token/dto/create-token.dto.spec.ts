import { CreateTokenDto } from "./create-token.dto"; 

describe('CreateTokenDto', () => {
  it('should be defined', () => {
    expect(new CreateTokenDto()).toBeDefined();
  });
});
