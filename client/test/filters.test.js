
describe('filters', function() {

  beforeEach(module('filters')); //same as using angular.mock.module

  describe('money filter', function() {

    var format1 = {
      symbol: '¥',
      rate: 2
    };

    var format2 = {
      symbol: '$',
      rate: 1
    };

    it('should convert boolean values to unicode checkmark or cross',
      inject(function(moneyExchangeFilter) {
        assert.equal(moneyExchangeFilter(1000, format1),'¥ 500 ');
        assert.equal(moneyExchangeFilter(1000, format2),'$ 1k');
        assert.equal(moneyExchangeFilter(1000000, format2),'$ 1m');
      }));
  });
});
