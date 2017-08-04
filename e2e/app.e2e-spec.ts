import { MyAccountPage } from './app.po';

describe('my-account App', () => {
  let page: MyAccountPage;

  beforeEach(() => {
    page = new MyAccountPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
