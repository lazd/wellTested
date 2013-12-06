describe('todo.utils', function() {
  describe('#beTrue', function() {
    it('should always return true', function() {
      expect(todo.util.beTrue()).toBe(true);
    });
  });
});