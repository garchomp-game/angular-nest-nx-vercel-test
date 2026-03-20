import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: { isConnected: jest.fn().mockReturnValue(false) },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const result = controller.getData();
      expect(result).toEqual({ message: 'Hello API' });
    });

    it('should call appService.getData', () => {
      const spy = jest.spyOn(service, 'getData');
      controller.getData();
      expect(spy).toHaveBeenCalled();
    });
  });
});
