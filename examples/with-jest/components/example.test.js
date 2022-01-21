
jest.mock("./testfunc")
import testfunc from "./testfunc";

describe('Test example', () => {
  it('should run', () => {
    testfunc.mockReturnValue("mocked implementation")
    console.log(testfunc())
  });
});
