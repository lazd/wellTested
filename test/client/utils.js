describe('wt.utils', function() {
  describe('#beTrue', function() {
    it('should always return true', function() {
      expect(wt.util.beTrue()).toBe(true);
    });
  });
});