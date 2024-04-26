import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
  let pipe: AgePipe;

  beforeEach(() => {
    // Un mock sur la date me permet de simuler une fausse date
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-04-26'));

    pipe = new AgePipe();
  });

  afterEach(() => {
    // on doit désinstaller le mock après chaque test
    jasmine.clock().uninstall();
  });

  it('can transform a date in age', () => {
    expect(pipe.transform('2019-12-31')).toBe('4');
  });

  it('can transform a date in age with suffix', () => {
    expect(pipe.transform('2019-12-31', 'ans')).toBe('4 ans');
  });

  it('can transform a date in age precisely', () => {
    expect(pipe.transform('2019-03-15')).toBe('5');
  });
});
