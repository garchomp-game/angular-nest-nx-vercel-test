import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getData', () => {
    it('should return message "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });

    it('should return an object with message property', () => {
      const result = service.getData();
      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
    });
  });
});
